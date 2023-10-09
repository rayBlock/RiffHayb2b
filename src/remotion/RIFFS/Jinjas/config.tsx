import { z } from 'zod';

import type { CompConfig } from '../../../types/types_remotion';
import { Color } from '../../utils/schemas/color-schema';
// import { Image } from '../../utils/schemas/image-schema';
import { Text } from '../../utils/schemas/text-schema';
import { JinjasMotion, type JinjasProps } from './Jinjas';

const id = 'Jinjas';
const durationInFrames = 90;
const minDurationFrames = durationInFrames - 20;
const maxDurationFrames = durationInFrames + 20;

export const inputPropsSchema = z
	.object({
		name: z.string().default('Jinjas'),
		sText: Text.extend({ fs: z.number().default(44) }).describe('short'),
		mText: Text.extend({ fs: z.number().default(23) }).describe('mid'),
		selected: z.boolean(),
		color1: Color.default('black'),
		color3: Color.default('white'),
	})
	.deepPartial();

export const JinjasRiff = {
	id,
	durationInFrames,
	minDurationFrames,
	maxDurationFrames,
	inputPropsSchema,
	component: JinjasMotion,
} satisfies CompConfig<JinjasProps>;
