import React, { type PropsWithChildren, useMemo } from 'react';
import { useCurrentFrame } from 'remotion';

import Sequence from './components/Sequence';
import Transition from './components/Transition';

type TransitionSeriesComponents = {
	Sequence: typeof Sequence;
	Transition: typeof Transition;
};

type TransitionSeriesChildTypes =
	| React.ReactElement<typeof Sequence>
	| React.ReactElement<typeof Transition>;

type TransitionSeriesComponentType = ((props: {
	children: React.ReactNode | React.ReactNode[];
}) => React.ReactElement | null) &
	TransitionSeriesComponents;

function isInside(start: number, end: number, value: number) {
	return value < end && value >= start;
}

type ReactChildArray = ReturnType<typeof React.Children.toArray>;

const flattenFirstLevelFragments = (children: React.ReactNode): ReactChildArray => {
	const childrenArray = React.Children.toArray(children);
	return childrenArray.reduce((flatChildren: ReactChildArray, child) => {
		if ((child as React.ReactElement<unknown>).type === React.Fragment) {
			return flatChildren.concat(
				React.Children.toArray(
					(child as React.ReactElement<PropsWithChildren<unknown>>).props.children
				)
			);
		}

		flatChildren.push(child);
		return flatChildren;
	}, []);
};

const DEBUG = false;

const TransitionSeries: TransitionSeriesComponentType = ({ children }) => {
	const currentFrame = useCurrentFrame();

	const visibleChildren = useMemo(() => {
		// Flatten the first level of React fragments
		const childArray = flattenFirstLevelFragments(children);

		let accumulatedDuration = 0;

		const activeChildren = React.Children.map(childArray, (child: any, i) => {
			if (
				// !React.isValidElement(child) ||
				!(child.type === Transition || child.type === Sequence)
			) {
				throw new Error(
					'<TransitionSeries/> can only have children of type: ReactFragment, TransitionSeries.Sequence, TransitionSeries.Transition'
				);
			}

			const offset = child.props.offset ?? 0;

			const duration = child.props.durationInFrames;

			if (child.type === Transition) {
				let transitionStartFrame = accumulatedDuration + offset - duration;

				if (transitionStartFrame < 0) {
					transitionStartFrame = 0;
					accumulatedDuration += duration;
				}

				if (!isInside(transitionStartFrame, transitionStartFrame + duration, currentFrame)) {
					// we're not currently in this transition, so skip it
					return null;
				}

				return React.cloneElement(child, {
					...child.props,

					from: transitionStartFrame,
					exitingElement: childArray[i - 1],
					enteringElement: childArray[i + 1],
				});
			}

			const nextChild: any = childArray[i + 1] as TransitionSeriesChildTypes;
			const prevChild: any = childArray[i - 1] as TransitionSeriesChildTypes;

			if (prevChild && prevChild.type === Transition) {
				accumulatedDuration -= prevChild.props.durationInFrames;
			}

			const startFrame = accumulatedDuration + offset;

			const isTransitioning = (() => {
				let start = 0;
				let end = 0;
				let isInsidePrevTransition = false;
				let isInsideNextTransition = false;

				if (prevChild && prevChild.type === Transition) {
					start = accumulatedDuration;

					end = start + prevChild.props.durationInFrames;

					isInsidePrevTransition = isInside(start, end, currentFrame);

					if (DEBUG) {
						console.log(`${i}:prev (${currentFrame})`, {
							start,
							end,
							d_t: prevChild.props.durationInFrames,
							duration,
							isInsidePrevTransition,
							accumulatedDuration,
						});
					}
				}

				if (nextChild && nextChild.type === Transition) {
					start = accumulatedDuration + duration - nextChild.props.durationInFrames;

					end = start + nextChild.props.durationInFrames;

					isInsideNextTransition = isInside(start, end, currentFrame);

					if (DEBUG) {
						console.log(`${i}:next (${currentFrame})`, {
							start,
							end,

							d_t: nextChild.props.durationInFrames,
							duration,
							isInsideNextTransition,
							accumulatedDuration,
						});
					}
				}

				if (isInsideNextTransition || isInsidePrevTransition) return true;

				return false;
			})();

			accumulatedDuration += duration;

			if (isTransitioning) {
				// if we're in a transition it's the transition component's
				// responsibility to render the item
				return null;
			}

			return React.cloneElement(child, {
				...child.props,
				key: `${i}-${child.key}`,

				from: startFrame,
			});
		});

		return activeChildren;
	}, [children, currentFrame]);

	return <>{visibleChildren}</>;
};

TransitionSeries.Sequence = Sequence;
TransitionSeries.Transition = Transition;

export default TransitionSeries;
