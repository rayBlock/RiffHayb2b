'use client';

import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
// import { cn } from '../../../lib/utils';
import { z } from 'zod';

import { Text_A } from '../../components/Text/Text_Full';
import { inputPropsSchema } from './config';

export type SempaProps = z.infer<typeof inputPropsSchema>;

export function SempaMotion(props: SempaProps) {
	// console.log(props, "sempa otion props")
	const frame = useCurrentFrame();
	const { width, height, durationInFrames } = useVideoConfig();

	const animation = interpolate(frame, [0, durationInFrames * 0.8], [20, 50], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.ease,
	});

	return (
		<AbsoluteFill
			style={{ backgroundColor: 'pink', width: width, height: height }}
			className=" items-center justify-center"
		>
			<Text_A
				props={{ text: props.shorty?.text, x: animation }}
				className="text-white text-6xl font-bold"
			/>
		</AbsoluteFill>
	);
}
