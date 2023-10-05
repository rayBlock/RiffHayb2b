'use client'

import { AbsoluteFill, useCurrentFrame, Easing, interpolate, useVideoConfig, } from 'remotion';
import { inputPropsSchema } from './config';
import { Text_A } from '../../components/Text/Text_Full';
// import { cn } from '../../../lib/utils';
import { z } from 'zod';

/*{
"midS": [
    "Erreichen Sie mehr potenzielle Kunden mit unseren hochwertigen Marketingvideos.",
    "Steigern Sie Ihre Online-Präsenz mit maßgeschneiderten Social Media Videos.",
    "Überzeugen Sie Ihre Zielgruppe mit professionellen Videos für Social Media.",
    "Erreichen Sie eine größere Reichweite mit unseren kreativen Marketingvideos.",
    "Verbessern Sie Ihre Sichtbarkeit und steigern Sie Ihren Erfolg mit unseren Videos."
  ],
  "longS": [
    "Steigern Sie Ihre Reichweite und Sichtbarkeit mit unseren hochwertigen Marketingvideos.",
    "Erreichen Sie Ihre Zielgruppe effektiv und überzeugend mit unseren maßgeschneiderten Social Media Videos."
  ],
  "shortS": [
    "Hochwertige Marketingvideos für Social Media",
    "Effektive und überzeugende Videos für Ihre Zielgruppe",
    "Maßgeschneiderte Videos für mehr Reichweite",
    "Steigern Sie Ihre Sichtbarkeit mit unseren Videos",
    "Professionelle Marketingvideos für Ihren Erfolg",
    "Kreative Videos für Ihre Social Media Kampagnen"
  ],}*/


export type AnfaProps = z.infer<typeof inputPropsSchema>;


export function AnfaMotion({ image1}: AnfaProps) {

    const frame = useCurrentFrame()
    const { width, height, durationInFrames } = useVideoConfig()

    // console.log(image1, "prosp")
    const animation = interpolate(frame, [0, durationInFrames * 0.8], [0, 250], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.ease })

    return (
        <AbsoluteFill style={{ backgroundImage: `url(${image1})`,
        backgroundSize: `cover`, backgroundRepeat: 'no-repeat',
        // background: 'pink',
         width: width, height: height }}
            className=' items-center justify-center'>

            <Text_A props={{ text: "Effektive und überzeugende Videos für Ihre Zielgruppe und andere sowie mehrere mehr und more ",
             x: animation, y: animation, width:width }} />


        </AbsoluteFill>
    );
}