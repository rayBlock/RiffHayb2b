

import { AbsoluteFill, useCurrentFrame, Easing, interpolate, useVideoConfig, } from 'remotion';
import { inputPropsSchema } from './config';
import { Text_A } from '../../components/Text/Text_Full';
// import { cn } from '../../../lib/utils';
import { z } from 'zod';
import { Text_A_Selected } from '../../components/Text/Text_Full_Selected';
// import { atom, useAtom } from 'jotai';


export type JinjasProps = z.infer<typeof inputPropsSchema>;


export function JinjasMotion(data:any,{ sText, selected,  }: JinjasProps) {
            // console.log(data.shortS.text, "dagta.. in jinja")
    const frame = useCurrentFrame()
    const { width, height, durationInFrames } = useVideoConfig()

    const animation = interpolate(frame, [0, durationInFrames * 0.8], [20, 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.ease })

    return (
        <AbsoluteFill style={{ backgroundColor: 'pink', width: width, height: height }}
            className=' items-center justify-center'>

            {/* <div onClick={() => console.log("some")}
                className='text-green-600 text-3xl cursor-pointer'>
                hello
            </div> */}
            <Text_A_Selected props={{ text: data.shortS?.text, x: animation, userX: 0, ...data.shortS }} />

           {selected ? <Text_A_Selected props={{ text: data.shortS?.text, x: animation, userX: 0 }} /> :
            <Text_A props={{ text: sText, x: animation, userX: 0,  }} />}

        </AbsoluteFill>
    );
}