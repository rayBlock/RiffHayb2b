import type { CompConfig } from '../../../types/remotion'
import { Text } from '../../utils/schemas/text-schema'
import { Image, im } from '../../utils/schemas/image-schema'
import { AnfaMotion, type AnfaProps } from './Anfa';
import { z } from 'zod';


const id = 'Anfa';
const durationInFrames = 90;
const minDurationFrames = durationInFrames - 20
const maxDurationFrames = durationInFrames + 20

export const inputPropsSchema = z.object({
name: z.string().default('Anfa'),
sText: Text.extend({fs: z.number().default(44)
}).describe('short'),
image1: im,


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