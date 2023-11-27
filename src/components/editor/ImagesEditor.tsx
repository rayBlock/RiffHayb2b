import clsx from "clsx";
import { useEffect, useRef, useState, type Dispatch, type RefObject } from "react";
import type { PositionDataActionTypes, PositionDataObject, UpdateItemPositionAction, UpdatePlayingAction } from "../utils/positionReducer";
import type { MainDataActionTypes, MainDataObject, } from "../utils/propsReducer";
import { getValueForIdAndPropName } from "../utils/inputValueExtraction";
import type { PlayerRef } from "@remotion/player";

interface ColorBarProps {
  positionData: PositionDataObject
  positionAction: Dispatch<PositionDataActionTypes>
  mainWindow: number | undefined
  propsState: MainDataObject
  propsActions: Dispatch<MainDataActionTypes>
  currentRiff: any
  playerWidth: number | undefined
  orientation: string
  playerRef: RefObject<PlayerRef>

}

// type MenuProps = {
//     child: any
//     propsData: MainDataObject
//     propsAction: Dispatch<UpdateMenuAction>
//     menuArg: menuPropNames
// }




export const ImagesEditor = ({ positionData, playerRef, orientation, mainWindow, playerWidth, propsState, positionAction, currentRiff }: ColorBarProps) => {




  const pixelsAvailable = mainWindow && mainWindow > 1255 ? playerWidth ? (mainWindow - playerWidth) / 2 : playerWidth ? playerWidth : 720 : mainWindow ? mainWindow : 420

  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const image_editorRef = useRef<HTMLDivElement | null>(null);

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

  const updatedImages = propsState.propsDock.images.map((imageItem) => {
    const value = getValueForIdAndPropName(propsState.data, imageItem.id, imageItem.propName);
    return { ...imageItem, value };
  });

  // const [offsetTrack, setOffsetTrack] = useState<offsetTrackType>({ x: xInit, y: yInit });


  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      startXRef.current = e.clientX;
      startYRef.current = e.clientY;
    };

    // const handleMouseDownOnImage = (e: MouseEvent) => {
    //   setIsDragging(false);

    // };
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
    if (imageRef.current) {
      imageRef.current.addEventListener('mousedown', handleMouseDown);
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
  const updateRedSelect = (value: boolean) => {
    const action: UpdatePlayingAction = {
      type: 'UPDATE_PLAYING',
      payload: {
        value,
      },
    };
    positionAction(action);
  };
  function spaceHandler({ key }: { key: string }) {


    if (key === " " && image_editorRef.current?.clientHeight) {

      // stupid stuff because play button at 2 separate places...
      let playCondition = playerRef.current?.isPlaying();
      playCondition ? playerRef.current?.pause() : playerRef.current?.play()
      updateRedSelect(!playCondition)

    }
  }
  useEffect(() => {
    window.addEventListener("keydown", spaceHandler);
    return () => {
      window.removeEventListener("keydown", spaceHandler);
    };
  }, []);
  const handleModal = (props: any) => {
    if (divRef.current) {
      divRef.current.scroll({ behavior: 'smooth', top: 0 });
    }
    console.log(props, "image modal props");

    setIsModalOpen(!isModalOpen)
  }

  const editorWidth = mainWindow && mainWindow > 1255 ? pixelsAvailable - 50 :
  mainWindow && mainWindow > 1000 ? pixelsAvailable - 250 :
   pixelsAvailable - 20
  const imagesShown = positionData.menu.images ? 'grid' : 'hidden'

  console.log(mainWindow, "mainWIndow");

  const arrangedPropsFields = [
    ` `,
    ``,

  ]

  const position = positionData.menu.texts && orientation !== "Landscape" ? arrangedPropsFields[1] :
    positionData.menu.colors || positionData.menu.texts ? arrangedPropsFields[1] :
      arrangedPropsFields[0]

  const orientier = orientation === "Landscape" && mainWindow && mainWindow > 1255 ?
    ` absolute grid-cols-2 top-10 right-10 h-[45vh] bg-green-200  ` :
    orientation === "Landscape" && mainWindow && mainWindow < 1256 ?
      `absolute grid-cols-2 sm:grid-cols-2 gap-2 max-h-[310px] md:bg-red-200 md:max-h-[250px]
       md:grid-cols-4 left-1/2 h-fit
       bottom-28 sm:bottom-24   `
      :

      orientation === "Square" ? "" :

        orientation === "Portrait" && mainWindow && mainWindow > 1255 ?
          `top-12 xl:bg-red-200 h-[45vh] absolute right-12 xl:grid-cols-3 ` :
          orientation === "Portrait" && mainWindow && mainWindow < 1256 ?
            `grid-cols-4 gap-2 h-[30vh] md:h-[25vh] left-1/2 sm:bottom-24 lg:bottom-6 pb-6 absolute 
            
            ` :
            ""

  const moveHalfWayBack = mainWindow && mainWindow > 1255 ? '' : 'translateX(-50%)'

  const imageHeight = orientation === "Landscape" ? "" :
    orientation === "Square" ? "" :
      orientation === "Portrait" ? `` :
        ""

  return (

    <div
      ref={divRef}
      style={{ width: `${editorWidth}px`, 
      transform: `translate3d(${positionData.menu.imagesX}px, ${positionData.menu.imagesY}px, 0px)
      ${moveHalfWayBack}
      `
     }}
      className={clsx(imagesShown, orientier,
        isModalOpen? "overflow-y-clip" : "overflow-y-scroll",
       " p-4 md:gap-2 w-fit rounded-3xl  rounded-tr-none border-2 border-black shadow-[1px_4px_0px_#000000] cursor-pointer z-10  bg-[#d3e0f6]")}>

      {updatedImages.map((imageItem, index) => (
        <button key={index} className={clsx(
          'z-20 flex justify-center ')}
          onClick={() => handleModal(imageItem)}
        // onClick={() => console.log(imageItem)}

        >
          <img src={imageItem.value}
            className={clsx("z-0", imageItem.id === currentRiff.id ? `` : "")} />
        </button>


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
          className="mx-auto absolute min-w-[50px] max-h-[90vh] max-w-lg flex flex-col overflow-auto rounded bg-white p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div ref={image_editorRef} className="flex flex-col">
            {/* <div className="flex gap-2 justify-end">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M181.66,146.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L164.69,152l-18.35-18.34a8,8,0,0,1,11.32-11.32Zm-72-24a8,8,0,0,0-11.32,0l-24,24a8,8,0,0,0,0,11.32l24,24a8,8,0,0,0,11.32-11.32L91.31,152l18.35-18.34A8,8,0,0,0,109.66,122.34ZM216,88V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-56-8h28.69L160,51.31Zm40,136V96H152a8,8,0,0,1-8-8V40H56V216H200Z"></path></svg>
              </button>

                <button className="">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M148.23,153.21a8,8,0,0,0-7.75-.39l-21.22,10.39A16,16,0,0,0,104,152H48a16,16,0,0,0-16,16v40a16,16,0,0,0,16,16h56a16,16,0,0,0,15.44-11.87l20.84,11A8,8,0,0,0,152,216V160A8,8,0,0,0,148.23,153.21ZM104,208H48V168h56v31c0,.13,0,.25,0,.38V208Zm32-5.24-16-8.42V180.66l16-7.83ZM213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v88a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216H176a8,8,0,0,0,0,16h24a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160Z"></path></svg>
                </button>
              <button className="">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M110.66,147.56a8,8,0,0,0-13.32,0L76.49,178.85l-9.76-15.18a8,8,0,0,0-13.46,0l-36,56A8,8,0,0,0,24,232H152a8,8,0,0,0,6.66-12.44ZM38.65,216,60,182.79l9.63,15a8,8,0,0,0,13.39.11l21-31.47L137.05,216Zm175-133.66-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v96a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216h-8a8,8,0,0,0,0,16h8a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160Z"></path></svg>
              </button>
              <button className="">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-42.34-77.66a8,8,0,0,1-11.32,11.32L136,139.31V184a8,8,0,0,1-16,0V139.31l-10.34,10.35a8,8,0,0,1-11.32-11.32l24-24a8,8,0,0,1,11.32,0Z"></path></svg>
              </button>

            </div> */}
            <div>
              <label>URL</label>
              <textarea className="w-full p-2 h-16 border border-black " />

              <button
                onClick={() => console.log("submit")}
                className="rounded-lg bg-green-200 px-4 py-2 w-24 self-end text-black font-medium	" >submit</button>
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

  )
}


const focus = (el: Element | undefined | null) => {
  if (el && el instanceof HTMLElement) {
    el.focus();
  }
};