import { z } from 'zod';

import type { CompConfig } from '../../../types/remotion';
 import { img } from '../../utils/schemas/image-schema';
import { Text } from '../../utils/schemas/text-schema';
import { LilyMotion, type LilyProps } from './Lily';
import { Color } from '../../utils/schemas/color-schema'
import { Video } from '../../utils/schemas/video-schema'

const id = 'Lily';
const durationInFrames = 90;
const minDurationFrames = durationInFrames - 20;
const maxDurationFrames = durationInFrames + 20;

export const inputPropsSchema = z
	.object({
		name: z.string().default('Lily'),
		sText: Text.extend({
			fs: z.number().default(11),
		}).describe('short'),
		mText: Text.extend({ fs: z.number().default(144) }).describe('mid'),
		longText: Text.extend({ fs: z.number().default(144) }).describe('long'),
		color1: Color.default('black'),
		color2: Color.default('red'),
		color3: Color.default('lime'),
		img: img,
		vide: Video
	})
	.deepPartial();

export const LilyRiff = {
	id,
	durationInFrames,
	minDurationFrames,
	maxDurationFrames,
	inputPropsSchema,
	component: LilyMotion,
} satisfies CompConfig<LilyProps>;
