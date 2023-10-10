export const extractDataFromProps = (props: any) => {
	// console.log(props, "props")
    const colors: any[] = [];

	const images: any[] = [];

	const mid: any[] = [];
	const short: any[] = [];
	const videos: any[] = [];

	props.forEach(({props}:any) => {
        // console.log(prop, "single prop")
		// Extract colors
		colors.push(...props.colors);

		// Extract images
		images.push(...props.images);
		videos.push(...props.videos);

		// Extract mid data
		props.mid.forEach((item:any) => {
			for (const key in item) {
				mid.push({ [key]: item[key] });
			}
		});

		// Extract short data
		props.short.forEach((item:any) => {
			for (const key in item) {
				short.push({ [key]: { ...item[key] } });
			}
		});
	});

	return {
		colors,
		images,
		videos,
		mid,
		short,
	};
};
