
import clsx from "clsx";
import { useRef, useState, type Dispatch, type RefObject } from "react";
import type { PositionDataActionTypes, PositionDataObject, } from "../utils/positionReducer";
import type { MainDataActionTypes, MainDataObject, UpdateTextItemAction } from "../utils/propsReducer";
import { getValueForIdAndPropName } from "../utils/inputValueExtraction";
import { TextPropsModal } from "./TextPropsModal";
import type { PlayerRef } from "@remotion/player";

interface TextBasedBarProps {
  positionData: PositionDataObject
  positionAction: Dispatch<PositionDataActionTypes>
  mainWindow: number | undefined
  propsState: MainDataObject
  propsActions: Dispatch<MainDataActionTypes>
  currentRiff: any
  playerRef: RefObject<PlayerRef>
  orientation: string

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




export const TextEditorBase = ({orientation, propsState, propsActions, playerRef, currentRiff, positionData, positionAction }: TextBasedBarProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedText, setSelectedText] = useState();

  const divRef = useRef<HTMLDivElement | null>(null);
  const innerModalRef = useRef<HTMLDivElement | null>(null);

  const updatedTexts = propsState.propsDock.texts.all.map((textItem) => {
    const value = getValueForIdAndPropName(propsState.data, textItem.id, textItem.propName);
    return { ...textItem, value };
  });

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

    // const buttonIndex = updatedTexts.findIndex((item) => item === textItem);
    // const buttonId = `button-${buttonIndex}`;
    // const buttonElement = document.getElementById(buttonId);
    // console.log(buttonElement?.offsetTop, "button eeeleeem")
    if (divRef.current) {
      divRef.current.scroll({ behavior: 'smooth', top: 0 });
    }
    setSelectedText(textItem)
    setIsModalOpen(!isModalOpen)
    
  }


  const positionedShow = positionData.menu.texts && orientation === "Landscape" || orientation === "Square" ? "block" : positionData.menu.texts ?  'xl:hidden block ' : 'hidden';
  //  const colorsShown = positionData.menu.texts ? "block" : 'hidden'
  const heightEditorPortrait = orientation === "Portrait" ? "max-h-[255px] lg:h-[225px] " : "";
  const heightEditorSquare = orientation === "Square" ? "max-h-[325px] lg:h-[280px] " : "";
  const heightEditorLandscape = orientation === "Landscape" ? "max-h-[325px] lg:h-[250px]" : "";

  // the inner section of the modal
    const innerWidth = innerModalRef.current ? innerModalRef.current?.clientWidth  : 222;

  return (
    <div
    // TODO Heihgt adjustment depending on playerOrientation and mainWindow... 

      className={clsx(positionedShow,
         heightEditorPortrait,
         heightEditorSquare,
         heightEditorLandscape,
         "group w-full lg:absolute lg:bottom-8 relative justify-center flex cursor-pointer")}
    >

      <div ref={divRef} className={clsx(isModalOpen? "overflow-y-clip" : "overflow-y-scroll", "grid w-full h-full relative grid-cols-1 px-12 py-3 md:grid-cols-1 lg:grid-cols-1 auto-cols-max bg-[#d3e0f6]  rounded-tr-none z-10 ")}>

        {updatedTexts.map((textItem, index) => (
          <div key={index} className="flex items-center gap-6 w-full px-12">

            <input value={textItem.value.color}
              onChange={(e) => updateTextColorItemProperty(textItem.id, textItem.propName, "color", e.target.value)}
              className="justify-start min-w-8 w-10 cursor-pointer shadow-[1px_3px_0px_#000000] h-10" type="color" />
            <button key={index}
              id={`button-${index}`}
              className={clsx("z-0 w-full text-xl py-3 px-2 my-2 rounded-2xl border-2 border-black rounded-tl-none hover:translate-y-1 hover:shadow-[1px_2px_0px_#000000] shadow-[1px_3px_0px_#000000]",
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
            'absolute inset-0  h-full z-50 flex items-center justify-center bg-black bg-opacity-50',
            isModalOpen ? 'flex' : 'hidden'
          )}
        >
          <div
          ref={innerModalRef}
            className="mx-auto w-[95%] md:w-4/5 relative h-[85%] flex flex-col overflow-y-scroll  rounded bg-white p-2 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <div className="flex flex-col">

              <div>
                <label>Create an AI image</label>
                <button className="rounded-lg bg-green-200 px-4 py-2 w-24 self-end text-black font-medium	" >submit</button>
              </div>
            </div> */}
            <TextPropsModal width={innerWidth} propsState={propsState} positionData={positionData} playerRef={playerRef} propsAction={propsActions} positionAction={positionAction} text={selectedText} />
          </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg right-2 absolute z-20 bottom-1 bg-red-200 px-4 py-2 w-24 self-end text-black"
            >
              Close
            </button>
        </div>

      </div>

    </div>

  )
}


