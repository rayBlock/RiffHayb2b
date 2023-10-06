import { z } from 'zod';

export const Audio = z.object({
	zyp: z.string().default('audio'),
	color: z.string().url().default(''),
});
