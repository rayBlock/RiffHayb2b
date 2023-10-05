import type { CompConfig } from  '../../../types/remotion'
import { Text } from '../../utils/schemas/text-schema';
import { Image } from '../../utils/schemas/image-schema';

import { LilyMotion, type LilyProps } from './Lily';
import { z } from 'zod';


const id = 'Lily';
const durationInFrames = 90;
const minDurationFrames = durationInFrames - 20
const maxDurationFrames = durationInFrames + 20

export const inputPropsSchema = z.object({
name: z.string().default('Lily'),
sText: Text.extend({text:z.string().default("Some more "), fs: z.number().default(44)
}).describe("short"),
img: Image.describe("image"),
img2: Image.describe("image"),
img3: Image.describe("image"),
img4: Image.describe("image"),
img5: Image.describe("image"),


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