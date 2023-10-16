
import clsx from "clsx";
import type { MainDataObject, MainDataActionTypes, UpdateItemAction, UpdateMenuAction, menuPropNames } from "../utils/propsReducer";
import { useEffect, useRef, useState, type Dispatch } from "react";

interface SidebarProps {
    propsData: MainDataObject
    propsAction: Dispatch<MainDataActionTypes>
}

// type MenuProps = {
//     child: any
//     propsData: MainDataObject
//     propsAction: Dispatch<UpdateMenuAction>
//     menuArg: menuPropNames
// }



export const ColorsEditor = ({ propsData, propsAction }: SidebarProps) => {

    // console.log(propsData, "c Editor data")

    const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const startFrame = useRef<number>(0);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      startXRef.current = e.clientX;
      startYRef.current = e.clientY;

      console.log(e, "e");
      

    };
    const handleMouseDrag = (e: MouseEvent) => {
      if (isDragging && divRef.current && startXRef.current !== null) {
        const offsetX = e.clientX - startXRef.current;
        const offsetY = e.clientY - startYRef.current;
        console.log(offsetX, offsetY, "off")

      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (divRef.current) {
      divRef.current.addEventListener('mousedown', handleMouseDown);
    }

    document.addEventListener('mousemove', handleMouseDrag);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (divRef.current) {
        divRef.current.removeEventListener('mousedown', handleMouseDown);
      }
      document.removeEventListener('mousemove', handleMouseDrag);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);



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

    // const draggy = 

    return (
        <div 
        ref={divRef} 
        className={clsx("absolute bottom bottom-0 sm:bottom-full px-2 sm:px-0 w-full sm:w-auto pb-4 sm:pb-0 sm:top-1/2 sm:pl-4 flex sm:flex-col gap-3")}>

            hello colors
        </div>

    )
}