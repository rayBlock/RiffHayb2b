
import clsx from "clsx";
import { useEffect, useRef, useState, type Dispatch } from "react";
import type { PositionDataActionTypes, PositionDataObject, UpdateItemPositionAction } from "../utils/positionReducer";
import type { MainDataActionTypes, MainDataObject, UpdateItemAction } from "../utils/propsReducer";
import { getValueForIdAndPropName } from "../utils/inputValueExtraction";

interface ColorBarProps {
  positionData: PositionDataObject
  positionAction: Dispatch<PositionDataActionTypes>
  mainWindow: number | undefined
  propsState: MainDataObject
  propsActions: Dispatch<MainDataActionTypes>
  currentRiff: any
}

// type MenuProps = {
//     child: any
//     propsData: MainDataObject
//     propsAction: Dispatch<UpdateMenuAction>
//     menuArg: menuPropNames
// }




export const TextEditor = ({ positionData, propsState, positionAction, propsActions, currentRiff, mainWindow }: ColorBarProps) => {

  console.log(currentRiff, "c Editor riff current")

  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const divRef = useRef<HTMLDivElement | null>(null);


  // type offsetTrackType = {
  //   x: number;
  //   y: number;
  // }

  // const spaceAvailableX =  mainWindow! > 1050 ? 15 : 55;
  // const yInit =  mainWindow! > 1050 ? 60 : 450;
  // console.log(xInit);


  const updatedTexts = propsState.propsDock.texts.all.map((textItem) => {
    const value = getValueForIdAndPropName(propsState.data, textItem.id, textItem.propName);
    return { ...textItem, value };
  });


  // const [offsetTrack, setOffsetTrack] = useState<offsetTrackType>({ x: xInit, y: yInit });
  console.log(updatedTexts, "updatedTexts");


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
            nameX: 'textsX',
            valueX: positionData.menu.textsX + offsetX,
            nameY: 'textsY',
            valueY: positionData.menu.textsY + offsetY
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



  const updateItemProperty = (id: string, propName: string, value: any) => {
    const action: UpdateItemAction = {
      type: 'UPDATE_ITEM',
      payload: {
        id,
        propName,
        value,
      },
    };
    propsActions(action);
  };

  const colorsShown = positionData.menu.texts ? 'block' : 'hidden'

  return (
    <div>
      <div
        ref={divRef}
        style={{ transform: `translate3d(${positionData.menu.textsX}px, ${positionData.menu.textsY}px, 0px)` }}
        className={clsx(colorsShown, "absolute border border-black bg-[#d3e0f6] p-4 rounded-lg cursor-pointer z-10 grid  gap-2")}>

        {updatedTexts.map((textItem, index) => (console.log(textItem),
          <div
            className={clsx("z-0", textItem.id === currentRiff.id ? `shadow-[0px_1px_8px_3px_black]` : "")}

          >{textItem.value.text}</div>))}


      </div>
      {/* <div style={{transform:`translate3d(${positionData.menu.colorsX}px, ${positionData.menu.colorsY + divRef.current?.clientHeight! + 5}px, 0px)`}}
      className={clsx("bg-white w-60 border border-black ")}>
      color picker below ?
    </div> */}
    </div >
  )
}


