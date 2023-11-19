'use client';

import { AbsoluteFill, Easing,  interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
// import { cn } from '../../../lib/utils';
import { z } from 'zod';

import { Text_A } from '../../components/Text/Text_Full';
import { inputPropsSchema } from './config';

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

export function AnfaMotion({ img, sText2, mText }: AnfaProps) {
	const frame = useCurrentFrame();
	const { width, height, durationInFrames } = useVideoConfig();
	const animation = interpolate(frame, [0, durationInFrames], [-100, 6750], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.ease,
	});

	// console.log(mText, "texter");
	

	const colorG = frame === 0 ? "red" : 
	frame === 1 ? "blue" : 
	frame === 2 ?  "orange" : 
	frame === 10 ?  "orange" : sText2?.color

	return (
		<AbsoluteFill
			style={{
				backgroundImage: `url(${img})`,
				backgroundSize: `cover`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				//  background: 'lime',
				width: width,
				height: height,
				overflow: 'hidden'
			}}
			className=" items-center justify-center"
		>
			{/* <Text_A
				props={{
					text: sText?.text,
					y: animation - 120,
					width: width,
					color: color1,
					...sText
				}}
			/> */}
			<Text_A
				props={{
					text: sText2?.text,
					y: animation + 100,
					width: width,
					color: colorG,
					...sText2
				}}
			/>
			<Text_A
				props={{
					text: mText?.text ,
					y: animation  -200,
					shadow: 3,
					shadowColor: 'black',
					width: width * 0.8,
					color: mText?.color,
					stroke: 2,
					strokeColor:'black',
					...mText
				}}
			/>
			

			 {/* <Video style={{width:'200px', height:'200px'}} src={vide as string}/>  */}
		</AbsoluteFill>
		
	);
}
