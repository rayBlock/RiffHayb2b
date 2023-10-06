import { z } from 'zod';

export const Video = z.object({ url: z.string() }).describe('video');

export const vid = z.string().describe('video');
