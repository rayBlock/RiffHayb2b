'use client'

// import { Sidebar } from "./sideBar/sideBar"
import type { PlayerRef } from "@remotion/player";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCurrentPlayerFrame } from "../utils/use-current-frame";
import clsx from "clsx";
// import { useEffect, useState } from "react";
// import { useReducer, useMemo } from "react"
// import { inputPropsReducer } from "@/utils/remotion/inputPropsReducer"

export const RifferTimeLine: React.FC<{
  playerRef: React.RefObject<PlayerRef>;
  inputs: any;
  totalFrames: number
}> = ({ playerRef, inputs, totalFrames }) => {
  const { data } = inputs;
  // const [playing, setStatePlaying] = useState<boolean>(true);
  // const [spaceModeTime, setSpaceModeTime] = useState<any>(null);
  const frame = useCurrentPlayerFrame(playerRef);

  const timeLineRef = useRef<HTMLDivElement | null>(null);
  // console.log(timeLineRef.current?.clientWidth, "timeline ref ?");
  const timeLineWidth: any = timeLineRef.current?.clientWidth
  const timeLinePixelPercentage = timeLineWidth / 100



  // function spaceHandler({ key }: { key: string }) {
  //   if (key === " ") {
  //     turn_play();
  //   }
  // }
  const handleDrag = (frameChange: number) => {
    playerRef.current?.seekTo(frameChange);
  };




  // useEffect(() => {
  //   window.addEventListener("keydown", spaceHandler);
  //   return () => {
  //     window.removeEventListener("keydown", spaceHandler);
  //   };
  // }, []);


  // function turn_play() {
  //   const currentTime = Date.now();

  //   if (spaceModeTime === null || currentTime - spaceModeTime > 200) {
  //     let playCondition = playerRef.current?.isPlaying();
  //     playCondition ? playerRef.current?.pause() : playerRef.current?.play()
  //     setStatePlaying(!playCondition)
  //   }
  //   setSpaceModeTime(currentTime)

  // };





  const progress = useMemo(() => {
    // TODO TOTAL FRAMES
    return (frame / totalFrames) * 100;
  }, [frame]);


  return (
    <div className="max-w-md relative flex flex-col justify-center items-center ">
     
      <div>


        <div ref={timeLineRef} className={clsx(`grid grid-flow-col px-auto gap-1 pt-24 relative items-center justify-center`)}>
          {data.map((item: any, index: number) => (
            // console.log(item, "item"),
            <div
              key={index} className={clsx(`z-10  `)}
            >
              {index % 2 === 0 ?

                // RiffBar
                <div style={{ width: `${item.duration / 25}vw`, minWidth: '10px' }}
                  className="h-6 md:h-10 border-2 border-black rounded bg-[#d3e0f6]">

                </div>

                :

                // Traverse 
                <div className=" h-4 sm:min-w-[2vw] border-2 border-black rounded bg-black">

                </div>
              }
            </div>
          ))}
          <DraggableFramePointer
            timeLinePixelPercentage={timeLinePixelPercentage}
            frame={frame}
            progress={progress}
            onDrag={handleDrag}
            totalFrames={totalFrames} />
        </div>
      </div>
    </div>
  )
};


interface DraggableDivProps {
  progress: number;
  frame: number
  totalFrames: number
  timeLinePixelPercentage: number

  onDrag: (dragDistance: number) => void;
}

const DraggableFramePointer: React.FC<DraggableDivProps> = ({ frame, progress,  totalFrames, onDrag, timeLinePixelPercentage }) => {
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
        className={clsx('h-5 absolute w-20 pb-0 sm:pb-6 -ml-10 grid-cols-1 grid justify-items-center items-center cursor-move bg-black group ring-black ring-2 border-black rounded-full ')}>
        <p className="h-6 sm:h-6 place-self-center select-none group-hover:text-red-200  text-white ">
          {frame + 1} <br></br>
          {/* // seconds... */}
          {/* {Math.floor(frame / 30)} */}
        </p>
        <div className="h-24 w-[3px] bg-black  " />
      </div>
    </>
  );
};





