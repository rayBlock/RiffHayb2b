'use client'

// import { Sidebar } from "./sideBar/sideBar"
import type { PlayerRef } from "@remotion/player";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCurrentPlayerFrame } from "../utils/use-current-frame";
import clsx from "clsx";
import { useShiftKey } from "../utils/use-key-board";
// import { useEffect, useState } from "react";
// import { useReducer, useMemo } from "react"
// import { inputPropsReducer } from "@/utils/remotion/inputPropsReducer"

export const RifferTimeLine: React.FC<{
  playerRef: React.RefObject<PlayerRef>;
  inputs: any;
  totalFrames: number;
  mainWindow?: any;
  riffsTime: any;
  tlWidth: number
  orientation: any
}> = ({ playerRef, orientation, inputs, totalFrames, riffsTime, tlWidth }) => {
  const { data } = inputs;
  // const [playing, setStatePlaying] = useState<boolean>(true);
  // const [spaceModeTime, setSpaceModeTime] = useState<any>(null);
  const frame = useCurrentPlayerFrame(playerRef);

  const timeLineRef = useRef<HTMLDivElement | null>(null);
  const timeLineWidth: any = timeLineRef.current?.clientWidth
  const timeLinePixelPercentage = timeLineWidth / 100

  // const riffTimeLineSections = Math.floor(data.length / 2)
  // console.log(riffTimeLineSections);

  const pixelsPerFrameRaw = tlWidth / totalFrames

  const pixelsPerFrame: number = parseFloat(pixelsPerFrameRaw.toFixed(2));


  const handle_frame = (frameChange: number) => {
    playerRef.current?.seekTo(frameChange);
  };

  const progress = useMemo(() => {
    // TODO TOTAL FRAMES
    return (frame / totalFrames) * 100;
  }, [frame]);

  // TODO get shift into here... because of state bug
  const shift = useShiftKey();

  function spaceArrowRightHandler({ key }: { key: string }) {
    if (key === "ArrowRight") {
      shift ? handle_frame(frame + 10)
        :
        handle_frame(frame + 1)
    }
    if (key === "ArrowLeft") {
      shift ? handle_frame(frame - 10)
        :
        handle_frame(frame - 1)
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", spaceArrowRightHandler);
    return () => {
      window.removeEventListener("keydown", spaceArrowRightHandler);
    };
  }, [frame, shift]);





  return (

    <div ref={timeLineRef} className={clsx(orientation === "Portrait" ? "lg:translate-y-12" : "lg:translate-y-20", `grid group translate-y-4 pt-12 pb-4 grid-flow-col items-center justify-center`)}>
      <div className="absolute -translate-y-4">{shift}</div>
      {data.map((item: any, index: number) => (


        <div
          key={index} className={clsx(`z-20`)}
        >
          {index % 2 === 0 ?

            // RiffBar
            <div style={{
              // width: `${pixelsPerFrame * data[index].duration}px`


              width: ` ${index === 0 ?
                pixelsPerFrame * (item.duration
                  - data[index + 1].duration
                )
                : index === data.length - 1
                  ? pixelsPerFrame * (item.duration - (data[index - 1].duration))
                  // ? pixelsPerFrame * data[index].duration
                  //TODO: figure out how to do the math for this one 
                  : pixelsPerFrame * (item.duration - (data[index - 1].duration + data[index + 1].duration))
                //  - Math.round((riffTimeLineSections * 10) / (riffTimeLineSections - 1))
                }px `,

              background: `${item.id === riffsTime.id ? "#BAF7D0" : "transparent"}`


              //`${item.duration}px`, 
              // minWidth: '10px'
            }}
              className=" h-6 lg:h-10 border-2 border-black  rounded-lg">

            </div>

            :

            // Traverse 
            <div
              style={{
                width: `${(pixelsPerFrame * item.duration) - 8}px`,
                background: `${item.id === riffsTime.id ? "#BAF7D0" : "transparent"}`


              }}
              className=" h-4 border-2 mx-1 border-black rounded-md ">
              {/* {item.duration} */}
            </div>
          }
        </div>
      ))}
      <DraggableFramePointer
        timeLinePixelPercentage={timeLinePixelPercentage}
        frame={frame}
        progress={progress}
        onDrag={handle_frame}
        totalFrames={totalFrames}
        orientation={orientation}
      />
    </div>

  )
};











interface DraggableDivProps {
  progress: number;
  frame: number
  totalFrames: number
  timeLinePixelPercentage: number
  orientation: any
  onDrag: (dragDistance: number) => void;
}

const DraggableFramePointer: React.FC<DraggableDivProps> = ({ frame, orientation, progress, totalFrames, onDrag, timeLinePixelPercentage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const startFrame = useRef<number>(0);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      startXRef.current = e.clientX;
      startFrame.current = frame

    };
    const handleMouseDrag = (e: MouseEvent) => {
      if (isDragging && divRef.current && startXRef.current !== null) {
        const offsetX = e.clientX - startXRef.current;

        // Calculate the new frame relative to the initial frame
        const frameChange = offsetX / timeLinePixelPercentage;
        const someMore = (frameChange / 100) * totalFrames;
        const newFrame = Math.round(startFrame.current + someMore)
        onDrag(newFrame);
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
  }, [isDragging, progress, onDrag]);



  return (
    <>
      <div
        ref={divRef}
        style={{ left: `${progress}% ` }}
        className={clsx('h-8 absolute  w-10 sm:w-20 pb-0 -translate-y-7 lg:-translate-y-10 -ml-5 sm:-ml-10 lg:grid-cols-1 gap-2 grid-cols-1 grid justify-items-center cursor-pointer bg-black group ring-black ring-2 border-black rounded-full ')}
      >
        <div className="flex -z-20 ">
          <p className="h-8 -z-30 select-none pt-[2px] group-hover:text-red-200  text-white ">
            {frame === 0 ? '0' : `${Math.floor(frame / 30) + 1}s`}
          </p>

          {totalFrames / 2 > frame ?
            <>
              <div className="absolute xl:hidden ml-7 sm:ml-12 mt-3 w-5 h-1 bg-black  " />
              <p className="h-8 xl:hidden absolute  w-16 ml-12 sm:ml-16 pb-8 pt-1 px-4 rounded-xl text-center items-center self-center bg-black z-0 sm:h-6 place-self-center select-none group-hover:text-red-200  text-white ">
                {frame + 1}
              </p>
            </>
            :

             
              <div className="relative ">
                <div className=" xl:hidden absolute -ml-12 sm:-ml-16  mt-3 w-5 h-1 bg-black  " />
                <p className=
                  {clsx(
                    "h-6 w-16 -translate-y-0.5 xl:hidden absolute -ml-28 sm:-ml-32  pb-8 pt-1 px-4 rounded-xl text-center items-center self-center bg-black z-0 sm:h-6 place-self-center select-none group-hover:text-red-200  text-white "
                  )}
                >
                  {frame + 1}
                </p>
              </div>

          }

        </div>

        <div className="h-10 lg:h-16 w-[3px] bg-black  " />
        <div className={clsx('h-7 w-12 sm:w-20 pb-0 z-10 hidden sm:pb-6 cursor-pointer grid-cols-1 xl:hover:grid xl:group-hover:grid justify-items-center items-center bg-black group ring-black ring-2 border-black rounded-full ')}>
          <p className="h-6 z-0 sm:h-6 place-self-center select-none group-hover:text-red-200  text-white ">
            {frame + 1}
          </p>
        </div>

      </div>

    </>
  );
};





