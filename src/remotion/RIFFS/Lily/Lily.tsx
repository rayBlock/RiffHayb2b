'use client';

import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
// import { cn } from '../../../lib/utils';
import { z } from 'zod';

// import { MultiRectColsMask } from '../../components/images/masks/multipleRectanglesColsBasis';
import { MultiRectColsMask1 } from '../../components/images/masks/mRC1';
import { Text_A } from '../../components/Text/Text_Full';
import { inputPropsSchema } from './config';

export type LilyProps = z.infer<typeof inputPropsSchema>;

export function LilyMotion({ sText, img }: LilyProps) {
	// console.log(data, "data ??")
	const frame = useCurrentFrame();
	const { width, height, durationInFrames } = useVideoConfig();

	const animation = interpolate(frame, [0, durationInFrames * 0.5], [20, 50], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.ease,
	});

	return (
		<AbsoluteFill
			style={{ backgroundColor: '#BEF261', width: width, height: height }}
			className=" items-center justify-center"
		>
			<Text_A props={{ text: sText?.text, fs: sText?.fs, x: animation }} />

			<MultiRectColsMask1
				height={1200}
				src={img as string}
			/>
			{/* @ts-ignore */}
			{/* <Img src='https://firebasestorage.googleapis.com/v0/b/rayriffs-420.appspot.com/o/ai-images%2F003ccb17-8184-49b6-9dd7-739e63138fea.jpg?alt=media&token=3aab7430-c43b-4163-b2c7-265e88f1dcb4'
                    width={500} height={200} /> */}

			{/* <Image alt='' width={200} height={300} src='https://firebasestorage.googleapis.com/v0/b/rayriffs-420.appspot.com/o/ai-images%2F003ccb17-8184-49b6-9dd7-739e63138fea.jpg?alt=media&token=3aab7430-c43b-4163-b2c7-265e88f1dcb4' /> */}
			{/* <img className=''  src='https://firebasestorage.googleapis.com/v0/b/rayriffs-420.appspot.com/o/ai-images%2F003ccb17-8184-49b6-9dd7-739e63138fea.jpg?alt=media&token=3aab7430-c43b-4163-b2c7-265e88f1dcb4' /> */}
		</AbsoluteFill>
	);
}
