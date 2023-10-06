import {
	// ListBucketsCommand,
	// ListObjectsV2Command,
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

const S3 = new S3Client({
	region: 'auto',
	endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.CF_ACCESS_KEY_ID!,
		secretAccessKey: process.env.CF_SECRET_ACCESS_KEY!,
	},
});

type props = {
	query: string;
	size: 'Square' | 'Landscape' | 'Portrait';
};

export default async function getAiImages({ query, size }: props) {
	// const engineId = "stable-diffusion-xl-beta-v2-2-2";
	const engine = 'stable-diffusion-xl-1024-v1-0';
	const apiHost = 'https://api.stability.ai';
	const apiKey = process.env.STABILITY_API_KEY;

	if (!apiKey) throw new Error('Missing Stability API key.');

	let dimWidth, dimHeight;

	if (size === 'Square') {
		dimWidth = dimHeight = 1024; // Set the width and height to 200px for square size
	} else if (size === 'Portrait') {
		dimWidth = 768; // Set width to 150px for portrait size
		dimHeight = 1344; // Set height to 200px for portrait size
	} else if (size === 'Landscape') {
		dimWidth = 1344; // Set width to 300px for landscape size
		dimHeight = 768; // Set height to 200px for landscape size
	} else {
		// Handle any other size or invalid value here
		dimWidth = dimHeight = 200; // Set default width and height to 200px
	}

	// const url = `${apiHost}/v1/engines/list`

	// const get = await fetch(url, {
	//   method: 'GET',
	//   headers: {
	//     Authorization: `Bearer ${apiKey}`,
	//   },
	// })

	// const payload = (await get.json())

	const response = await fetch(`${apiHost}/v1/generation/${engine}/text-to-image`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			text_prompts: [
				{
					text:
						// Photography, best quality
						`
              ${query}` ||
						'A photograph of a family eating dinner at noon somwhere around the world, high resolution photography',
				},
			],

			// TODO: have to find out what aspect ratios to build depending on format input from User
			// How strictly the diffusion process adheres to the prompt text (higher values keep your image closer to your promp
			cfg_scale: 15,
			style_preset: 'photographic',
			clip_guidance_preset: 'FAST_BLUE',

			//  SDXL v0.9 and v1.0 the allowed dimensions are
			// 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640, 640x1536, 768x1344, 832x1216, 896x1152,
			height: dimHeight,
			width: dimWidth,
			samples: 3,
			steps: 16,
		}),
	});

	if (!response.ok) {
		throw new Error(`Non-200 response: ${await response.text()}`);
	}

	interface GenerationResponse {
		artifacts: Array<{
			base64: string;
			seed: number;
			finishReason: string;
		}>;
	}

	const responseJSON = (await response.json()) as GenerationResponse;
	// console.log(responseJSON)

	async function uploadFilesToS3(bucketName: string, response: any) {
		const uploadedUrls = []; // Array to store the uploaded file URLs
		for (const file of response.artifacts) {
			const base64Data = file.base64;
			const uniqueID = uuidv4();

			const buffer = Buffer.from(base64Data, 'base64');

			const filePath = `imgs/${uniqueID}.png`; // Set the path where you want to save the file in the bucket

			const params = {
				Bucket: bucketName,
				Key: filePath,
				Body: buffer,
			};

			try {
				await S3.send(new PutObjectCommand(params));
				const url = await getSignedUrl(
					S3,
					new GetObjectCommand({ Bucket: 'riff', Key: `imgs/${uniqueID}.png` }),
					{ expiresIn: 3600 }
				);

				// const fileUrl = `https://${bucketName}.s3.amazonaws.com/${filePath}`; // Construct the S3 URL
				uploadedUrls.push(url); // Add the URL to the array
				// console.log(`File "${filePath}" uploaded successfully`);
			} catch (error) {
				console.error(`Error uploading file "${filePath}":`, error);
			}
		}

		return uploadedUrls; // Return the array of uploaded file URLs
	}

	const urlResponse = uploadFilesToS3('riff', responseJSON)
		.then((uploadedUrls) => {
			// console.log("Uploaded file URLs:", uploadedUrls);
			return uploadedUrls;
		})
		.catch((err) => {
			console.error('Error:', err);
		});

	return urlResponse;
}

// async function uploadFileAndGetDownloadUrl(fileObj: any) {
//   try {
//
//     const fileName = `ai-images/${uniqueID}.jpg`;
//     const buffer = Buffer.from(fileObj.base64, "base64");

//     // const file = aiBucket.file(fileName);

//     // await file.save(buffer, {
//     //   metadata: {
//     //     contentType: "image/jpeg",
//     //     // Replace with the appropriate content type for your file
//     //   },
//     // });

//     // const downloadUrl = await getDownloadURL(file); // Use the "file" reference directly

//    // return downloadUrl; // Return the download URL
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error;
//   }
// }

// Function to upload multiple files and get their download URLs
//   async function uploadFilesAndGetDownloadUrls(): Promise<string[]> {
//     try {
//       const uploadPromises = responseJSON.artifacts.map(
//         uploadFileAndGetDownloadUrl
//       );
//       return await Promise.all(uploadPromises);
//     } catch (error) {
//       console.error("Error uploading files:", error);
//       throw error;
//     }
//   }

//   // Usage example:
//   const URLs = await uploadFilesAndGetDownloadUrls()
//     .then((downloadUrls) => {
//       return downloadUrls;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });

//   console.log("Download URLs for uploaded files:", URLs);
//   return URLs;
