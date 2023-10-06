export interface FrameSchema {
	durationInFrames: number;
	minDurationFrames: number;
	maxDurationFrames: number;
}

export interface FramesCalculationInput {
	props: FrameSchema[];
	seekedDuration: number;
	locked?: number[];
	traverseDuration?: number | undefined;
}

export interface FramesCalculationOutput {
	individualDurations: number[];
	extraVariableDurations: number[];
}
