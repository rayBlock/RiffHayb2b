
interface InputProps {
	[key: string]: string;
}

// Define action types
const UPDATE_ITEM = 'UPDATE_ITEM'; // You can use your custom action type
const UPDATE_MENU = 'UPDATE_MENU'; // You can use your custom action type

export interface UpdateItemAction {
	type: typeof UPDATE_ITEM;
	payload: {
		id: string;
		propName: string;
		value: any; // You may want to adjust the type based on the nature of data
	};
}
export type  menuPropNames = 'colors' | 'images' | 'videos' | 'texts';

export interface UpdateMenuAction {
	type: typeof UPDATE_MENU;
	payload: {
		name: menuPropNames
	};
}
export type MainDataActionTypes = UpdateItemAction | UpdateMenuAction;

// Define the state type
export interface MainDataObject {
	data: Array<{
		comp: number;
		duration: string | number;
		id: string;
		max: number;
		min: number;
		name: string;
		props: InputProps; // Dynamic properties
	}>;
	duration: string;
	// images: string[];
	inputs: {
		colors: Array<{ propName: string; id: string }>;
		images: Array<{ propName: string; id: string }>;
		texts: {
			short: Array<{ propName: string; id: string }>;
			mid: Array<{ propName: string; id: string }>;
			all: Array<{ propName: string; id: string }>;
		};
		videos: Array<{ propName: string; id: string }>;
	};
	orientation: string;
	// prompt: string;
	// text: { output: object };
	menu: {
		colors: boolean;
		texts: boolean;
		images: boolean;
		videos: boolean;
	};
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

		case UPDATE_MENU:
			// Find the item with a matching id
			console.log('menu switch', action);

			return {
                ...state,
				menu: {
					...state.menu,
                    [action.payload.name]: !state.menu[action.payload.name],

				},
			};

		default:
			return state;
	}
};

// import type { MainDataObject } from "./inputPropsReducer";

// const UPDATE_ITEM = "UPDATE_ITEM";

// // Define the action interface
// interface UpdateItemAction {
//   type: typeof UPDATE_ITEM;
//   payload: {
//     id: string;
//     propName: string;
//     value: any;
//   };
// }
// export const inputPropsReducer = (
//   state: MainDataObject,
//   action: UpdateItemAction
// ): MainDataObject => {
//   switch (action.type) {
//     case UPDATE_ITEM:
//       // Filter and update the state based on action payload
//       const updatedState = {
//         ...state,
//         [action.payload.propName]: state[action.payload.propName].map(
//           (item) => {
//             if (item.id === action.payload.id) {
//               return {
//                 ...item,
//                 props: {
//                   ...item.props,
//                   [action.payload.propName]: action.payload.value,
//                 },
//               };
//             }
//             return item;
//           }
//         ),
//       };

//       return updatedState;
//     default:
//       return state;
//   }
// };
