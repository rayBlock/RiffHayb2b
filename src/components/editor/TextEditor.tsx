
import clsx from "clsx";
import { useEffect, useRef, useState, type Dispatch } from "react";
import type { PositionDataActionTypes, PositionDataObject, UpdateItemPositionAction } from "../utils/positionReducer";
import type { MainDataActionTypes, MainDataObject, UpdateItemAction, UpdateTextItemAction } from "../utils/propsReducer";
import { getValueForIdAndPropName } from "../utils/inputValueExtraction";

interface ColorBarProps {
  positionData: PositionDataObject
  positionAction: Dispatch<PositionDataActionTypes>
  mainWindow: number | undefined
  propsState: MainDataObject
  propsActions: Dispatch<MainDataActionTypes>
  currentRiff: any
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




export const TextEditor = ({ positionData, propsState, positionAction, propsActions, currentRiff, mainWindow }: ColorBarProps) => {


  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const buttonScaleRef = useRef<HTMLButtonElement | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const focusRef = useRef<Element | null>(null);

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
    console.log(e);
    
    startXRef.current = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX!;
    startYRef.current = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY!;
    console.log(startYRef.current, "curret.. Poy");
    console.log(startXRef.current, "curret.. Pox");
  };


  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (isDragging) {
      if (startXRef.current === null || startYRef.current === null) {
        return;
        
      }
  
      const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX!;
      const clientY = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY!;
      console.log(clientX, clientY, "cli x & y ");
      
      const offsetX = clientX - startXRef.current;
      const offsetY = clientY - startYRef.current;
      console.log(offsetX, offsetY, "ofset");
      
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

  const handleModal = (textItem: any, index: any) => {

    const buttonIndex = updatedTexts.findIndex((item) => item === textItem);
    const buttonId = `button-${buttonIndex}`;
    const buttonElement = document.getElementById(buttonId);
    // console.log(buttonElement?.offsetTop, "button eeeleeem")
    // if (divRef.current) {
    //   divRef.current.scroll({ behavior: 'smooth', top: 0 });
    // }
  
    setIsModalOpen(!isModalOpen)

  }

  const colorsShown = positionData.menu.texts ? 'block' : 'hidden'

  const arrangedPropsFields = [
    "lg:top-14 lg:left-8",
    "lg:top-14 lg:right-20 ",
    "lg:top-14 lg:right-20 ",
  ]

  const position = positionData.menu.colors && positionData.menu.images ? arrangedPropsFields[2] :
    positionData.menu.colors || positionData.menu.images ? arrangedPropsFields[1] :
      arrangedPropsFields[0]



  return (
    <div
      className={clsx(colorsShown, position, "absolute lg:top-12 lg:left-24 group w-5/6 bottom-24 lg:w-1/4 h-[30vh] lg:h-[30vh] border-2  cursor-pointer")}
      style={{ transform: `translate3d(${positionData.menu.textsX}px, ${positionData.menu.textsY}px, 0px)` }}
    >


      <div ref={divRef} className="absolute  z-20 hidden group-hover:flex flex-col -right-8 -top-6">
        {/* <button className="bg-red-400 w-12 h-12 rounded-full">Move</button> */}
        <button ref={buttonScaleRef} className="bg-red-400 w-12 h-12 border border-black text-3xl rounded-full">
          ◊
        </button>


      </div>
      <div className={clsx("grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 auto-cols-max border-2 h-full shadow-[1px_4px_0px_#000000] bg-[#d3e0f6] overflow-y-scroll rounded-tr-none  border-black  px-3 py-2 rounded-3xl z-10 ")}>

        {updatedTexts.map((textItem, index) => (
          <div key={index} className="flex items-center gap-2 w-full">

            <input value={textItem.value.color}
              onChange={(e) => updateTextColorItemProperty(textItem.id, textItem.propName, "color", e.target.value)}
              className="justify-start min-w-8 w-8 cursor-pointer shadow-[1px_3px_0px_#000000] h-8" type="color" />
            <button key={index}
              id={`button-${index}`}
              className={clsx("z-0 w-full  py-2 px-2 my-2 rounded-2xl border-2 border-black rounded-tl-none hover:translate-y-1 hover:shadow-[1px_2px_0px_#000000] shadow-[1px_3px_0px_#000000]",
                textItem.id === currentRiff.id ? `bg-green-200` : "bg-gray-100")}
              onClick={() => handleModal(textItem, index)}
            >{textItem.value.text}
            </button>
          </div>

        ))}


        <div
          ref={modalRef}
          onClick={() => setIsModalOpen(false)}
          className={clsx(
            'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50',
            isModalOpen ? 'flex' : 'hidden'
          )}
        >
          <div
            className="mx-auto max-h-[90vh] max-w-lg flex flex-col overflow-auto rounded bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">



              <div>
                <label>Create an AI image</label>
                <button className="rounded-lg bg-green-200 px-4 py-2 w-24 self-end text-black font-medium	" >submit</button>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg bg-red-200 px-4 py-2 w-24 self-end text-black"
            >
              Close
            </button>
          </div>
        </div>

      </div>

    </div>

  )
}


