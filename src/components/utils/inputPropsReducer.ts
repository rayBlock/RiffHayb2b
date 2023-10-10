

// Define the type for the inputProps
interface InputProps {
  [key: string]: string;
}

// Define action types
const ADD_COLOR = 'ADD_COLOR';
const ADD_LONG_ITEM = 'ADD_LONG_ITEM';
const ADD_MID_ITEM = 'ADD_MID_ITEM';
const ADD_SHORT_ITEM = 'ADD_SHORT_ITEM';

interface AddColorAction {
  type: typeof ADD_COLOR;
  payload: any;
}

interface AddLongItemAction {
  type: typeof ADD_LONG_ITEM;
  payload: any;
}

interface AddMidItemAction {
  type: typeof ADD_MID_ITEM;
  payload: any;
}

interface AddShortItemAction {
  type: typeof ADD_SHORT_ITEM;
  payload: any;
}

// Define the union type for all possible action types
export type MainDataActionTypes =
  | AddColorAction
  | AddLongItemAction
  | AddMidItemAction
  | AddShortItemAction;

// Define the MainDataObject interface
export interface MainDataObject {
  colors: InputProps[];
  images: any[];

  mid: any[]; 
  short: any[]; 
}

// Reducer function
export const inputPropsReducer = (
  state: MainDataObject,
  action: MainDataActionTypes
): MainDataObject => {
  switch (action.type) {
    case ADD_COLOR:
      return {
        ...state,
        colors: [...state.colors, action.payload],
      };
  
    case ADD_MID_ITEM:
      return {
        ...state,
        mid: [...state.mid, action.payload],
      };
    case ADD_SHORT_ITEM:
      return {
        ...state,
        short: [...state.short, action.payload],
      };
    default:
      return state;
  }
};
