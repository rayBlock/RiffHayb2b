
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




export const ImagesEditor = ({ positionData, propsState, positionAction, propsActions, currentRiff, mainWindow }: ColorBarProps) => {

  console.log(currentRiff, "c Editor riff current")

  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const divRef = useRef<HTMLDivElement | null>(null);

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
  console.log(propsState, "state in images");

  const updatedImages = propsState.propsDock.images.map((imageItem) => {
    const value = getValueForIdAndPropName(propsState.data, imageItem.id, imageItem.propName);
    return { ...imageItem, value };
  });
  console.log(updatedImages, "images updqted");

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
            nameX: 'imagesX',
            valueX: positionData.menu.imagesX + offsetX,
            nameY: 'imagesY',
            valueY: positionData.menu.imagesY + offsetY
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

  useEffect(() => {
    if (isModalOpen) {
      focusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
    } else {
      // try to restore focus to the last focused element
      focus(focusRef.current);
      document.body.style.overflow = 'unset';
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
      const isTabPressed = e.key === 'Tab';
      if (isTabPressed) {
        // add all the elements inside modal which you want to make focusable
        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableContent = modalRef.current?.querySelectorAll(focusableElements);
        if (e.shiftKey) {
          // shift + tab wraps focus to end if you're on first element
          if (document.activeElement === focusableContent?.[0]) {
            e.preventDefault();
            focus(focusableContent?.[focusableContent.length - 1]);
          }
        } else {
          // tab wraps focus to start if you're on last element
          if (document.activeElement === focusableContent?.[focusableContent.length - 1]) {
            e.preventDefault();
            focus(focusableContent?.[0]);
          }
        }
        let focusedOutside = false;
        focusableContent?.forEach((el) => {
          focusedOutside = focusedOutside || el === document.activeElement;
        });
        console.log('focusedOutside', focusedOutside, document.activeElement);
        return;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

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

  const handleModal = (props: any) => {
    setIsModalOpen(!isModalOpen),
      console.log(props, "props modal handle")
  }

  const imagesShown = positionData.menu.images ? 'block' : 'hidden'

  return (
    <div>
      <div
        ref={divRef}
        style={{ transform: `translate3d(${positionData.menu.imagesX}px, ${positionData.menu.imagesY}px, 0px)` }}
        className={clsx(imagesShown, " p-4 rounded-lg cursor-pointer z-10 grid grid-cols-3 gap-2 absolute  bg-[#d3e0f6]")}>

        {updatedImages.map((imageItem, index) => (

          <div className="z-0">
            <button className={clsx('z-10')} onClick={() => handleModal(imageItem)}>
              <img src={imageItem.value} style={{ height: '128px' }}
                // onClick={() => console.log("image hey ")}
                className={clsx("z-0", imageItem.id === currentRiff.id ? `shadow-[0px_1px_8px_3px_black]` : "")} />
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
              <div className="flex gap-2 justify-end">


                {/* 
                    create an Image with AI and chage the current image 
                    image search some API
                    video search some API
                    upload their image ...

                    tabs functionality ... 
                */}

                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M181.66,146.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L164.69,152l-18.35-18.34a8,8,0,0,1,11.32-11.32Zm-72-24a8,8,0,0,0-11.32,0l-24,24a8,8,0,0,0,0,11.32l24,24a8,8,0,0,0,11.32-11.32L91.31,152l18.35-18.34A8,8,0,0,0,109.66,122.34ZM216,88V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-56-8h28.69L160,51.31Zm40,136V96H152a8,8,0,0,1-8-8V40H56V216H200Z"></path></svg>
                </button>

                
                {/* 
                  video button 

                <button className="">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M148.23,153.21a8,8,0,0,0-7.75-.39l-21.22,10.39A16,16,0,0,0,104,152H48a16,16,0,0,0-16,16v40a16,16,0,0,0,16,16h56a16,16,0,0,0,15.44-11.87l20.84,11A8,8,0,0,0,152,216V160A8,8,0,0,0,148.23,153.21ZM104,208H48V168h56v31c0,.13,0,.25,0,.38V208Zm32-5.24-16-8.42V180.66l16-7.83ZM213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v88a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216H176a8,8,0,0,0,0,16h24a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160Z"></path></svg>
                </button> */}
                <button className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M110.66,147.56a8,8,0,0,0-13.32,0L76.49,178.85l-9.76-15.18a8,8,0,0,0-13.46,0l-36,56A8,8,0,0,0,24,232H152a8,8,0,0,0,6.66-12.44ZM38.65,216,60,182.79l9.63,15a8,8,0,0,0,13.39.11l21-31.47L137.05,216Zm175-133.66-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v96a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216h-8a8,8,0,0,0,0,16h8a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160Z"></path></svg>
                </button>
                <button className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-42.34-77.66a8,8,0,0,1-11.32,11.32L136,139.31V184a8,8,0,0,1-16,0V139.31l-10.34,10.35a8,8,0,0,1-11.32-11.32l24-24a8,8,0,0,1,11.32,0Z"></path></svg>
                </button>
              </div>
              <div>
                <label>Create an AI image</label>
                <textarea className="w-full h-44 border border-black " />
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
      {/* <div style={{transform:`translate3d(${positionData.menu.colorsX}px, ${positionData.menu.colorsY + divRef.current?.clientHeight! + 5}px, 0px)`}}
      className={clsx("bg-white w-60 border border-black ")}>
      color picker below ?
    </div> */}
    </div >
  )
}


const focus = (el: Element | undefined | null) => {
  if (el && el instanceof HTMLElement) {
    el.focus();
  }
};