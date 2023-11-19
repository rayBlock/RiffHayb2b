import { useState } from 'react';

import { cn } from '../../../lib/utils';

export type TextArgs = {
	text: any;
	opa?: number;
	maxWidth?: number;
	bgLinear?: boolean;
	bgLinearDeg?: number;
	bg?: React.CSSProperties['color'];
	bg2?: React.CSSProperties['color'];
	width?: number;
	paddingT?: React.CSSProperties['padding'];
	paddingR?: React.CSSProperties['padding'];
	paddingB?: React.CSSProperties['padding'];
	paddingL?: React.CSSProperties['padding'];
	borderAdvanced?: boolean;
	borderTcolor?: React.CSSProperties['color'];
	borderRcolor?: React.CSSProperties['color'];
	borderBcolor?: React.CSSProperties['color'];
	borderLcolor?: React.CSSProperties['color'];
	borderTW?: number;
	borderRW?: number;
	borderBW?: number;
	borderLW?: number;
	borderRadiusTR?: number;
	borderRadiusTL?: number;
	borderRadiusBR?: number;
	borderRadiusBL?: number;
	borderW?: React.CSSProperties['borderWidth'];
	borderStyle?: React.CSSProperties['borderStyle'];
	borderColor?: React.CSSProperties['borderColor'];
	borderRadius?: React.CSSProperties['borderRadius'];
	fs?: number;
	lineHeight?: number;
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
	fontStyle?: React.CSSProperties['fontStyle'];
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
	opa: 1,
	bgLinear: false,
	bgLinearDeg: 0,
	bg: 'transparent',
	bg2: 'transparent',
	width: 720,
	paddingT: 0,
	paddingR: 0,
	paddingB: 0,
	paddingL: 0,
	borderAdvanced: false,
	borderW: 0,
	borderStyle: 'none',
	borderColor: 'black',
	borderTcolor: 'black',
	borderRcolor: 'black',
	borderBcolor: 'black',
	borderLcolor: 'black',
	borderTW: 1,
	borderRW: 1,
	borderBW: 1,
	borderLW: 1,
	borderRadius: 0,
	borderRadiusTR: 0,
	borderRadiusTL: 0,
	borderRadiusBR: 0,
	borderRadiusBL: 0,
	fs: 55,
	lineHeight: 55,
	color: 'white',
	stroke: 0,
	strokeColor: 'black',
	x: 0,
	userX: 0,
	y: 0,
	userY: 0,
	rotate: 0,
	skewX: 0,
	skewY: 0,
	fontW: 600,
	fontFamily: 'Roboto',
	fontStyle: '',
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

export const Text_A: React.FC<TextProps> = ({
	// children,
	className,
	props,
	// translateX(${banners1Appear}px) translateX(${banners1Disappear}px)
}) => {
	//  console.log(props, "props in text");

	const mergedProps = Object.assign({}, defaultProps, props); // Merge default props with provided props
	const [selected, setSelected] = useState(false);
	console.log(mergedProps, "merged in Text");

	return (
		<p
			onClick={() => (setSelected(!selected), console.log(selected, 'select'))}
			style={{
				background: mergedProps.bgLinear
					? `linear-gradient(${mergedProps.bgLinearDeg}deg, ${mergedProps.bg}, ${mergedProps.bg2})`
					: mergedProps.bg,
				//adjust width for user width: `100px`,
				maxWidth: `${mergedProps.width}px`,
				padding: `${mergedProps.paddingT}px ${mergedProps.paddingR}px ${mergedProps.paddingB}px ${mergedProps.paddingL}px`,



				border: `${mergedProps.borderW}px ${mergedProps.borderStyle} ${mergedProps.borderColor}`,

				borderTopColor: mergedProps.borderAdvanced ? `${mergedProps.borderTcolor}`
					: mergedProps.borderColor,
				borderRightColor: mergedProps.borderAdvanced ? `${mergedProps.borderRcolor}`
					: mergedProps.borderColor,
				borderBottomColor: mergedProps.borderAdvanced ? `${mergedProps.borderBcolor}`
					: mergedProps.borderColor,
				borderLeftColor: mergedProps.borderAdvanced ? `${mergedProps.borderLcolor}`
					: mergedProps.borderColor,




				borderRadius: `${mergedProps.borderRadius}px`,
				borderTopLeftRadius: `${mergedProps.borderRadiusTL}`,

				fontSize: `${mergedProps.fs}px`,
				color: mergedProps.color,
				WebkitTextStrokeWidth: `${mergedProps.stroke}px`,
				WebkitTextStrokeColor: mergedProps.strokeColor,
				transform: `translate(${mergedProps.x}px,${mergedProps.y}px)
                            translate(${mergedProps.userX}px,${mergedProps.userY}px) 
                            rotate(${mergedProps.rotate}deg)
                            skew(${mergedProps.skewX}deg, ${mergedProps.skewY}deg)
                            ${mergedProps.transformer}
                            `,
				fontWeight: mergedProps.fontW,
				fontFamily: mergedProps.fontFamily,
				fontStyle: mergedProps.fontStyle,
				textShadow: `${mergedProps.shadowOffsetX}px ${mergedProps.shadowOffsetY}px ${mergedProps.shadow}px ${mergedProps.shadowColor}`,
				textDecoration: `${mergedProps.decorationColor} ${mergedProps.decorationStyle} ${mergedProps.decorationLine}`,
				textDecorationThickness: `${mergedProps.decorationW}px`,
				lineHeight: ` ${mergedProps.fs}px`,
				textTransform: mergedProps.transform,
				paintOrder: "stroke fill",
				opacity: `${mergedProps.opa}`
			}}
			className={cn('m-0 cursor-pointer absolute ', className)}
		>
			{mergedProps.text ? mergedProps.text : ''}
		</p>
	);
};
