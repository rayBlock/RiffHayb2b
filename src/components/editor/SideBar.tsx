// import { useReducer, useState } from "react"
// import { inputPropsReducer } from "../utils/inputPropsReducer";

import clsx from "clsx";

import { ImageIcon, TextIcon, VideoIcon, ColorPalette } from "./Icons/PropMenuItems";
import type { MainDataObject, MainDataActionTypes, UpdateItemAction, UpdateMenuAction, menuPropNames } from "../utils/propsReducer";
import type { Dispatch } from "react";

interface SidebarProps {
    propsData: MainDataObject
    propsAction: Dispatch<MainDataActionTypes>
}

type MenuProps = {
    child: any
    propsData: MainDataObject
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

    const menuClass = propsData.menu[menuArg] ? 'bg-green-200 ' : '';

    return (

        <div style={{ borderTopLeftRadius: '0px', border: '2px solid black' }}
            onClick={() => updateMenuProperty(menuArg)}
            className={clsx(
                menuClass,
                `group  p-1 cursor-pointer w-full sm:w-auto shadow-[0px_4px_0px_0px_black] hover:shadow-[0px_2px_0px_0px_black] hover:translate-y-1 flex rounded-full items-baseline justify-self-center justify-center text-center `

            )}>
            {child}

        </div>

    )
}
export type menu = {
    colors: boolean,
    images: boolean,
    videos: boolean,
    texts: boolean
}

export const menu: menu = {
    colors: false,
    images: false,
    videos: false,
    texts: false

}


export const SideBar = ({ propsData, propsAction }: SidebarProps) => {
    //   console.log(riffData, "data in sidebarr")
    // const { inputs, data } = riffData.riff.inputs;
    // console.log(data, "<-- data individual Riff-E data in sidebar")



    const iconH = 36
    const iconW = iconH


    const updateItemProperty = (id: string, propName: string, value: any) => {
        const action: UpdateItemAction = {
            type: 'UPDATE_ITEM',
            payload: {
                id,
                propName,
                value,
            },
        };
        propsAction(action);
    };


    return (
        <div className="absolute bottom bottom-0 sm:bottom-full px-2 sm:px-0 w-full sm:w-auto pb-4 sm:pb-0 sm:top-1/2 sm:pl-4 flex sm:flex-col gap-3">


            <PropMenuButton menuArg="colors" propsData={propsData} propsAction={propsAction} child={<ColorPalette iconH={iconH} iconW={iconW} />} />
            <PropMenuButton menuArg="images" propsData={propsData} propsAction={propsAction} child={<ImageIcon iconH={iconH} iconW={iconW} />} />
            <PropMenuButton menuArg="videos" propsData={propsData} propsAction={propsAction} child={<VideoIcon iconH={iconH} iconW={iconW} />} />
            <PropMenuButton menuArg="texts" propsData={propsData} propsAction={propsAction} child={<TextIcon iconH={iconH} iconW={iconW} />} />


        </div>

    )
}