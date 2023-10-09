// import { collections } from './../../content/config';
// import {
	// ListBucketsCommand,
	// ListObjectsV2Command,
	// GetObjectCommand,
	// PutObjectCommand,
// 	S3Client,
// } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// import { v4 as uuidv4 } from 'uuid';

// const S3 = new S3Client({
// 	region: 'auto',
// 	endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
// 	credentials: {
// 		accessKeyId: process.env.CF_ACCESS_KEY_ID!,
// 		secretAccessKey: process.env.CF_SECRET_ACCESS_KEY!,
// 	},
// });

type props = {
	prompt: string;
	size: 'Square' | 'Landscape' | 'Portrait';
};

export default async function getSDXLImages({ prompt }: props) {
	// const engineId = "stable-diffusion-xl-beta-v2-2-2";
	console.log(prompt);


	// Function to convert Blob to Buffer
	// async function blobToBuffer(blob:Blob) {
	// 	return new Promise((resolve, reject) => {
	// 		const reader = new FileReader();
	// 		reader.onload = () => {
	// 			if (reader.result instanceof ArrayBuffer) {
	// 				const buffer = Buffer.from(reader.result);
	// 				resolve(buffer);
	// 			} else {
	// 				reject(new Error('Error reading Blob data: result is not an ArrayBuffer.'));
	// 			}
	// 		};
	// 		reader.onerror = (error) => {
	// 			reject(error);
	// 		};
	// 		reader.readAsArrayBuffer(blob);
	// 	});
	// }



	// let dimWidth, dimHeight;

	// if (size === 'Square') {
	// 	dimWidth = dimHeight = 1024; // Set the width and height to 200px for square size
	// } else if (size === 'Portrait') {
	// 	dimWidth = 768; // Set width to 150px for portrait size
	// 	dimHeight = 1344; // Set height to 200px for portrait size
	// } else if (size === 'Landscape') {
	// 	dimWidth = 1344; // Set width to 300px for landscape size
	// 	dimHeight = 768; // Set height to 200px for landscape size
	// } else {
	// 	// Handle any other size or invalid value here
	// 	dimWidth = dimHeight = 200; // Set default width and height to 200px
	// }

	// async function fetchSDXL(data: any) {
	// 	console.log(data, 'data...');
	// 	const response = await fetch(
	// 		'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
	// 		{
	// 			headers: { Authorization: 'Bearer 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' },
	// 			method: 'POST',
	// 			body: JSON.stringify(data),
	// 		}
	// 	);



		// const result = await response.blob();
			// const bufferData = await blobToBuffer(result)
			// blobUtil.blobToBase64String(result).then(function (base64String) {
			// 	// success
			//   }).catch(function (err) {
			// 	// error
			//   });





			//...
		// 	const buf =  blobUtils.blobToArrayBuffer(result).then(function (arrayBuff) {
		// 		// success
		// 		console.log(arrayBuff, "arr buff")
		// 		return arrayBuff
		// 	  }).catch(function (err) {
		// 		// error
		// 		console.log(err)
		// 	  });
		// console.log(buf, 'buff ??');
		// await uploadFilesToS3('riff', bufferData);
	// 	const res = await uploadFilesToS3('riff', "insert blobHere");
	// 	return res

	// }

	
	// const some = await fetchSDXL({
	// 	inputs: 'Astronaut riding a elefant in the epic rocky mountains',
	// });


	// if (some) {
	// 	console.log('hmmmm -->', some);
	// }



// 	async function uploadFilesToS3(bucketName: string, response: any) {
// 		const uniqueID = uuidv4();
// 		const filePath = `imgsJPEG/${uniqueID}.jpeg`; // Set the path where you want to save the file in the bucket
// 		const uploadedUrls: string[] = [];

// 		const params = {
// 			Bucket: bucketName,
// 			Key: filePath,
// 			Body: response,
// 			ContentType: 'image/jpeg',
// 		};
// 		console.log(params, 'pamrs');
// 		try {
// 			await S3.send(new PutObjectCommand(params));
// 			const url = await getSignedUrl(
// 				S3,
// 				new GetObjectCommand({ Bucket: 'riff', Key: `imgsJPEG/${uniqueID}.jpeg` }),
// 				{ expiresIn: 3600 }
// 			);

// 			// const fileUrl = `https://${bucketName}.s3.amazonaws.com/${filePath}`; // Construct the S3 URL
// 			uploadedUrls.push(url); // Add the URL to the array
// 			console.log(`File "${filePath}" uploaded successfully`);
// 		} catch (error) {
// 			console.error(`Error uploading file "${filePath}":`, error);
// 		}
// 	}

// 	return uploadedUrls; // Return the array of uploaded file URLs
 }
