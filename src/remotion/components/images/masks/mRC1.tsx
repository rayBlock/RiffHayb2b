import { useMemo } from 'react';
import { Easing,Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

import { cn } from '../../../../lib/utils';

type rectAni = 'keepUp' | 'height' | 'keepUpSmaller';

export const MultiRectColsMask1: React.FC<{
	src: string;
	className?: string;
	height?: number;
	animationDuration?: number;
}> = ({ src, className, height = 350, animationDuration = 40 }) => {
	const { width, fps } = useVideoConfig();
	const frame = useCurrentFrame();
	const RECT_SPACE = 100;
	const BAR_SPACE = 80;
	const START_POS = 60;

	const clipRectangles = Math.floor(width / RECT_SPACE);
	// console.log(clipRectangles, "rects")

	const vectorMargin = (width - (clipRectangles * RECT_SPACE - (RECT_SPACE - BAR_SPACE))) / 2;
	// console.log(vectorMargin, "margin")

	function getRandomNumberAround(num: number) {
		// Calculate the range for random number generation
		const minRange = num - 150;

		// Generate a random number within the range
		const randomNum = Math.random() * (num - minRange) + minRange;

		return randomNum;
	}

	function createArrayOfObjects(numObjects: number, num: number) {
		const objectsArray = [];

		for (let i = 0; i < numObjects; i++) {
			const randomNum = Math.floor(getRandomNumberAround(num));

			const newObj = {
				id: i + 1, // You can use a different identifier if needed
				randomNumber: randomNum,
			};

			objectsArray.push(newObj);
		}

		return objectsArray;
	}

	const arrayOfObjects = useMemo(() => {
		return createArrayOfObjects(clipRectangles, height);
	}, [height, clipRectangles]);

	const rectangleHeight = ({ h, type }: { h: number; type: rectAni }): number => {
		const progress = spring({
			fps,
			frame,
			config: {
				damping: 100,
			},
			durationInFrames: animationDuration,
		});
		if (type === 'height')
			return interpolate(progress, [0, 1], [START_POS, h], {
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
				easing: Easing.ease,
			});
		else
			return interpolate(progress, [0, 1], [height / 2, (height - h) / 2], {
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
				easing: Easing.ease,
			});
	};

	return (
		<div
			className={cn(className)}
			style={{ display: 'flex', transform: `scale(0.95)`, justifyContent: 'center' }}
		>
			{/* @ts-ignore */}
			<Img
				style={{
					clipPath: `url(#myClip)`,
					//  maskImage: maskImage, WebkitMaskImage: maskImage
				}}
				src={src}
				width={'100%'}
			/>
			<svg width="0" height="0">
				<defs>
					<clipPath id="myClip">
						{arrayOfObjects.map((_, i) => {
							// console.log(_)
							return (
								<rect
									key={i}
									width={BAR_SPACE}
									y={rectangleHeight({ h: _.randomNumber, type: 'keepUp' })}
									height={rectangleHeight({ h: _.randomNumber, type: 'height' })}
									x={i * RECT_SPACE + vectorMargin}
									rx={40}
								/>
							);
						})}
					</clipPath>
				</defs>
			</svg>
		</div>
	);
};
