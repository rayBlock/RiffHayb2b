// import { useReducer, useState } from "react"
// import { inputPropsReducer } from "../utils/inputPropsReducer";

import clsx from "clsx";

import { ImageIcon, TextIcon,
    // VideoIcon,
     ColorPalette, 
     DotsSixVertical,
     DotsSix2Vertical} from "./Icons/PropMenuItems";

import type { Dispatch, RefObject } from "react";
import type { PositionDataActionTypes, PositionDataObject, UpdateMenuAction, menuPropNames } from "../utils/positionReducer";
import { PlayButton } from "./PlayButton";
import type { PlayerRef } from "@remotion/player";

interface SidebarProps {
    positionData: PositionDataObject
    positionAction: Dispatch<PositionDataActionTypes>
    playerRef: RefObject<PlayerRef>
}

type MenuProps = {
    child: any
    positionData: PositionDataObject
    positionAction: Dispatch<UpdateMenuAction>
    menuArg: menuPropNames
    hiddenProp?: string
}
// type FakeMenuProps = {
//     child: any
//     hiddenProp?: string
//     clickhandler?: () => void
// }

export const PropMenuButton = ({ hiddenProp, child, positionData, menuArg, positionAction }: MenuProps) => {

    const updateMenuProperty = (name: menuPropNames,) => {

        
        
        const action: UpdateMenuAction = {
            type: 'UPDATE_MENU',
            payload: {
                name
            },
        };
        positionAction(action);
    };
    const menuClass = positionData.menu[menuArg] as any ? 'bg-green-200 ' : '';

    return (
        // selectable for ADA ?  with button but space bar issues... 
        <button style={{ borderTopLeftRadius: '0px', border: '2px solid black' }}
            onClick={() => updateMenuProperty(menuArg)}
            className={clsx(
                hiddenProp,
                menuClass,
                `group p-1 cursor-pointer bg-[#d3e0f6] w-full lg:w-auto shadow-[0px_4px_0px_0px_black] hover:shadow-[0px_2px_0px_0px_black] hover:translate-y-1 flex rounded-full items-baseline justify-self-center justify-center text-center `

            )}>
            {child}

        </button>

    )
}



export const SideBar = ({ playerRef, positionData, positionAction }: SidebarProps) => {
    const iconH = 36
    const iconW = iconH

    return (
        <div className="absolute bottom-0 lg:bottom-full z-20 px-2 w-full lg:w-auto pb-4 lg:pb-0 lg:top-1/2 sm:px-4 flex lg:flex-col gap-3">

            <PropMenuButton menuArg="more" positionData={positionData} positionAction={positionAction} child={<DotsSix2Vertical iconH={iconH} iconW={iconW} />} />

            <PropMenuButton menuArg="colors" positionData={positionData} positionAction={positionAction} child={<ColorPalette iconH={iconH} iconW={iconW} />} />
            <PropMenuButton menuArg="images" positionData={positionData} positionAction={positionAction} child={<ImageIcon iconH={iconH} iconW={iconW} />} />
            <PropMenuButton menuArg="texts" positionData={positionData} positionAction={positionAction} child={<TextIcon iconH={iconH} iconW={iconW} />} />
                    <PlayButton 
                    widthProp={" h-12 justify-center"}
                    positionData={positionData} positionAction={positionAction}
                    hiddenProp="lg:hidden group rounded-tl-none border-2 border-black
                      p-1 cursor-pointer w-full bg-[#d3e0f6] lg:w-auto shadow-[0px_4px_0px_0px_black] hover:shadow-[0px_2px_0px_0px_black] hover:translate-y-1 flex rounded-full items-baseline justify-self-center justify-center text-center "
                      // scale exact string also used in playButton 
                     scale="scale-90" playerRef={playerRef} />


        </div>

    )
}




// export const FakeMenuButton = ({ hiddenProp, child, clickhandler }: FakeMenuProps) => {

//     return (
//         // selectable for ADA ?  with button but space bar issues... 
//         <div style={{ borderTopLeftRadius: '0px', border: '2px solid black' }}

//             className={clsx(
//                 hiddenProp,
//                 `group  p-1 cursor-pointer w-full lg:w-auto shadow-[0px_4px_0px_0px_black] hover:shadow-[0px_2px_0px_0px_black] hover:translate-y-1 flex rounded-full items-baseline justify-self-center justify-center text-center `

//             )}>
//             {child}

//         </div>

//     )
// }
