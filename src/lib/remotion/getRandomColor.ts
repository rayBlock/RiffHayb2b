




export function getRandomPastelColorWithVariations(): string {
	// Define the range of pastel hues (e.g., 30-240 degrees)
	const minHue: number = 30;
	const maxHue: number = 240;

	// Define fixed base saturation and lightness for pastel colors
	const baseSaturation: number = 75;
	const baseLightness: number = 85;

	// Generate a random hue within the defined range
	const hue: number = Math.floor(Math.random() * (maxHue - minHue + 1)) + minHue;

	// Generate random variations for saturation and lightness
	const saturationVariation: number = (Math.random() * 20 - 10) / 100; // Random saturation shift (-10% to +10%)
	const lightnessVariation: number = (Math.random() * 20 - 10) / 100; // Random lightness shift (-10% to +10%)

	// Calculate the final saturation and lightness values
	const saturation: number = clamp(baseSaturation + baseSaturation * saturationVariation, 0, 100);
	const lightness: number = clamp(baseLightness + baseLightness * lightnessVariation, 0, 100);

	// Construct the HSL color string
	const hslColor: string = `hsl(${hue}, ${saturation.toFixed(2)}%, ${lightness.toFixed(2)}%)`;

	return hslColor;
}

function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}


