'use client'



// import Logo from '../../../../public/assets/logo.png'

import {  useReducer, useState } from "react"

import { MediaDisplay } from "../sidePanel/MediaDisplay"

import MusicDisplay from "../sidePanel/MusicDisplay"
import { ColorDisplay } from "../sidePanel/ColorDisplay"
// import { MainDataActionTypes, MainDataObject } from "@/utils/remotion/inputPropsReducer"
import { TextDisplay } from "../sidePanel/TextDisplay"
import clsx from "clsx"


type State = {
    selectedItem: number;
};

// Define the type for your action
type Action = {
    type: string;
    payload: number; // Assuming payload is a number representing the index
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SELECT_ITEM':
            return { ...state, selectedItem: action.payload };
        default:
            return state;
    }
};
// arbitrary number outside of the scope
const initialState = {
    selectedItem: 100,
};

// interface SidebarProps  {
//  templateData : TemplateProps
//  pexelImages : ImagesPexelArray
//  aiImages: ImagesAIArray
//  propsData: MainDataObject
//  propsAction: Dispatch<MainDataActionTypes>
// }


export const Sidebar = (
    // { templateData, pexelImages, aiImages, propsData, propsAction }
) => {
    const [open, setOpen] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState);

    // const musicPrompt = templateData.texts.output.musicPrompt

    const handleItemClick = (index: number) => {
        if (index === state.selectedItem) { setOpen(!open) }
        else if (index === 100) {
            dispatch({ type: 'SELECT_ITEM', payload: index });
            setOpen(!open)
        }
        else {
            dispatch({ type: 'SELECT_ITEM', payload: index });
            setOpen(true)

        }
    };

    // const size = "Square"

    // let dimWidth, dimHeight;    

    // if (size === 'Square') {
    //   dimWidth = dimHeight = 1024; // Set the width and height to 200px for square size
    // } else if (size === 'Portrait') {
    //   dimWidth =  768; // Set width to 150px for portrait size
    //   dimHeight = 1344; // Set height to 200px for portrait size
    // } else if (size === 'Landscape') {
    //   dimWidth = 1344; // Set width to 300px for landscape size
    //   dimHeight = 768; // Set height to 200px for landscape size
    // } else {
    //   // Handle any other size or invalid value here
    //   dimWidth = dimHeight = 200; // Set default width and height to 200px
    // }


    // dispatch({ type: ADD_COLOR, payload: { color: '#F02C00' } });
    // dispatch({ type: ADD_LONG_ITEM, payload: { fs: 44, longEboar: 'Some text' } });
    // dispatch({ type: ADD_MID_ITEM, payload: { fs: 33, midEboar: 'Some other text' } });



    const panelDisplay: React.ReactNode[] = [
        <TextDisplay />,
        <ColorDisplay />,
        <MediaDisplay />,
        <MusicDisplay />,

    ]

    return (

        <>
            <div className='w-full h-24 z-40  sm:left-0 sm:shadow-md  sm:initial bottom-0 sm:min-w-min overflow-y-visible sm:max-w-[80px] bg-white sm:h-full flex items-center sm:grid sm:grid-flow-row-dense'>
                <div className="hidden sm:inline justify-self-center  ">
                    {/* <image src={Logo} /> */}

                </div>
                {/* {editorSidebarData.map((arg: any, i) => (

                    <Card key={i}
                        onClick={() => handleItemClick(i)}
                        className={
                            state.selectedItem === i ?
                                cn(` w-full sm:w-5/6 h-24 sm:border-b-4 sm:border-l-2 border-t-0 overflow-y-visible shadow-none border-b-0 border-l-0  border-r-0 border-black flex flex-col items-baseline justify-self-center justify-center sm:hover:shadow-md text-center `)
                                :
                                cn(` w-full sm:w-5/6 h-24  border-0 flex flex-col items-baseline justify-self-center justify-center sm:hover:shadow-md text-center`)
                        }>
                        <CardHeader className='flex flex-col py-0 px-0 justify-self-center w-full justify-center ' >
                            <div className="scale-80 sm:scale-100 md:scale-150 flex justify-center">
                                {arg.icon}
                            </div>
                            <div className='text-lg sm:text-xl md:text-xl font-medium'>{arg.title}</div>
                        </CardHeader>
                    </Card>
                ))} */}
                {/* <div className='hidden sm:inline w-full h-full bottom-0 bg-yellow-300'>
                    staged
                </div> */}
            </div>




            <div className={clsx(" bottom-0 h-0 sm:h-full flex justify-center sm:justify-end items-center relative bg-white",
                { "w-full sm:w-1/2": open, "h-[700px]": open },
                { "w-full sm:w-8/12": state.selectedItem === 1 && open },
                { "w-full sm:w-12/12 md:w-10/12 lg:w-7/12": state.selectedItem === 2 && open }
            )}>


                {state.selectedItem < 20 ? panelDisplay[state.selectedItem] : null}


                {open ? panelDisplay[state.selectedItem] : null}

                <div key={state.selectedItem} onClick={() => handleItemClick(100)}
                    className={clsx("sm:-right-8 -top-8 sm:top-auto cursor-pointer z-0 bg-white sm:w-10 w-32 flex items-center justify-center sm:h-40 h-10 group absolute rounded-t-2xl sm:rounded-t-0 sm:rounded-r-2xl",
                        { "hidden": !open })}>
                    {/* <ChevronRight className="-rotate-90 sm:rotate-0  group-hover:scale-110 group-hover:text-red-400" /> */}
                </div>



            </div>
        </>
    )
}