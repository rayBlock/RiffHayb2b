// import { useReducer, useState } from "react"
// import { inputPropsReducer } from "../utils/inputPropsReducer";

import clsx from "clsx";

import { ImageIcon, TextIcon, VideoIcon, ColorPalette } from "./Icons/PropMenuItems";

import type { Dispatch, RefObject } from "react";
import type { PositionDataActionTypes, PositionDataObject, UpdateMenuAction, menuPropNames } from "../utils/positionReducer";
import { PlayButton } from "./PlayButton";
import type { PlayerRef } from "@remotion/player";

interface SidebarProps {
    propsData: PositionDataObject
    propsAction: Dispatch<PositionDataActionTypes>
    playerRef: RefObject<PlayerRef>
}

type MenuProps = {
    child: any
    propsData: PositionDataObject
    propsAction: Dispatch<UpdateMenuAction>
    menuArg: menuPropNames
    hiddenProp?: string
}
type FakeMenuProps = {
    child: any
    hiddenProp?: string
    clickhandler?: () => void
}


/*
  what window size are we dealing with ?  -- mainWindow
  what space is available ?  -- mainwindow & orentation
  are there any others already open ? -- position reducer state
  check if current placement is not 0 ... for stored template from user ??
  set to open and assign placement with x and y 


  I want to show the props editor panels at the correct place with correct UI
  UI: width, height ?  more fine grained based on the platzbeschrenkungen

  arrange better when other panel gets activaed ?



*/

export const PropMenuButton = ({ hiddenProp, child, propsData, menuArg, propsAction }: MenuProps) => {

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
    const menuClass = propsData.menu[menuArg] as any ? 'bg-green-200 ' : '';

    return (
        // selectable for ADA ?  with button but space bar issues... 
        <button style={{ borderTopLeftRadius: '0px', border: '2px solid black' }}
            onClick={() => updateMenuProperty(menuArg)}
            className={clsx(
                hiddenProp,
                menuClass,
                `group  p-1 cursor-pointer w-full lg:w-auto shadow-[0px_4px_0px_0px_black] hover:shadow-[0px_2px_0px_0px_black] hover:translate-y-1 flex rounded-full items-baseline justify-self-center justify-center text-center `

            )}>
            {child}

        </button>

    )
}



export const SideBar = ({ playerRef, propsData, propsAction }: SidebarProps) => {
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
            <PropMenuButton menuArg="texts" propsData={propsData} propsAction={propsAction} child={<TextIcon iconH={iconH} iconW={iconW} />} />
            <FakeMenuButton hiddenProp="flex md:hidden" child={<PlayButton scale="scale-100" playerRef={playerRef} />} />
            {/* <PropMenuButton menuArg="none" propsData={propsData} propsAction={propsAction} child={<VideoIcon iconH={iconH} iconW={iconW} />} />
                
            
            
            <PropMenuButton hiddenProp="flex md:hidden" menuArg="none" propsData={propsData} propsAction={propsAction} child={<PlayButton scale="scale-100" playerRef={playerRef} />} /> */}


            {/* <PlayButton playerRef={playerRef} scale="scale-100 rounded-tl-none border-2 border-black  cursor-pointer shadow-[0px_4px_0px_0px_black] hover:shadow-[0px_2px_0px_0px_black] hover:translate-y-1 flex rounded-full items-baseline justify-self-center justify-center text-center " turnPlay={""} playing={true} /> */}


        </div>

    )
}




export const FakeMenuButton = ({ hiddenProp, child, clickhandler }: FakeMenuProps) => {

    return (
        // selectable for ADA ?  with button but space bar issues... 
        <button style={{ borderTopLeftRadius: '0px', border: '2px solid black' }}
            onClick={() => console.log("hello")}
            className={clsx(
                hiddenProp,
                `group  p-1 cursor-pointer w-full lg:w-auto shadow-[0px_4px_0px_0px_black] hover:shadow-[0px_2px_0px_0px_black] hover:translate-y-1 flex rounded-full items-baseline justify-self-center justify-center text-center `

            )}>
            {child}

        </button>

    )
}
