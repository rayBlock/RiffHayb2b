import { z } from 'zod';

export const Color = z.string().default("white").describe('color');
