// 'use client'



//  Garden for the Distributor Component with the array as Input


import React from 'react'; // Make sure to import React if you haven't already


import { CircularWipe } from "./utils/remotion-flow/traverse/CircularWipe";
import { Dissolve } from "./utils/remotion-flow/traverse/Dissolve";
import { FadeThroughColor } from "./utils/remotion-flow/traverse/FadeThroughColor";
import { LinearWipe } from "./utils/remotion-flow/traverse/LinearWipe";
import { Pan } from "./utils/remotion-flow/traverse/Pan";
import { Slide } from "./utils/remotion-flow/traverse/Slide";
import { SlidingDoors } from "./utils/remotion-flow/traverse/SlidingDoors";
import TransitionSeries from './utils/remotion-flow';
import { riffsArray } from './riffs';


export const TransitionComponents = {
    dissolve: Dissolve,
    fadeThroughColor: FadeThroughColor,
    pan: Pan,
    slide: Slide,
    slidingDoors: SlidingDoors,
    linearWipe: LinearWipe,
    circularWipe: CircularWipe,
    // Add any other transition components here...
  };

  const TransitionDecider =(props:any, i:number):any =>{

   const transitionArray = [
     <Slide {...props} />,
     <Dissolve {...props} />,
     <FadeThroughColor color='#D1D5DB' {...props} />,
      <Pan {...props} />,
      <SlidingDoors {...props} />,
      <LinearWipe angle={46} {...props} />,
      <CircularWipe {...props} />,
  ]
  return transitionArray[i]
}

function SequenceDecider (props:any, i:number):any {
  // console.log(props, "props in seuqnece deci")
  const Component = riffsArray[i]?.component
 return  <Component {...props} />
}

// Define the interface for the transition component


// Define the interface for the TransitionComponents object
export interface TransitionComponents {
  dissolve?: React.ComponentType<any>;
  fadeThroughColor?: React.ComponentType<any>;
  pan?: React.ComponentType<any>;
  slide?: React.ComponentType<any>;
  slidingDoors?: React.ComponentType<any>;
  linearWipe?: React.ComponentType<any>;
  circularWipe?: React.ComponentType<any>;
  // Add any other transition components here...
}
export type riffInput = {
  data: {
    duration: number,
    comp: number,
    props?: any


  }[]
}

export function RiffGarden(
 inputProps
: riffInput) {

  // console.log(inputProps.data)
  // aa   the 2 arrays stitched together ...
  // the correct props
  //  correct durationInfFrames




        return (
          <TransitionSeries>
              
              { inputProps.data.map((item, i) => 
             

              (
                i % 2 === 0 ?
              <TransitionSeries.Sequence key={i} durationInFrames={item.duration}>
                {SequenceDecider(item.props, item.comp)}
                {/* <div className='text-white text-3xl'>{i}</div> */}
              </TransitionSeries.Sequence>
              : 

              <TransitionSeries.Transition key={i} durationInFrames={item.duration} 
              transitionComponent={(s) => TransitionDecider(s, item.comp) }/>

              )
              )
            }


          




             {/* { () => sequenceData.map((item, index) => (

            
index % transitionData.length === 0 ? (
  <Sequence item={item} {...props}  />
) : (
  <Transition
    transitionData={transitionData}
    transitionComponents={TransitionComponents}
    index={index}
    enterElement={<div>some</div>}
    exitElement={<div>go</div>}
    {...props}
  />)
)}
     */}
          </TransitionSeries>
        );
      }

  // export function RiffHay({ remotionArr, traverseArr, inputProps,  traverseComponents = TransitionComponents  }:iRiffs) {
  //   const { width, height } = useVideoConfig();


  
  //   return (
  //     <TransitionSeries>
  //        <TransitionSeries.Sequence durationInFrames={30}>
  //         <div style={{backgroundColor:'hotpink'}} className="bg-red-200 w-full text-3xl">hello world</div>
  //           </TransitionSeries.Sequence>
  //         <TransitionSeries.Transition
  //           durationInFrames={5}
  //           transitionComponent={(props) => (
  //               <CircularWipe  {...props} progress={Easing.inOut(Easing.exp)} />
  //             )}/>
  //         <TransitionSeries.Sequence durationInFrames={150}>
  //           <div style={{background:'red'}} className="text-5xl flex justify-center items-center ">

  //          <div>sunshine</div>
  //           </div>
  //         </TransitionSeries.Sequence>
  //         <TransitionSeries.Transition
  //         durationInFrames={50}
  //         transitionComponent={(props) => <Dissolve {...props}  />}
  //         />


  //       {/* {sequenceData.map((sequenceItem, index) => {
  //         const transitionIndex = index % transitionData.length; // Calculate the corresponding transition index
  
  //         return (
  //           <React.Fragment key={index}>
  //             {transitionIndex === 0 ? (
  //               <TransitionSeries.Sequence durationInFrames={sequenceItem.duration}>
  //                 {sequenceItem.comp}
  //               </TransitionSeries.Sequence>
  //             ) : (
  //               <TransitionSeries.Transition
  //                 durationInFrames={transitionData[transitionIndex].duration}
  //                 transitionComponent={(props) => {
  //                   const TransitionComponent = transitionComponents[transitionData[transitionIndex].type];
  //                   return <TransitionComponent {...props} progress={transitionData[transitionIndex].easing} />;
  //                 }}
  //               />
  //             )}
  //           </React.Fragment>
  //         );
  //       })} */}
  //     </TransitionSeries>
  //   );
  // }



//  export const RiffGarden: React.FC <{}> = ({}) => {

// return (
// <div>

// </div>
// )}


// function CustomComponent({ sequenceArray, transitionArray }) {
//     const frame = useCurrentFrame();
//     const { width, height } = useVideoConfig();
//     console.log(width, height, "w,h");
  
//     const transitions = [
//       // Add your desired transition components here
//       (props) => <Dissolve {...props} />,
//       (props) => <FadeThroughColor {...props} />,
//       (props) => <Pan {...props} />,
//       (props) => <Slide {...props} />,
//       (props) => <SlidingDoors {...props} />,
//       (props) => <LinearWipe {...props} />,
//       (props) => <CircularWipe {...props} />,
//     ];
  
//     return (
//       <TransitionSeries>
//         {sequenceArray.map((imageUrl, index) => (
//           <React.Fragment key={index}>
//             <TransitionSeries.Sequence
//               durationInFrames={100}
//               /* Additional props for Sequence can be passed here */
//             >
//               {/* Replace ToniConfig.component with your custom image component here */}
//               <CustomImageComponent imageUrl={imageUrl} />
//             </TransitionSeries.Sequence>
//             {index < sequenceArray.length - 1 && (
//               <TransitionSeries.Transition
//                 durationInFrames={50}
//                 /* Additional props for Transition can be passed here */
//                 transitionComponent={transitions[index % transitions.length]}
//               />
//             )}
//           </React.Fragment>
//         ))}
//       </TransitionSeries>
//     );
//   }
  