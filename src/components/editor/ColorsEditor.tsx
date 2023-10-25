
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



export const ColorsEditor = ({ positionData, propsState, positionAction, propsActions, currentRiff,  }: ColorBarProps) => {



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


  const updatedColors = propsState.propsDock.colors.map((colorItem) => {
    const value = getValueForIdAndPropName(propsState.data, colorItem.id, colorItem.propName);
    return { ...colorItem, value };
  });


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
            nameX: 'colorsX',
            valueX: positionData.menu.colorsX + offsetX,
            nameY: 'colorsY',
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

  const colorsShown = positionData.menu.colors ? 'block' : 'hidden'

  const arrangedPropsFields = [
    "lg:top-44 lg:left-32",
    "lg:top-1/2 lg:left-40 ",
    "lg:top-14 lg:right-20 ",
  ]

  const position = positionData.menu.images && positionData.menu.texts ? arrangedPropsFields[2] :
    positionData.menu.images || positionData.menu.texts ? arrangedPropsFields[1] :
      arrangedPropsFields[0]

  return (
    <div ref={divRef}>
      <div
        style={{ transform: `translate3d(${positionData.menu.colorsX}px, ${positionData.menu.colorsY}px, 0px)` }}

        className={clsx(colorsShown, position, " absolute left- border-2  border-black shadow-[1px_4px_0px_#000000] bg-[#d3e0f6] p-4 rounded-3xl rounded-tr-none cursor-pointer z-10 grid grid-cols-6 gap-2")}
      // className={clsx(colorsShown, "target absolute border-2  border-black shadow-[1px_4px_0px_#000000] bg-[#d3e0f6] p-4 rounded-3xl rounded-tl-none cursor-pointer z-10 grid grid-cols-6 gap-2")}

      >{updatedColors.map((colorItem, index) => (
        <input
          key={index} style={{ background: colorItem.value, width: '28px', height: '28px' }}
          onChange={(e) => updateItemProperty(colorItem.id, colorItem.propName, e.target.value)}
          className={clsx("rounded-full  appearance-none transition-all hover:border-2 border-red ", colorItem.id === currentRiff.id ? `underline` : "")}
          type="color"

        />



      ))}
      </div>
    </div>

  )
}



{/* <div style={{transform:`translate3d(${positionData.menu.colorsX}px, ${positionData.menu.colorsY + divRef.current?.clientHeight! + 5}px, 0px)`}}
className={clsx("bg-white w-60 border border-black ")}>
color picker below ?
</div> */}