
import clsx from "clsx";
import { useEffect, useRef, useState, type Dispatch, type RefObject } from "react";
import type { PositionDataActionTypes, PositionDataObject, UpdateItemPositionAction } from "../utils/positionReducer";
import type { MainDataActionTypes, MainDataObject, UpdateTextItemAction } from "../utils/propsReducer";
import { getValueForIdAndPropName } from "../utils/inputValueExtraction";
import { TextPropsModal } from "./TextPropsModal";
import type { PlayerRef } from "@remotion/player";

interface ColorBarProps {
  positionData: PositionDataObject
  positionAction: Dispatch<PositionDataActionTypes>
  mainWindow: number | undefined
  playerWidth: number | undefined
  propsState: MainDataObject
  propsActions: Dispatch<MainDataActionTypes>
  currentRiff: any
  orientation: string
  playerRef: RefObject<PlayerRef>

}

// const focus = (el: Element | undefined | null) => {
//   if (el && el instanceof HTMLElement) {
//     el.focus();
//   }
// };

// type MenuProps = {
//     child: any
//     propsData: MainDataObject
//     propsAction: Dispatch<UpdateMenuAction>
//     menuArg: menuPropNames
// }




export const TextEditor = ({ orientation, positionData, propsState, playerRef, positionAction, propsActions, currentRiff, playerWidth, mainWindow }: ColorBarProps) => {

  const pixelsAvailable = mainWindow && playerWidth ? (mainWindow - playerWidth) / 2 : playerWidth ? playerWidth : 300
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const buttonScaleRef = useRef<HTMLButtonElement | null>(null);
  const [selectedText, setSelectedText] = useState();

  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const innerModalRef = useRef<HTMLDivElement | null>(null);

  // const focusRef = useRef<Element | null>(null);

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



  // useEffect(() => {


  // const handleMouseDown = (e: MouseEvent | TouchEvent) => {
  //   setIsDragging(true);
  //   startXRef.current = e.clientX;
  //   startYRef.current = e.clientY;
  // };



  //   console.log(startXRef.current);
  //   console.log(startYRef.current);

  //   const handleMouseDrag = (e: MouseEvent | TouchEvent) => {
  //     if (isDragging && divRef.current && startXRef.current !== null) {
  //       const offsetX = e.clientX - startXRef.current;
  //       const offsetY = e.clientY - startYRef.current;
  //       const action: UpdateItemPositionAction = {
  //         type: 'UPDATE_ITEM_POSITION',
  //         payload: {
  //           nameX: 'textsX',
  //           valueX: positionData.menu.textsX + offsetX,
  //           nameY: 'textsY',
  //           valueY: positionData.menu.textsY + offsetY
  //         },
  //       };
  //       positionAction(action);
  //     }
  //   };

  //   const handleMouseUp = () => {
  //     setIsDragging(false);

  //   };

  //   if (divRef.current) {
  //     divRef.current.addEventListener('mousedown', handleMouseDown);
  //   }

  //   document.addEventListener('mousemove', handleMouseDrag);
  //   document.addEventListener('mouseup', handleMouseUp);

  //   return () => {
  //     if (divRef.current) {
  //       divRef.current.removeEventListener('mousedown', handleMouseDown);
  //     }
  //     document.removeEventListener('mousemove', handleMouseDrag);
  //     document.removeEventListener('mouseup', handleMouseUp);
  //   };
  // }, [isDragging]);


  useEffect(() => {
    const element = divRef.current;




    const handleDragStart = (e: MouseEvent | TouchEvent) => {
      e.preventDefault(); // Prevent default behavior to avoid selecting text or scrolling.
      setIsDragging(true);

      startXRef.current = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX!;
      startYRef.current = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY!;
    };


    const handleDrag = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        if (startXRef.current === null || startYRef.current === null) {
          return;

        }

        const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX!;
        const clientY = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY!;

        const offsetX = clientX - startXRef.current;
        const offsetY = clientY - startYRef.current;

        const action: UpdateItemPositionAction = {
          type: 'UPDATE_ITEM_POSITION',
          payload: {
            nameX: 'textsX',
            valueX: positionData.menu.textsX + offsetX,
            nameY: 'textsY',
            valueY: positionData.menu.textsY + offsetY,
          },
        };

        positionAction(action);

        // startXRef.current = clientX; // Update the initial position for the next iteration.
        // startYRef.current = clientY;
      }
    };

    const handleDragEnd = () => {
      setIsDragging(false);
    };


    if (element) {

      element.addEventListener('mousedown', handleDragStart);
      element.addEventListener('touchstart', handleDragStart, { passive: false });
    }

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('touchmove', handleDrag, { passive: false });
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);

    return () => {
      if (element) {
        element.removeEventListener('mousedown', handleDragStart);
        element.removeEventListener('touchstart', handleDragStart);
      }

      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('touchmove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);







  // const updateItemProperty = (id: string, propName: string, value: any) => {
  //   const action: UpdateItemAction = {
  //     type: 'UPDATE_ITEM',
  //     payload: {
  //       id,
  //       propName,
  //       value,
  //     },
  //   };
  //   propsActions(action);
  // };

  const updateTextColorItemProperty = (id: string, propName: string, textProp: string, value: any) => {
    const action: UpdateTextItemAction = {
      type: 'UPDATE_TEXT_ITEM',
      payload: {
        id,
        propName,
        textProp,
        value,
      },
    };
    propsActions(action);
  };

  const handleModal = (textItem: any) => {
    console.log(textItem, "textItem in textEditor");

    // const buttonIndex = updatedTexts.findIndex((item) => item === textItem);
    // const buttonId = `button-${buttonIndex}`;
    // const buttonElement = document.getElementById(buttonId);
    // console.log(buttonElement?.offsetTop, "button eeeleeem")
    // if (divRef.current) {
    //   divRef.current.scroll({ behavior: 'smooth', top: 0 });
    // }
    setSelectedText(textItem)

    setIsModalOpen(!isModalOpen)

  }
  const colorsShown = positionData.menu.texts && orientation === "Landscape" || orientation === "Square" ? "hidden" : positionData.menu.texts ? 'hidden xl:block ' : 'hidden'

  console.log(pixelsAvailable, "pixels ");
  const editorWidth = pixelsAvailable - 50

  // figure out the minimum width possible ... 
  // change width & height with another draggable button...

  const innerWidth = innerModalRef.current ? innerModalRef.current?.clientWidth : 222;

  return (
    <div
      className={clsx(colorsShown, "lg:top-16 lg:left-8", "absolute group  border-2  cursor-pointer")}
      style={{ width: `${editorWidth}px`, transform: `translate3d(${positionData.menu.textsX}px, ${positionData.menu.textsY}px, 0px)` }}
    >


      <div ref={divRef} className="absolute z-20 hidden group-hover:flex flex-col -right-8 -top-6">
        {/* <button className="bg-red-400 w-12 h-12 rounded-full">Move</button> */}
        <button ref={buttonScaleRef} className="bg-red-400 w-12 h-12 border border-black text-3xl rounded-full">
          ◊
        </button>
      </div>

      {/* Another DivRef & another buttonRef this is acutally scale the other one should be called pposition */}
      <div ref={divRef} className="absolute z-20 hidden group-hover:flex flex-col -right-8 -bottom-6">
        {/* <button className="bg-red-400 w-12 h-12 rounded-full">Move</button> */}
        <button ref={buttonScaleRef} className="bg-red-400 w-12 h-12 border border-black text-3xl rounded-full">
          √
        </button>
      </div>

      <div className={clsx("grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 auto-cols-max border-2 h-full shadow-[1px_4px_0px_#000000] bg-[#d3e0f6] overflow-y-scroll rounded-tr-none  border-black  px-3 pr-6 py-2 rounded-3xl z-10 ")}>

        {updatedTexts.map((textItem, index) => (
          <div key={index} className="flex items-center gap-2 w-full">

            <input value={textItem.value.color}
              onChange={(e) => updateTextColorItemProperty(textItem.id, textItem.propName, "color", e.target.value)}
              className="justify-start mr-2 min-w-8 w-8 cursor-pointer shadow-[1px_3px_0px_#000000] h-8" type="color" />
            <button key={index}
              id={`button-${index}`}
              className={clsx("z-0 w-full  py-2 px-2 my-2 rounded-2xl border-2 border-black rounded-tl-none hover:translate-y-1 hover:shadow-[1px_2px_0px_#000000] shadow-[1px_3px_0px_#000000]",
                textItem.id === currentRiff.id ? `bg-green-200` : "bg-gray-100")}
              onClick={() => handleModal(textItem)}
            >{textItem.value.text}
            </button>
          </div>

        ))}


        <div
          ref={modalRef}
          onClick={() => setIsModalOpen(false)}
          className={clsx(
            'fixed rounded-3xl inset-0 rounded-tr-none z-50 flex items-center justify-center bg-black bg-opacity-50',
            isModalOpen ? 'flex' : 'hidden'
          )}
        >
          <div
            ref={innerModalRef}
            className="mx-auto  flex relative flex-col overflow-auto rounded bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <div className="flex flex-col">



              <div>
                <label>Create an AI image</label>
                <button className="rounded-lg bg-green-200 px-4 py-2 w-24 self-end text-black font-medium	" >submit</button>
              </div>
            </div> */}
            <TextPropsModal width={innerWidth} propsState={propsState} positionData={positionData} playerRef={playerRef} propsAction={propsActions} positionAction={positionAction} text={selectedText} />

            <button
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg absolute bottom-2 bg-red-200 px-4 py-2 w-24 self-end text-black"
            >
              Close
            </button>
          </div>
        </div>

      </div>

    </div>

  )
}


