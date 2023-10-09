import { z } from 'zod';

import type { CompConfig } from '../../../types/types_remotion';
import { Text } from '../../utils/schemas/text-schema';
import { Color } from '../../utils/schemas/color-schema'
import { Video } from '../../utils/schemas/video-schema'
import { AnfaMotion, type AnfaProps } from './Anfa';
import { img } from '../../utils/schemas/image-schema';

const id = 'Anfa';
const durationInFrames = 93;
const minDurationFrames = durationInFrames - 20;
const maxDurationFrames = durationInFrames + 15;

export const inputPropsSchema = z
	.object({
		name: z.string().default('Anfa'),
		sText: Text.extend({ fs: z.number().default(44) }).describe('short'),
		mText: Text.extend({ fs: z.number().default(44) }).describe('mid'),
		longText: Text.extend({ fs: z.number().default(44) }).describe('long'),
		color1: Color.default("red"),
		// color2: Color.default('red'),
		color3: Color.default('lime'),


		img: img,
		vide: Video

	})
	.deepPartial();

export const AnfaRiff = {
	id,
	durationInFrames,
	minDurationFrames,
	maxDurationFrames,
	inputPropsSchema,
	component: AnfaMotion,
} satisfies CompConfig<AnfaProps>;