'use client';

import { Fragment } from 'react';
import zodToJsonSchema from 'zod-to-json-schema';
import type { JsonSchema7ObjectType } from 'zod-to-json-schema/src/parsers/object';

import { JinjasMotion } from './RIFFS/Jinjas/Jinjas';
import { PikarRiff } from './RIFFS/Pikar/config';
import { SempaMotion } from './RIFFS/Sempa/Sempa';
import { SubuRiff } from './RIFFS/Subu/config';
import TransitionSeries from './utils/remotion-flow/TransitionSeries';
import { CircularWipe } from './utils/remotion-flow/traverse/CircularWipe';
import { Dissolve } from './utils/remotion-flow/traverse/Dissolve';
import { LinearWipe } from './utils/remotion-flow/traverse/LinearWipe';
import { Pan } from './utils/remotion-flow/traverse/Pan';
import { Slide } from './utils/remotion-flow/traverse/Slide';
import { SlidingDoors } from './utils/remotion-flow/traverse/SlidingDoors';

const TraverseComponents = [
	(props: any) => <LinearWipe {...props} />,
	(props: any) => <Dissolve {...props} />,
	(props: any) => <CircularWipe {...props} />,
	(props: any) => <SlidingDoors {...props} />,
	(props: any) => <Slide {...props} />,
	(props: any) => <Pan {...props} />,
];

// const Riffs = [
//     {riff: SubuRiff.component, schema: SubuRiff.inputPropsSchema, minDuration: SubuRiff.minDurationFrames, maxDuration: SubuRiff.maxDurationFrames },
//     {riff: PikarRiff.component, schema: PikarRiff.inputPropsSchema, minDuration: PikarRiff.minDurationFrames, maxDuration: PikarRiff.maxDurationFrames },

// ]

const jsonSchema = zodToJsonSchema(PikarRiff.inputPropsSchema, {
	$refStrategy: 'none',
}) as JsonSchema7ObjectType;

console.log(jsonSchema, 'riffs ?');
// Components Array
// Transitions =   comps -1   Array  sits always in between
//  duration for each thingy
// the inputProps for each thingy

type iRiff = {
	component: JSX.Element;
	traverse: number;
	durationComponent: number;
	durationTraverse: number;
	props: any;
};

export const dataInputter = [
	{
		component: SubuRiff.component,
		traverse: 4,
		durationComponent: 60,
		durationTraverse: 20,
		props: {
			short: { text: 'some more news', fs: 100, rotate: 30, color: 'red' },
		},
	},
	{
		component: SempaMotion,
		traverse: 2,
		durationComponent: 60,
		durationTraverse: 20,
		props: {
			shorty: { text: 'hello from data', fs: 84, color: 'red' },
		},
	},
	{
		component: SempaMotion,
		traverse: 3,
		durationComponent: 60,
		durationTraverse: 20,
		props: {
			shorty: { text: 'halo 2 data', fs: 44, color: 'green', bgColor: 'orange' },
		},
	},
	{
		component: JinjasMotion,
		traverse: 1,
		durationComponent: 60,
		durationTraverse: 20,
		props: {
			shor1: { text: 'Headline Title' },
			sho2: { text: 'Subtitle text' },
			color1: '#fff',
		},
	},
];

export default function RiffBabe(inputData: any) {
	// console.log(inputData.dataInputter, "array length")

	// const riff = inputData.data[0]

	const ComponentChooser = ({ data }: any) => {
		const Component = data.component;
		const props = data.props;
		return <Component key={data.component.name.toString()} {...props} />;
	};

	return (
		<TransitionSeries>
			{inputData.dataInputter.map((so: iRiff, i: number) => (
				<Fragment key={i}>
					<TransitionSeries.Sequence durationInFrames={so.durationComponent}>
						<ComponentChooser data={so} i={i} />
					</TransitionSeries.Sequence>

					{inputData.dataInputter.length - 1 !== i ? (
						<TransitionSeries.Transition
							durationInFrames={so.durationTraverse}
							transitionComponent={TraverseComponents[so.traverse]}
						/>
					) : null}
				</Fragment>
			))}

			{/* {inputData.dataInputter.map((riff: iRiff, i: number) => 


                <Fragment key={riff.component}>

                    <TransitionSeries.Sequence durationInFrames={riff.durationComponent}>
                            <ComponentChooser data={riff}  /> 
                            <SubuMotion />
                    </TransitionSeries.Sequence>

                    {inputData.data.length !== i ? <TransitionSeries.Transition
                        durationInFrames={riff.durationTraverse}
                        transitionComponent={TraverseComponents[riff.traverse]}

                    /> : null}

                </Fragment>

            )} */}

			{/* <Fragment key={riff.component}>
                    <TransitionSeries.Sequence durationInFrames={riff.durationComponent}>
                        <Jinjas />
                    </TransitionSeries.Sequence>

                 <TransitionSeries.Transition
                        durationInFrames={riff.durationTraverse}
                        transitionComponent={TraverseComponents[riff.traverse]}
                    // {...props}
                    /> 

                </Fragment> */}
			{/* 
            <TransitionSeries.Sequence durationInFrames={100}>
                <Jinjas />
            </TransitionSeries.Sequence>


            <TransitionSeries.Transition
                durationInFrames={20}
                transitionComponent={TraverseComponents[2]}
                // {...props}
            />


            <TransitionSeries.Sequence durationInFrames={100}>
                <SempaMotion />
            </TransitionSeries.Sequence> */}
		</TransitionSeries>
	);
}
