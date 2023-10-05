import { z } from 'astro/zod';
import { apiProcedure, createTRPCRouter } from '../trpc';
import { HayMaker } from '../../../remotion/utils/Hay/HayMaker';
// import getTexts from '../../llm/llmTexts';

import { calculateFrames } from '../../remotion/calcFrames';
import type { FrameSchema } from '../../../types/calculateFrames';
import getAiImages from '../../llm/getStableDiffusionImages';

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
				// const llmSchemaData = await getTexts("I need a video for my company. We produce chairs for animals");

				const prepInputs = HayMaker({ duration: 10 });
				// console.log(prepInputs, "prep inpts ?", Date.now())
					
				const images = await getAiImages({query:"red Pandas playing football on the beach", size:"Square"})
					// console.log(images, "images ..  ")
				const transformedData: any = [];

				// console.log(prepInputs.mergedInputProps[0], "some")

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

				//   const seekedDuration = duration * 30 - 1;


				const seekedDuration = input.duration * 30 ;

				const frameCount: any | FrameSchema[] | Error = calculateFrames({
					props: durationsArray,
					seekedDuration,
					locked: [],
					traverseDuration: 20,

					// You can also provide the locked and traversFrames properties if needed
				});



				let propsIndex = 0;
				// console.log(propsIndex, "i", prepInputs.mergedInputProps.length, "length")
				prepInputs.mergedInputProps.forEach((item, index: any) => {
					const { name, minDurationFrames, maxDurationFrames } = item;
					 console.log(item)

					transformedData.push({
						name: name,
						duration: frameCount[index].durationInFrames,
						min: minDurationFrames,
						max: maxDurationFrames, // Customize this based on your data structure
						comp: prepInputs.pickedRiffs![index], // Use 'pickedRiffs' to get the 'comp' value
						// props: props, // Use the 'props' object created above
					});
					if (propsIndex < prepInputs.mergedInputProps.length - 1) {
						transformedData.push({
							// props for transition ...
							duration: 20,
							//  duration: durationsArray[propsIndex]!.duration,
							comp: prepInputs.traversePick![index], 
							// different props for transitions depending on index 
							//   props: propsArray[propsIndex].props,
						});
						propsIndex++;
					}
				});

				const inputProps = {
					data: transformedData,
					images: images
					// text: llmSchemaData
				};
				// console.log(inputProps, "input so far.")
				return inputProps;
			}

			return 'Something from the server remotion trpc';
		}),
});
