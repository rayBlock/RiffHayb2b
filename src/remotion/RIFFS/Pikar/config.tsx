import { z } from 'zod';

import type { CompConfig } from '../../../types/remotion';

import { Image } from '../../utils/schemas/image-schema';
import { Text } from '../../utils/schemas/text-schema';
import { PikarMotion, type PikarProps } from './Pikar';

const id = 'Pikar';
const durationInFrames = 90;
const minDurationFrames = durationInFrames - 20;
const maxDurationFrames = durationInFrames + 20;

export const inputPropsSchema = z
	.object({
		name: z.string().default('Pikar'),
		shorty: Text.extend({ fs: z.number().default(44) }).describe('short'),
		longy: Text.describe('long'),
		longur: Text.describe('long'),
		img: Image.describe('Background Image'),
	
	})
	.deepPartial();

export const PikarRiff = {
	id,
	durationInFrames,
	minDurationFrames,
	maxDurationFrames,
	inputPropsSchema,
	component: PikarMotion,
} satisfies CompConfig<PikarProps>;
