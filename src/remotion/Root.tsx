import { Composition } from "remotion";
// import { Main } from "./MyComp/Main";
// import {
//   COMP_NAME,
//   defaultMyCompProps,
//   DURATION_IN_FRAMES,
//   VIDEO_FPS,
//   VIDEO_HEIGHT,
//   VIDEO_WIDTH,
// } from "../types/constants";


// import './../app/globals.css'
import RiffBabe, { dataInputter } from "./RiffBaby";
import { LilyMotion } from "./RIFFS/Lily/Lily";
// import { SubuMotion } from "./RIFFS/Subu/Subu";
// import { SubuRiff } from "./RIFFS/Subu/config";
import { AnfaMotion } from './RIFFS/Anfa/Anfa'



export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      /> */}

      <Composition
        id={"das"}
        component={RiffBabe}
        durationInFrames={160}
        fps={30}
        width={700}
        height={700}
        defaultProps={{ dataInputter }}

      />
      <Composition
        id={"Jetzt"}
        component={AnfaMotion}
        durationInFrames={180}
        fps={30}
        width={720}
        height={1280}
        defaultProps={{

            duration: 100, comp: 0, props: { shortS: { text: "hello world", fs: 20 }, name: "textname", more: "some",
            image1: {url: "https://images.unsplash.com/photo-1659465081408-ca96af85e91e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2848&q=80"}
           } 
       

          
        }}

      />

    </>
  );
};
