import { useState } from 'react';

import { cn } from '../../../lib/utils';

export type TextArgs = {
	text: any;
	maxWidth?: number;
	linearBG?: boolean;
	linearDegBG?: number;
	colorBG?: React.CSSProperties['color'];
	colorBG2?: React.CSSProperties['color'];
	width?: number;
	paddingT?: React.CSSProperties['padding'];
	paddingR?: React.CSSProperties['padding'];
	paddingB?: React.CSSProperties['padding'];
	paddingL?: React.CSSProperties['padding'];
	borderW?: React.CSSProperties['borderWidth'];
	borderStyle?: React.CSSProperties['borderStyle'];
	borderColor?: React.CSSProperties['borderColor'];
	borderRadius?: React.CSSProperties['borderRadius'];
	fs?: number;
	color?: React.CSSProperties['color'];
	stroke?: number;
	strokeColor?: React.CSSProperties['color'];
	x?: string | number;
	userX?: string | number;
	y?: string | number;
	userY?: string | number;
	rotate?: number;
	skewX?: number;
	skewY?: number;
	fontW?: React.CSSProperties['fontWeight'];
	fontFamily?: React.CSSProperties['fontFamily'];
	italic?: React.CSSProperties['fontStyle'];
	shadowOffsetX?: number;
	shadowOffsetY?: number;
	shadow?: number;
	shadowColor?: React.CSSProperties['textShadow'];
	decorationColor?: React.CSSProperties['textDecorationColor'];
	decorationStyle?: React.CSSProperties['textDecorationStyle'];
	decorationLine?: React.CSSProperties['textDecorationLine'];
	decorationW?: React.CSSProperties['textDecorationThickness'];
	transform?: React.CSSProperties['textTransform'];
	transformer?: string;
};

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
	className?: string;
	children?: React.ReactNode;
	props: TextArgs;
}

const defaultProps: TextArgs = {
	text: '',
	linearBG: false,
	linearDegBG: 0,
	colorBG: 'transparent',
	colorBG2: 'transparent',
	width: 720,
	paddingT: 0,
	paddingR: 0,
	paddingB: 0,
	paddingL: 0,
	borderW: 0,
	borderStyle: 'none',
	borderColor: 'black',
	borderRadius: 0,
	fs: 84,
	color: 'black',
	stroke: 0,
	strokeColor: 'black',
	x: 0,
	userX: 0,
	y: 0,
	userY: 0,
	rotate: 0,
	skewX: 0,
	skewY: 0,
	fontW: 900,
	fontFamily: 'Roboto',
	italic: '',
	shadowOffsetX: 0,
	shadowOffsetY: 0,
	shadow: 0,
	shadowColor: '',
	decorationColor: '',
	decorationStyle: 'unset',
	decorationLine: '',
	decorationW: 0,
	transform: 'none',
	transformer: '',
};

export const Text_A_Selected: React.FC<TextProps> = ({
	// children,
	className,
	props,
	// translateX(${banners1Appear}px) translateX(${banners1Disappear}px)
}) => {
	const mergedProps = Object.assign({}, defaultProps, props); // Merge default props with provided props
	const [selected, setSelected] = useState(false);

	return (
		<div
			className={cn(selected ? 'border absolute  border-blue-500 text-red-500 px-3 py-2 ' : '', '')}
		>
			<p
				onClick={() => (setSelected(!selected), console.log(selected, 'select'))}
				style={{
					background: mergedProps.linearBG
						? `linear-gradient(${mergedProps.linearDegBG}deg, ${mergedProps.colorBG}, ${mergedProps.colorBG2})`
						: mergedProps.colorBG,
					width: `max-content`,
					maxWidth: `${mergedProps.width}px`,
					padding: `${mergedProps.paddingT}px ${mergedProps.paddingR}px ${mergedProps.paddingB}px ${mergedProps.paddingL}px`,
					border: `${mergedProps.borderW}px ${mergedProps.borderStyle} ${mergedProps.borderColor}`,

					borderRadius: `${mergedProps.borderRadius}px`,
					fontSize: `${mergedProps.fs}px`,
					color: mergedProps.color,
					WebkitTextStrokeWidth: `${mergedProps.stroke}px`,
					WebkitTextStrokeColor: mergedProps.strokeColor,
					transform: `translate(${mergedProps.x}px,${mergedProps.y}px) translate(${mergedProps.userX}px,${mergedProps.userY}px) 
                            rotate(${mergedProps.rotate}deg) skew(${mergedProps.skewX}deg, ${mergedProps.skewY}deg),
                             ${mergedProps.transformer}`,
					fontWeight: mergedProps.fontW,
					fontFamily: mergedProps.fontFamily,
					fontStyle: mergedProps.italic,
					textShadow: `${mergedProps.shadowOffsetX}px ${mergedProps.shadowOffsetY}px ${mergedProps.shadow}px ${mergedProps.shadowColor}`,
					textDecoration: `${mergedProps.decorationColor} ${mergedProps.decorationStyle} ${mergedProps.decorationLine}`,
					textDecorationThickness: `${mergedProps.decorationW}px`,

					textTransform: mergedProps.transform,
				}}
				className={cn('m-0 cursor-pointer ', className)}
			>
				{mergedProps.text ? mergedProps.text : ''}
			</p>
		</div>
	);
};
