import { z } from 'zod';

import type { CompConfig } from '../../../types/remotion';
import { Text } from '../../utils/schemas/text-schema';
import { SempaMotion, type SempaProps } from './Sempa';

const id = 'Sempa';
const durationInFrames = 100;
const minDurationFrames = durationInFrames - 20;
const maxDurationFrames = durationInFrames + 20;

export const inputPropsSchema = z
	.object({
		name: z.string().default('Sempa'),
		shorty: Text.extend({ fontSize: z.number().default(44) }).describe('short'),
	})
	.deepPartial();

export const SempaRiff = {
	id,
	durationInFrames,
	minDurationFrames,
	maxDurationFrames,
	inputPropsSchema,
	component: SempaMotion,
} satisfies CompConfig<SempaProps>;
