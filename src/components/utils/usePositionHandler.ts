
export interface iPosition {
	mainWindow: number | any
	propsState: any
	positionState:any
	positionActions: any

}


export function usePositionHandler({mainWindow, propsState, positionState, positionActions}:iPosition): any {
	const orientation = propsState.orientation
	const menu = positionState.menu

	const colorsBoo = menu.colors;
	const imagesBoo = menu.images;
	const textsBoo = menu.texts;
		console.log(mainWindow, orientation, menu, "images ", imagesBoo, "textsBoo", textsBoo, "and ", colorsBoo);
		





	return ""; // Handle cases where frameNumber exceeds the total duration.
}
