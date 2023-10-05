'use client'

import { AbsoluteFill, useCurrentFrame, Easing, interpolate, useVideoConfig, } from 'remotion';
import {inputPropsSchema} from './config';
import { Text_A } from '../../components/Text/Text_Full';
// import { cn } from '../../../lib/utils';
import { z } from 'zod';
import { BannerQuer } from '../../components/Banners/BannerQuer';


export type SubuProps = z.infer<typeof inputPropsSchema>;


export function SubuMotion(props: SubuProps) {
    

    const frame = useCurrentFrame()
    const {width, height, durationInFrames} = useVideoConfig()

    const animation = interpolate(frame, [0, durationInFrames*0.8], [20, 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.ease })

    return (
        <AbsoluteFill style={{ backgroundColor:'orange', width:width, height:height }} 
                      className=' items-center justify-center'>

       <Text_A props={{text: props.short?.text, x:animation, linearBG:props.short?.linearBG, fs:props.short?.fs, ...props.short} }  />

       <BannerQuer Texter={props.bannerText?.text!} />

        </AbsoluteFill>
    );
}