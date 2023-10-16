export function useCurrentRiff(data: any, frameNumber: number) {
	// Calculate the total duration of all items in the data array

	// console.log(data, "data in current Riff")
	// const totalDuration = data.reduce((total:any, item:any) => total + item.duration, 0);
	let currentPosition = 0;

	for (let i = 0; i < data.length; i++) {
	
		currentPosition += data[i].duration;

		if (frameNumber < currentPosition) {
			return data[i];
		}
	}

	return null; // Handle cases where frameNumber exceeds the total duration.
}
