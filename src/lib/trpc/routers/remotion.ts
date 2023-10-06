import { z } from 'astro/zod';

import { HayMaker } from '../../../remotion/utils/Hay/HayMaker';
import type { FrameSchema } from '../../../types/calculateFrames';
import getAiImages from '../../llm/getStableDiffusionImages';
import getTexts from '../../llm/llmTexts';
import { calculateFrames } from '../../remotion/calcFrames';
import { apiProcedure, createTRPCRouter } from '../trpc';

export const remotionRouter = createTRPCRouter({
	render: apiProcedure
		.input(
			z.object({
				title: z.string().optional(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.userPromise;

			console.log('remotion trpc route', input);

			if (res.kind === 'ok') {
				return `Oh, so cool, you are remotion ${res.user.userId}`;
			}

			return 'Something from the server remotion trpc';
		}),

	riffWeaver: apiProcedure
		.input(
			z.object({
				duration: z.number(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.userPromise;

			if (res.kind === 'ok') {
				const llmSchemaData = await getTexts('I need a video for my hats for cats that I sell  ');
				console.log(llmSchemaData, 'llm');
				const prepInputs = HayMaker({ duration: 10 });

				const transformedData: any = [];


				const images: string[] | void = await getAiImages({
					query: llmSchemaData?.output.imgPrompts,
					size: 'Portrait',
				});
				// const client = pexelClient;

				// const query: any = llmSchemaData?.output.videoPrompt;

				// let pxlVids: any = [];
				// console.log('hell');

				// client.videos.search({ query:"nature", per_page: 3 }).then((videos:any) => console.log(videos, "videos ??"));

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
				// console.log(pxlVids, '...  some gdmmns videos');
				// const so = await pxlGet();
				// console.log(so, 'soo??');

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

				const seekedDuration = input.duration * 30;

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
				let longIndex = 0;

				let imageIndex: number = 0;
				// let videoIndex: number = 0;

				const propertyNames = ['short', 'mid', 'long'];
				const otherPropsNames = ['images', 'colors'];
				//  'videos'

				// let pexelVids: string[] = [];

				prepInputs.mergedInputProps.forEach((item: any, index: any) => {
					const { name, minDurationFrames, maxDurationFrames }: any = item;

					const keys: any = {};

					debugger;

					otherPropsNames.forEach((otherProps) => {
						if (item[otherProps]) {
							item[otherProps].forEach((nestedObj: any) => {
								console.log(nestedObj, 'nestedOtherObj');
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
											// keys[keyName] = {text: llmSchemaData?.output.longS[longIndex]};
											console.log(keyName);
											const propertiesObject = nestedObj;
											// console.log(propertiesObject, 'prop color object');
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
							item[propertyName].forEach((nestedObj: any) => {
								let keyProp = Object.keys(nestedObj);
								if (keyProp.length > 0) {
									const keyName: string = keyProp[0] as string;
									switch (propertyName) {
										case 'short':
											keys[keyName] = { text: llmSchemaData?.output.shortS[shortIndex] };
											shortIndex++;
											break;
										case 'mid':
											keys[keyName] = { text: llmSchemaData?.output.midS[midIndex] };
											midIndex++;
											break;
										case 'long':
											keys[keyName] = { text: llmSchemaData?.output.longS[longIndex] };
											longIndex++;
											break;
									}

									const propertiesObject = nestedObj[keyName].properties;
									for (const propName in propertiesObject) {
										if (propertiesObject.hasOwnProperty(propName)) {
											const property = propertiesObject[propName];
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
						duration: frameCount[index].durationInFrames,
						min: minDurationFrames,
						max: maxDurationFrames, // Customize this based on your data structure
						comp: prepInputs.pickedRiffs![index], // Use 'pickedRiffs' to get the 'comp' value
						props: keys,
						// props: props, // Use the 'props' object created above
					});
					if (propsIndex < prepInputs.mergedInputProps.length - 1) {
						transformedData.push({
							// props for transition ...
							duration: 20,
							//  duration: durationsArray[propsIndex]!.duration,
							comp: prepInputs.traversePick![index],
							props: {},
							// different props for transitions depending on index
							//   props: propsArray[propsIndex].props,
						});
						propsIndex++;
					}
				});
				console.log(transformedData, 'transformed');
				const inputProps = {
					data: transformedData,
					// images: images,
					// text: llmSchemaData,
				};

				// function combineInputProps(inputProps: any) {
				// 	const { data, images, text }: any = inputProps;

				// 	console.log(data.length, 'length of data array');

				// 	// console.log(data, "data")
				// 	// console.log(images, "imgs")
				// 	// console.log(text, "text")

				// 	return inputProps;
				// }

				// const stitchedProps = combineInputProps(inputProps);

				return inputProps;
			}
			return 'failed ';
		}),
});
