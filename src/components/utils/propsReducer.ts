
interface InputProps {
	[key: string]: string;
}

export type playerDimensions =  "Landscape" | "Portrait" | "Square" | "custom";
// Define action types
const UPDATE_ITEM = 'UPDATE_ITEM'; // You can use your custom action type
const UPDATE_TEXT_ITEM = 'UPDATE_TEXT_ITEM';
const UPDATE_PLAYER_DIMENSION = "UPDATE_PLAYER_DIMENSION" // You can use your custom action type
 // You can use your custom action type

export interface UpdateItemAction {
	type: typeof UPDATE_ITEM;
	payload: {
		id: string;
		propName: string;
		value: any; // You may want to adjust the type based on the nature of data
	};
}
export interface UpdateTextItemAction {
	type: typeof UPDATE_TEXT_ITEM;
	payload: {
		id: string;
		propName: string;
		textProp:string;
		value: any; // You may want to adjust the type based on the nature of data
	};
}

export interface UpdatePlayerDimension {
	type: typeof UPDATE_PLAYER_DIMENSION
	payload: {
		playerWidth?: number;
		playerHeight?:number;
		orientation: playerDimensions; // You may want to adjust the type based on the nature of data
	};
}


export type MainDataActionTypes = UpdateItemAction  | UpdateTextItemAction | UpdatePlayerDimension ;

// Define the state type
export interface MainDataObject {
	data: Array<{
		comp: number;
		duration: string | number;
		id: string;
		max: number;
		min: number;
		name: string;
		props: InputProps | any; // Dynamic properties
	}>;
	duration: string;
	// images: string[];
	propsDock: {
		colors: Array<{ propName: string; id: string }>;
		images: Array<{ propName: string; id: string }>;
		texts: {
			short: Array<{ propName: string; id: string }>;
			mid: Array<{ propName: string; id: string }>;
			all: Array<{ propName: string; id: string }>;
		};
		videos: Array<{ propName: string; id: string }>;
	};
	orientation: playerDimensions;
	playerWidth: number | undefined;
	playerHeight:number | undefined;
	// prompt: string;
	// text: { output: object };
	
}

// Reducer function
export const propsReducer = (
	state: MainDataObject,
	action: MainDataActionTypes
): MainDataObject => {
	switch (action.type) {
		case UPDATE_ITEM:
			// Find the item with a matching id
			const updatedData = state.data.map((item) => {
				if (item.id === action.payload.id) {					
					// Update the specific property within the props object
					item.props[action.payload.propName] = action.payload.value;
				}
				return item;
			});

			return { ...state, data: updatedData };

			case UPDATE_TEXT_ITEM:
				// Find the item with a matching id
				const updatedTextColorData = state.data.map((item) => {
					if (item.id === action.payload.id) {
						// Update the specific property within the props object
						item.props[action.payload.propName][action.payload.textProp] = action.payload.value;
					}
					return item;
				});
	
				return { ...state, data: updatedTextColorData };
				

			case UPDATE_PLAYER_DIMENSION:
					

				
				return {...state,
					 orientation: action.payload.orientation, 
					 playerWidth: action.payload.playerWidth,
					 playerHeight: action.payload.playerHeight,
					 }

		default:
			return state;
	}
};
