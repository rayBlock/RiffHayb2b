import type { playerDimensions } from './propsReducer';

// Define action types
const UPDATE_ITEM_POSITION = 'UPDATE_ITEM_POSITION'; // You can use your custom action type
const UPDATE_MENU = 'UPDATE_MENU'; // You can use your custom action type
const UPDATE_ORIENTATION = 'UPDATE_ORIENTATION'; // You can use your custom action type
const UPDATE_PLAYING = 'UPDATE_PLAYING'; // You can use your custom action type

export interface UpdateItemPositionAction {
	type: typeof UPDATE_ITEM_POSITION;
	payload: {
		nameX: string;
		valueX: number;
		nameY: string;
		valueY: number; // You may want to adjust the type based on the nature of data
	};
}
export type menuPropNames = 'colors' | 'images' | 'videos' | 'texts';

export interface UpdateMenuAction {
	type: typeof UPDATE_MENU;
	payload: {
		name: menuPropNames;
	};
}

export interface UpdateOrientationAction {
	type: typeof UPDATE_ORIENTATION;
	payload: {
		value: playerDimensions;
	};
}

export interface UpdatePlayingAction {
	type: typeof UPDATE_PLAYING;
	payload: {
		value: boolean;
	};
}
export type PositionDataActionTypes =
	| UpdateItemPositionAction
	| UpdateMenuAction
	| UpdateOrientationAction
	| UpdatePlayingAction;

// Define the state type
export interface PositionDataObject {
	orientation: playerDimensions;
	playing?: boolean
	menu: {
		colors: boolean;
		colorsX: number;
		colorsY: number;
		texts: boolean;
		textsX: number;
		textsY: number;
		images: boolean;
		imagesY: number;
		imagesX: number;
		videos: boolean;
		videosX: number;
		videosY: number;
	};
}

export const positionReducer = (
	state: PositionDataObject,
	action: PositionDataActionTypes
): PositionDataObject => {
	switch (action.type) {
		case UPDATE_ITEM_POSITION:
			// Find the item with a matching id
			return {
				...state,
				menu: {
					...state.menu,
					[action.payload.nameX]: action.payload.valueX,
					[action.payload.nameY]: action.payload.valueY,
				},
			};

		case UPDATE_MENU:
			return {
				...state,
				menu: {
					...state.menu,
					[action.payload.name]: !state.menu[action.payload.name],
				},
			};

		case UPDATE_ORIENTATION:
			return {
				...state,
				orientation: action.payload.value,
			};
			case UPDATE_PLAYING:
				return {
					...state,
					playing: action.payload.value,
				};
		default:
			return state;
	}
};
