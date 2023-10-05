import type { CompConfig } from  '../../../types/remotion'
import { Text } from '../../utils/schemas/text-schema'
import { SubuMotion, type SubuProps } from './Subu';
import { z } from 'zod';


const id = 'Subu';
const durationInFrames = 90;
const minDurationFrames = durationInFrames - 20
const maxDurationFrames = durationInFrames + 20

export const inputPropsSchema =  z.object({
name: z.string().default('Subu'),
short: Text.describe("short"),
bannerText: Text.extend({fs: z.number().default(33)}),
img: z.string().url().describe("image"),
color1: z.string().default("#F04C00").describe("color"),


})
.deepPartial();


export const SubuRiff = {
id,
durationInFrames,
minDurationFrames,
maxDurationFrames,
inputPropsSchema,
component: SubuMotion,
} satisfies CompConfig<SubuProps>;