'use client'

// import { Sidebar } from "./sideBar/sideBar"
import type { PlayerRef } from "@remotion/player";
import { useEffect, useMemo, useState } from "react";
import { useCurrentPlayerFrame } from "../utils/use-current-frame";
import clsx from "clsx";
// import { useEffect, useState } from "react";
// import { useReducer, useMemo } from "react"
// import { inputPropsReducer } from "@/utils/remotion/inputPropsReducer"

export const RifferTimeLine: React.FC<{
  playerRef: React.RefObject<PlayerRef>;
  inputs: any
}> = ({ playerRef, inputs }) => {
  const { data } = inputs;
  const [playing, setStatePlaying] = useState<boolean>(true);
  const [spaceModeTime, setSpaceModeTime] = useState<any>(null);
  const frame = useCurrentPlayerFrame(playerRef);

  function spaceHandler({ key }: { key: string }) {
    if (key === " ") {
      turn_play();
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", spaceHandler);
    return () => {
      window.removeEventListener("keydown", spaceHandler);
    };
  }, []);


  function turn_play() {
    const currentTime = Date.now();

    if (spaceModeTime === null || currentTime - spaceModeTime > 500) {
      let playCondition = playerRef.current?.isPlaying();
      playCondition ? playerRef.current?.pause() : playerRef.current?.play()
      setStatePlaying(!playCondition)
    }
    setSpaceModeTime(currentTime)

  };


  const totalFrames = 300;


  const progress = useMemo(() => {
    // TODO TOTAL FRAMES
    return (frame / totalFrames) * 100;
  }, [frame]);


  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <div className="flex justify-center pt-8 items-center">
        <button
          onClick={turn_play}
          aria-label={playing ? 'Pause' : 'Play'}
          className=" w-36 h-12"
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      {frame}
      <div>


        <div className={clsx(`flex gap-4 pt-28 relative items-center justify-center`)}>
          {data.map((item: any, index: number) => (

            <div
              key={index}
              // style={{ width: `${item.duration}px`, border: '1px solid black' }}
              className={clsx(`z-10 `)}
            >
              {index % 2 === 0 ?
                // RiffBar
                <div className="w-36 h-10 border-2 border-black rounded bg-gray-200">
                    {item.comp}
                </div>
                :
                // Traverse 
                <div className="w-16 h-4 border-2 border-black rounded bg-gray-200">

                </div>
              }

            </div>
          ))}

          <div style={{ left: `${progress}% `, transform: ` translateY(42px)` }}
            className={clsx(' h-5 absolute   bg-black rounded-full flex justify-center')}>
            <div className="h-24 w-[3px]  bg-black -translate-y-24 "></div>
          </div>

        </div>


      </div>
    </div>
  )
};