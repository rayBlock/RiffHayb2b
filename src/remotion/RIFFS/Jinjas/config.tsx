import type { CompConfig } from  '../../../types/remotion'
import { Text } from '../../utils/schemas/text-schema'
import {Image} from '../../utils/schemas/image-schema'
import { JinjasMotion, type JinjasProps } from './Jinjas';
import { z } from 'zod';
import { Color } from '../../utils/schemas/color-schema';


const id = 'Jinjas';
const durationInFrames = 90;
const minDurationFrames = durationInFrames - 20
const maxDurationFrames = durationInFrames + 20

export const inputPropsSchema = z.object({
 name: z.string().default('Jinjas'),
sText: Text.extend({fs: z.number().default(44)}).describe('short'),
mText: Text.extend({fs: z.number().default(23)}).describe("mid"),
lText: Text.extend({fs: z.number().default(22)}).describe("long"),
longText: Text.extend({fs: z.number().default(20)}).describe("long"),
selected: z.boolean(),
// image1: Image.default("https://someurl.com"),
color1: Color.default("black"),
color2: Color.default("red"),
color3: Color.default("white")

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