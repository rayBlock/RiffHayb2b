// import { Riffs } from "../../Riffs";
import zodToJsonSchema from 'zod-to-json-schema';
import type { JsonSchema7ObjectType } from 'zod-to-json-schema/src/parsers/object';
import { nanoid } from 'nanoid';
import type { CompConfig } from '../../../types/types_remotion';
// import { JinjasMotion } from "../../RIFFS/Jinjas/Jinjas";
// import { SempaMotion } from "../../RIFFS/Sempa/Sempa";
// import { SubuMotion } from "../../RIFFS/Subu/Subu";
import { riffsArray } from '../../riffs';

const Riffs = riffsArray;

// console.log(Riffs, "riffs...")

// TODO own file


export function hayMaker({ duration }: { duration: number }) {
	// Get the number of key-value pairs in the comps Map
	const aRiffs = Riffs.length;
	function pickRiffs(duration: number) {
		let nRiffs;

		if (duration >= 10 && duration < 20) {
			nRiffs = riffDistribution
				(3, aRiffs);
		} else if (duration >= 20 && duration < 30) {
			nRiffs = riffDistribution
				(4, aRiffs);
		} else {
			nRiffs = riffDistribution
				(8, aRiffs);
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
	function mergeInputProps(configs: CompConfig<any>[], inputProps: any): Record<string, unknown>[] {

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

					const uID = nanoid(5)
					Object.entries(jsonSchema.properties).forEach(([key, prop]) => {
						switch (prop.description) {
							case 'color':
								groupedProps?.colors?.push({ [key]: prop.default }); // Set default color value becauses used
								inputProps?.colors?.push({ propName: key, id: uID });
								break;
							case 'image':
								groupedProps.images?.push({ [key]: '' }); // Set default image value
								inputProps?.images?.push({ propName: key, id: uID });
								break;
							case 'video':
								groupedProps.videos?.push({ [key]: '' });
								inputProps.videos?.push({ propName: key, id: uID });
								break;
							case 'icon':
								defaultValues[key] = []; // Set default icon value...
								break;
							case 'short':
								groupedProps.short?.push({ [key]: '' });
								inputProps.texts.short.push({ propName: key, id: uID });
								inputProps.texts.all.push({ propName: key, id: uID });

								break;
							case 'mid':
								groupedProps.mid?.push({ [key]: '' });
								inputProps.texts.mid.push({ propName: key, id: uID });
								inputProps.texts.all.push({ propName: key, id: uID });
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
						uID,
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
	
	// Call the function to get the merged inputProps
	const mergedInputProps = mergeInputProps(compConfigsArray, inputProps);

	const traversePick = traverDistribution(pickedRiffs?.length! - 1, 6);

	return { mergedInputProps, pickedRiffs, traversePick, inputProps };

}


function traverDistribution(nRiffTraverse: number, availableTransitions: number): number[] {
	if (nRiffTraverse <= 0 || availableTransitions <= 0) {
		throw new Error('Both dimi and domi must be greater than 0.');
	}
	const randomArray: number[] = [];

	for (let i = 0; i < nRiffTraverse; i++) {
		const randomIndex = Math.floor(Math.random() * availableTransitions);
		randomArray.push(randomIndex as number);
	}


	return randomArray;
}


function riffDistribution(dimi: number, domi: number): number[] {
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

