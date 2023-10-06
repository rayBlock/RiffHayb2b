'use client';

import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
// import { cn } from '../../../lib/utils';
import { z } from 'zod';

import { Text_A } from '../../components/Text/Text_Full';
import { inputPropsSchema } from './config';

export type PikarProps = z.infer<typeof inputPropsSchema>;

export function PikarMotion(props: PikarProps) {
	const frame = useCurrentFrame();
	const { width, height, durationInFrames } = useVideoConfig();

	const animation = interpolate(frame, [0, durationInFrames * 0.8], [20, 50], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.ease,
	});

	return (
		<AbsoluteFill
			style={{ backgroundColor: '#fff', width: width, height: height }}
			className=" items-center justify-center"
		>
			<Text_A props={{ text: props.shorty, x: animation }} />
		</AbsoluteFill>
	);
}
