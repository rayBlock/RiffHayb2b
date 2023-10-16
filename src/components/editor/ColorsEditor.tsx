
import clsx from "clsx";
import { useEffect, useRef, useState, type Dispatch } from "react";
import type { PositionDataActionTypes, PositionDataObject, UpdateItemPositionAction } from "../utils/positionReducer";
import type { MainDataActionTypes, MainDataObject } from "../utils/propsReducer";

interface ColorBarProps {
  positionData: PositionDataObject
  positionAction: Dispatch<PositionDataActionTypes>
  mainWindow: number | undefined
  propsState: MainDataObject
  propsActions: Dispatch<MainDataActionTypes>
  
}

// type MenuProps = {
//     child: any
//     propsData: MainDataObject
//     propsAction: Dispatch<UpdateMenuAction>
//     menuArg: menuPropNames
// }



export const ColorsEditor = ({ positionData, positionAction, mainWindow }: ColorBarProps) => {

  console.log(positionData, "c Editor data")

  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const divRef = useRef<HTMLDivElement | null>(null);


  // type offsetTrackType = {
  //   x: number;
  //   y: number;
  // }
  console.log(mainWindow, "swindow?")
  // const spaceAvailableX =  mainWindow! > 1050 ? 15 : 55;
  // const yInit =  mainWindow! > 1050 ? 60 : 450;
  // console.log(xInit);
  // console.log(yInit);
  
  
  // const [offsetTrack, setOffsetTrack] = useState<offsetTrackType>({ x: xInit, y: yInit });

  
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      startXRef.current = e.clientX;
      startYRef.current = e.clientY;
    };
    const handleMouseDrag = (e: MouseEvent) => {
      if (isDragging && divRef.current && startXRef.current !== null) {
        const offsetX = e.clientX - startXRef.current;
        const offsetY = e.clientY - startYRef.current;
        const action: UpdateItemPositionAction = {
                  type: 'UPDATE_ITEM_POSITION',
                  payload: {
                      nameX:'colorsX',
                      valueX: positionData.menu.colorsX + offsetX,
                      nameY:'colorsY',
                      valueY: positionData.menu.colorsY + offsetY
                  },
              };
              positionAction(action);
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

   const colorsShown = positionData.menu.colors ? 'block' : 'hidden' 
  console.log(positionData.menu, "colors ed menu data")
  return (
    <div
      ref={divRef}
      style={{ transform: `translate3d(${positionData.menu.colorsX}px, ${positionData.menu.colorsY}px, 0px)` }}
      className={clsx(colorsShown ,"absolute cursor-pointer z-10 flex gap-3")}>

      hello colors
    </div>

  )
}