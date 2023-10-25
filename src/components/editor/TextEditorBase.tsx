
import clsx from "clsx";
import { useRef, useState, type Dispatch } from "react";
import type { PositionDataActionTypes, PositionDataObject } from "../utils/positionReducer";
import type { MainDataActionTypes, MainDataObject, UpdateTextItemAction } from "../utils/propsReducer";
import { getValueForIdAndPropName } from "../utils/inputValueExtraction";

interface ColorBarProps {
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




export const TextEditorBase = ({ propsState, propsActions, currentRiff }: ColorBarProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const focusRef = useRef<Element | null>(null);
  const buttonScaleRef = useRef<HTMLButtonElement | null>(null);

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

    const buttonIndex = updatedTexts.findIndex((item) => item === textItem);
    const buttonId = `button-${buttonIndex}`;
    const buttonElement = document.getElementById(buttonId);
    // console.log(buttonElement?.offsetTop, "button eeeleeem")
    // if (divRef.current) {
    //   divRef.current.scroll({ behavior: 'smooth', top: 0 });
    // }
  
    setIsModalOpen(!isModalOpen)

  }



  return (
    <div
      className={clsx(" group w-full h-1/3 mt-4 relative  cursor-pointer")}
    >

      <div className={clsx("grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 auto-cols-max border-2 h-full  bg-[#d3e0f6] overflow-y-scroll rounded-tr-none  px-3 py-2 z-10 ")}>

        {updatedTexts.map((textItem, index) => (
          <div key={index} className="flex items-center gap-2 w-full">

            <input value={textItem.value.color}
              onChange={(e) => updateTextColorItemProperty(textItem.id, textItem.propName, "color", e.target.value)}
              className="justify-start min-w-8 w-8 cursor-pointer shadow-[1px_3px_0px_#000000] h-8" type="color" />
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


