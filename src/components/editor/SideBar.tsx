// import { useReducer, useState } from "react"
// import { inputPropsReducer } from "../utils/inputPropsReducer";

import clsx from "clsx";

import { ImageIcon, TextIcon, VideoIcon, ColorPalette } from "./Icons/PropMenuItems";
import type { UpdateMenuAction, menuPropNames } from "../utils/propsReducer";
import type { Dispatch } from "react";
import type { PositionDataActionTypes, PositionDataObject } from "../utils/positionReducer";

interface SidebarProps {
    propsData: PositionDataObject
    propsAction: Dispatch<PositionDataActionTypes>
}

type MenuProps = {
    child: any
    propsData: PositionDataObject
    propsAction: Dispatch<UpdateMenuAction>
    menuArg: menuPropNames
}


const PropMenuButton = ({ child, propsData, menuArg, propsAction }: MenuProps) => {

    const updateMenuProperty = (name: menuPropNames,) => {
        const action: UpdateMenuAction = {
            type: 'UPDATE_MENU',
            payload: {
                name
            },
        };
        propsAction(action);
    };
    console.log(propsData, "sidebar prposdaa")
    const menuClass = propsData.menu[menuArg] ? 'bg-green-200 ' : '';

    return (

        <div style={{ borderTopLeftRadius: '0px', border: '2px solid black' }}
            onClick={() => updateMenuProperty(menuArg)}
            className={clsx(
                menuClass,
                `group  p-1 cursor-pointer w-full lg:w-auto shadow-[0px_4px_0px_0px_black] hover:shadow-[0px_2px_0px_0px_black] hover:translate-y-1 flex rounded-full items-baseline justify-self-center justify-center text-center `

            )}>
            {child}

        </div>

    )
}



export const SideBar = ({ propsData, propsAction }: SidebarProps) => {
    //   console.log(riffData, "data in sidebarr")
    // const { inputs, data } = riffData.riff.inputs;
    // console.log(data, "<-- data individual Riff-E data in sidebar")

    const iconH = 36
    const iconW = iconH


    // const updateItemProperty = (id: string, propName: string, value: any) => {
    //     const action: UpdateItemAction = {
    //         type: 'UPDATE_ITEM',
    //         payload: {
    //             id,
    //             propName,
    //             value,
    //         },
    //     };
    //     propsAction(action);
    // };


    return (
        <div className="absolute bottom bottom-0 lg:bottom-full px-2 w-full lg:w-auto pb-4 lg:pb-0 lg:top-1/2 sm:px-4 flex lg:flex-col gap-3">


            <PropMenuButton menuArg="colors" propsData={propsData} propsAction={propsAction} child={<ColorPalette iconH={iconH} iconW={iconW} />} />
            <PropMenuButton menuArg="images" propsData={propsData} propsAction={propsAction} child={<ImageIcon iconH={iconH} iconW={iconW} />} />
            <PropMenuButton menuArg="videos" propsData={propsData} propsAction={propsAction} child={<VideoIcon iconH={iconH} iconW={iconW} />} />
            <PropMenuButton menuArg="texts" propsData={propsData} propsAction={propsAction} child={<TextIcon iconH={iconH} iconW={iconW} />} />


        </div>

    )
}