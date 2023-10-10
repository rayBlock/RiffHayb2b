// import { Riffs } from "../../Riffs";
import zodToJsonSchema from 'zod-to-json-schema';
import type { JsonSchema7ObjectType } from 'zod-to-json-schema/src/parsers/object';

import type { CompConfig } from '../../../types/types_remotion';
// import { JinjasMotion } from "../../RIFFS/Jinjas/Jinjas";
// import { SempaMotion } from "../../RIFFS/Sempa/Sempa";
// import { SubuMotion } from "../../RIFFS/Subu/Subu";
import { riffsArray } from '../../riffs';

const Riffs = riffsArray;

// console.log(Riffs, "riffs...")

// TODO own file
function getRandomArray(dimi: number, domi: number): number[] {
	if (dimi <= 0 || domi <= 0) {
		throw new Error('Both dimi and domi must be greater than 0.');
	}

	if (dimi > domi) {
		throw new Error('dimi cannot be greater than domi.');
	}

	const randomArray: number[] = [];
	const availableValues: Set<number> = new Set();

	for (let i = 0; i < domi; i++) {
		availableValues.add(i);
	}

	for (let i = 0; i < dimi; i++) {
		const randomIndex = Math.floor(Math.random() * availableValues.size);
		const randomValue: number | undefined = Array.from(availableValues)[randomIndex];
		availableValues.delete(randomValue as number);
		randomArray.push(randomValue as number);
	}

	return randomArray;
}

export function HayMaker({ duration }: { duration: number }) {
	// Get the number of key-value pairs in the comps Map
	const aRiffs = Riffs.length;
	function pickRiffs(duration: number) {
		let nRiffs;

		// TODO get number in duration in seconds
		if (duration === 10) {
			nRiffs = getRandomArray(3, aRiffs);
		} else if (duration === 20) {
			nRiffs = getRandomArray(6, aRiffs);
		} else {
			getRandomArray(10, aRiffs);
		}
		return nRiffs;
	}

	function createNewArray(originalArray: any[], indices: number[]): any[] {
		return indices.map((index) => originalArray[index]);
	}
	const inputProps: any = {
		texts: { short: [], mid: [], all: [] },
		colors: [],
		images: [],
		videos: [],

	}
	function mergeInputProps(configs: CompConfig<any>[], inputProps:any): Record<string, unknown>[] {

		//n TODP



		return configs.map((config) => {
			const {
				durationInFrames,
				minDurationFrames,
				maxDurationFrames,
				component,
				inputPropsSchema,
			} = config;
			if (inputPropsSchema) {
				const jsonSchema = zodToJsonSchema(inputPropsSchema) as JsonSchema7ObjectType;

				if (jsonSchema.type === 'object' && jsonSchema.properties) {
					const defaultValues: Record<string, unknown> = {};

					const groupedProps: Record<string, unknown[]> = {
						short: [],
						mid: [],
						colors: [],
						images: [],
						videos: [],
					};


					Object.entries(jsonSchema.properties).forEach(([key, prop]) => {
						switch (prop.description) {
							case 'color':
								groupedProps?.colors?.push({ [key]: prop.default }); // Set default color value
								inputProps?.colors?.push({ [key]: prop.default });
								break;
							case 'image':
								groupedProps.images?.push({ [key]: '' }); // Set default image value
								inputProps?.images?.push({ [key]: '' });

								break;
							case 'video':
								groupedProps.videos?.push({ [key]: '' }); // Set default image value
								inputProps.videos?.push({ [key]: '' }); // Set default image value
								break;
							case 'icon':
								defaultValues[key] = []; // Set default icon value...
								break;
							case 'short':
								groupedProps.short?.push({ [key]: prop });
								inputProps.texts.short.push({ [key]: '' });
								inputProps.texts.all.push({ [key]: '' });

								break;
							case 'mid':
								groupedProps.mid?.push({ [key]: prop }); // Add to mid array in groupedProps
								inputProps.texts.mid.push({ [key]: '' });
								inputProps.texts.all.push({ [key]: '' });
								break;
							// case 'long':
							// 	groupedProps.long?.push({ [key]: prop }); // Add to long array in groupedProps
							// 	break;
							default:
								defaultValues[key] = prop.default; // Set other default values
						}
					});
					return {
						...defaultValues,
						durationInFrames,
						minDurationFrames,
						maxDurationFrames,
						component,
						...groupedProps,
					};
				}
			}

			return { durationInFrames, component };
		});
	}

	const pickedRiffs = pickRiffs(duration);
	const remotionRiffsPick = createNewArray(Riffs, pickedRiffs!);

	// Your array of CompConfig objects
	const compConfigsArray: CompConfig<{}>[] = remotionRiffsPick;
	// console.log(remotionRiffsPick, "rem picks")
	// Call the function to get the merged inputProps
	const mergedInputProps = mergeInputProps(compConfigsArray, inputProps);

	const traversePick = getRandomArray(pickedRiffs?.length! - 1, 6);

	return { mergedInputProps, pickedRiffs, traversePick, inputProps };

}
