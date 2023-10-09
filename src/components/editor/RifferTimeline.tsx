'use client'

// import { Sidebar } from "./sideBar/sideBar"
import type { PlayerRef } from "@remotion/player";
import { useEffect, useState } from "react";
import { useCurrentPlayerFrame } from "../utils/use-current-frame";
import clsx from "clsx";
// import { useEffect, useState } from "react";
// import { useReducer, useMemo } from "react"
// import { inputPropsReducer } from "@/utils/remotion/inputPropsReducer"

export const RifferTimeLine: React.FC<{
  playerRef: React.RefObject<PlayerRef>;
}> = ({ playerRef }) => {

  const [playing, setStatePlaying] = useState<boolean>(true)
  const frame = useCurrentPlayerFrame(playerRef);
  const [spaceModeTime, setSpaceModeTime] = useState<any>(null)


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



  return (
    <div className="w-full ">

      <div>Current time: {frame}</div>
      <div style={{ transform: `translateX(${frame}px)` }} className={clsx('w-16 h-16 transition-all bg-white z-10 rounded-full flex justify-center')}>
        <div className="h-52 w-1 z-0  bg-white "></div>
      </div>

      <button
        onClick={turn_play}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  )
};