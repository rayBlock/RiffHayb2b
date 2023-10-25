
import { hayMaker } from '../../remotion/utils/Hay/hayMaker';
import type { FrameSchema } from '../../types/calculateFrames';
import getAiImages from '../llm/getStableDiffusionImages';
import getTexts from '../llm/llmTexts';
// import { pexelClient } from '../pexels';
import { calculateFrames } from './calcFrames';
import { getRandomPastelColorWithVariations } from './getRandomColor';
import { nanoid } from 'nanoid';

type weaverProps = {
	prompt: string;
	duration: any;
	orientation: string;
};

export async function riffWeaver({ prompt, duration, orientation }: weaverProps) {
	const transformedData: any = [];

	// const client = pexelClient;
	const llmSchemaData = await getTexts(prompt);
	console.log(llmSchemaData, 'llm');
	const intDuration = parseInt(duration);
	const prepInputs = hayMaker({ duration: intDuration });

		
	const amount = prepInputs.pickedRiffs?.length;
	// const leonardoImages = await getLeonardoAIImages({
	// 	query: llmSchemaData?.output.imgPrompts,
	// 	size: 'Portrait'
	// })

	const images: string[] | void = await getAiImages({
		query: llmSchemaData?.output.imgPrompts,
		size: orientation as any,
		amount: amount as number,
	});
	console.log("images created");
	
	//  const query: any = llmSchemaData?.output.videoPrompt;

	// let pxlVids: any = [];

	// pexelClient.videos
	// 	.search({ query: "cats", per_page: 3 })
	// 	.then((videos: any) => console.log(videos, 'videos ??'));

	// async function pxlGet():Promise<any> {
	// 	await client.videos
	// 		.search({ query, per_page: 4,  })
	// 		.then((videos: any) => {
	// 			console.log(videos, 'then videos ??');
	// 			videos.forEach((video: any) => {
	// 				const videoFiles = video.video_files;
	// 				videoFiles.forEach((videoFile: any) => {
	// 					const link = videoFile.link;
	// 					pxlVids.push(link);
	// 					console.log(link, 'link');
	// 				});
	// 			});
	// 		});
	// }

	// const so = await pxlGet();

	const array1 = prepInputs.pickedRiffs!;
	const array2 = prepInputs.traversePick!;

	// Initialize the result array.
	const arrayWoven = [];

	// Determine the length of the resulting array.
	const maxLength = Math.max(array1.length, array2.length);

	// Loop through both arrays and weave their elements together.
	for (let i = 0; i < maxLength; i++) {
		if (i < array1.length) {
			arrayWoven.push(array1[i]);
		}
		if (i < array2.length) {
			arrayWoven.push(array2[i]);
		}
	}

	interface CalculationProps {
		durationInFrames: number;
		minDurationFrames: number;
		maxDurationFrames: number;
	}

	function extractRiffsFrameDurations(inputArray: any[]): CalculationProps[] {
		const durationsFrames: CalculationProps[] = inputArray.map((item) => {
			const { durationInFrames, minDurationFrames, maxDurationFrames } = item;
			return { durationInFrames, minDurationFrames, maxDurationFrames };
		});

		return durationsFrames;
	}

	const durationsArray: CalculationProps[] = extractRiffsFrameDurations(
		prepInputs.mergedInputProps
	);

	const seekedDuration = duration * 30;

	const frameCount: any | FrameSchema[] | Error = calculateFrames({
		props: durationsArray,
		seekedDuration,
		locked: [],
		traverseDuration: 20,
		// You can also provide the locked and traversFrames properties if needed
	});

	let propsIndex = 0;
	let shortIndex = 0;
	let midIndex = 0;

	let imageIndex: number = 0;
	// let videoIndex: number = 0;

	const propertyNames = ['short', 'mid'];
	const otherPropsNames = ['images', 'colors'];
	//  'videos'

	// let pexelVids: string[] = [];
	function randoNumber(): number {
		return Math.floor(Math.random() * 4);
	}

	prepInputs.mergedInputProps.forEach((item: any, index: any) => {
		const { name, minDurationFrames, maxDurationFrames, uID }: any = item;

		const keys: any = {};

		otherPropsNames.forEach((otherProps) => {
			if (item[otherProps]) {
				item[otherProps].forEach((nestedObj: any) => {
					let keyProp = Object.keys(nestedObj);
					if (keyProp.length > 0) {
						const keyName: string = keyProp[0] as string;
						switch (otherProps) {
							case 'images':
								keys[keyName] = images ? images[imageIndex] : undefined; // Added a ternary operator

								// !keys[keyName]
								// 	? console.log(keys[keyName], 'images failed ...')
								// 	: console.log(keys, 'lots of keys logs');
								// const photoResponse = await pexClient.photos.search({
								// 	query,
								// 	per_page: 15,
								// 	page: 1,
								// 	orientation: dimension,
								// 	size: 'medium',
								// });

								imageIndex++;
								break;

							// case 'videos':
							// 	console.log(videoIndex, '<-- video Index ');

							// 	const fetchVideos = async () => {
							// 		try {
							// 			const vids: any = await client.videos.search({
							// 				query,
							// 				orientation: 'portrait',
							// 				per_page: 3,
							// 			});
							// 			console.log(vids, 'viiiis');
							// 			return vids; // Return the fetched videos
							// 		} catch (error) {
							// 			console.error(error, 'error');
							// 			return []; // Return an empty array in case of an error
							// 		}
							// 	};

							// 	const processVideos = async () => {
							// 		if (videoIndex === 0) {
							// 			try {
							// 				const some = await fetchVideos(); // Use await to get the fetched videos
							// 				console.log(some.videos, 'some videos mlord');
							// 				some.videos.forEach((video: any) => {
							// 					const videoFiles = video.video_files;
							// 					videoFiles.forEach((videoFile: any) => {
							// 						const link = videoFile.link;
							// 						pexelVids.push(link);
							// 					});
							// 				});
							// 			} catch (error) {
							// 				console.error(error, 'error');
							// 			}
							// 		}
							// 	};

							// 	// Call the async function to start video processing
							// 	processVideos();
							// 	console.log(pexelVids, 'pexl vidos');
							// 	keys[keyName] = pexelVids[videoIndex] as any;
							// 	console.log(keys, 'keys mit opexel ???');
							// 	videoIndex++;
							// 	break;

							case 'colors':
								const propertiesObject = nestedObj;
								for (const propName in propertiesObject) {
									if (propertiesObject.hasOwnProperty(propName)) {
										const property = propertiesObject[propName];

										keys[propName] = property;
									}
								}

								break;
							default:
								break;
						}
					}
				});
			}
		});

		propertyNames.forEach((propertyName) => {
			if (item[propertyName]) {
				console.log(item[propertyName]);
				
				item[propertyName].forEach((nestedObj: any) => {
					console.log(nestedObj, "nestedOBJ");
					
					let keyProp = Object.keys(nestedObj);
					console.log(keyProp, "keyprop");
					
					if (keyProp.length > 0) {
						const keyName: string = keyProp[0] as string;
						switch (propertyName) {
							case 'short':
								// keys[keyName].text = llmSchemaData?.output.shortS[shortIndex] ;
								keys[keyName] = { text: llmSchemaData?.output.shortS[shortIndex] };
								console.log(keys, "<-- keys")

								shortIndex++;
								break;
							case 'mid':
								// keys[keyName].text =  llmSchemaData?.output.midS[midIndex];
							 	keys[keyName] = { text: llmSchemaData?.output.midS[midIndex] };
										console.log(keys)
								midIndex++;
								break;
							// case 'long':
							// 	keys[keyName] = { text: llmSchemaData?.output.longS[longIndex] };
							// 	longIndex++;
							default:
								break;
						}


								// TODO FIGURE OUT THIS ONE
						const propertiesObject = nestedObj.prop.properties;
						for (const propName in propertiesObject) {
							if (propertiesObject.hasOwnProperty(propName)) {
								const property = propertiesObject[propName];
								console.log(property, "property... riffweaver");
								
								if (property.hasOwnProperty('default')) {
									const defaultValue = property.default;
									// Assign the extracted property to the corresponding key
									keys[keyName][propName] = defaultValue;
								}
							}
						}
					}
				});
			}
		});

		transformedData.push({
			name: name,
			id: uID,
			duration: frameCount[index].durationInFrames,
			min: minDurationFrames,
			max: maxDurationFrames, // Customize this based on your data structure
			comp: prepInputs.pickedRiffs![index], // Use 'pickedRiffs' to get the 'comp' value
			props: keys,
			// props: props, // Use the 'props' object created above
		});

		if (propsIndex < prepInputs.mergedInputProps.length - 1) {
			let transitProps: any = {};
			let directionValues: string[] = ['up', 'right', 'down', 'left'];

			switch (prepInputs.traversePick![index]) {
				case 0:
					break;
				case 1:
					let random_number1: number = randoNumber();
					const inputValue = directionValues[random_number1];
					transitProps['direction'] = inputValue;
					break;
				case 2:
					const radColor = getRandomPastelColorWithVariations();
					transitProps['color'] = radColor;
					break;
				case 3:
					let random_number3: number = randoNumber();
					transitProps['direction'] = directionValues[random_number3];
					break;
				case 4:
					let openOrClosed = ['open', 'close'];
					let rando: number = Math.floor(Math.random() * 2);
					let randoAngle: number = Math.floor(Math.random() * 180);
					transitProps['direction'] = openOrClosed[rando];
					transitProps['angle'] = randoAngle;
					break;
				case 5:
					let randoAngle5: number = Math.floor(Math.random() * 180);
					transitProps['angle'] = randoAngle5;
					break;
				case 6:
					let inOrOut = ['in', 'out'];
					let randoCirc: number = Math.floor(Math.random() * 2);
					transitProps['direction'] = inOrOut[randoCirc];
					break;
				default:
					break;
			}
			const nanoID = nanoid(4);
			transformedData.push({
				duration: 20,
				//TODO what ?.. hmmm ...

				id: nanoID,
				comp: prepInputs.traversePick![index],
				props: { ...transitProps },
			});
			propsIndex++;
		}
	});
	console.log("them input props ?");
	
	const inputProps = {
		data: transformedData,
		images: images,
		text: llmSchemaData,
		inputs: prepInputs.inputProps,
		duration: duration,
		prompt: prompt,
		orientation: orientation,
	};
	return inputProps;
}
