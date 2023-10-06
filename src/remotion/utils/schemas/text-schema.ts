import { z } from 'zod';

// input all the text props....
export const Text = z.object({
	text: z.string(),
	maxWidth: z.number().optional().default(720),
	linearBG: z.boolean().optional(),
	linearDegBG: z.number().optional(),
	fs: z.number().optional().default(22),
	color: z.string().optional(),
	rotate: z.number().optional(),
});
