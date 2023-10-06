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

export function AnfaMotion({ sText, img, color1, vide }: AnfaProps) {
	const frame = useCurrentFrame();
	const { width, height, durationInFrames } = useVideoConfig();
	 console.log(vide, "vide ??")
	// console.log(image1, "prosp")
	const animation = interpolate(frame, [0, durationInFrames * 0.8], [-200, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.ease,
	});

	return (
		<AbsoluteFill
			style={{
				backgroundImage: `url(${img})`,
				backgroundSize: `cover`,
				backgroundRepeat: 'no-repeat',
				//  background: 'lime',
				width: width,
				height: height,
			}}
			className=" items-center justify-center"
		>
			<Text_A
				props={{
					text: sText?.text,
					y: animation,
					width: width,
					color: color1,
					...sText
				}}
			/>

			 {/* <Video style={{width:'200px', height:'200px'}} src={vide as string}/>  */}
		</AbsoluteFill>
		
	);
}
