import { z } from 'zod';

export const Image = z.object({ url: z.string() }).describe('image');

export const img = z.string().describe('image');
