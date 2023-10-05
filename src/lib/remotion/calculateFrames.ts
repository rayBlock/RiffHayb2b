import type { FrameSchema, FramesCalculationInput } from "../../types/calculateFrames";


function calculateTotalDurations(
    props: FrameSchema[],
    locked: number[]
  ): {
    totalDurationsAllProps: number;
    totalDurationsUnlocked: number;
    totalDurationsLocked: number;
    unlockedPropsIndex: number[];
    lockedPropsIndex: number[];
  } {
    const totalDurationsAllProps = props.reduce(
      (acc, prop) => acc + prop.durationInFrames,
      0
    );
  
    const unlockedPropsIndex: number[] = props
      .map((_, index) => index)
      .filter((index) => !locked.includes(index));
  
    const totalDurationsUnlocked = unlockedPropsIndex.reduce(
      (acc, index) => acc + props[index]!.durationInFrames,
      0
    );
  
    const lockedPropsIndex: number[] = props
      .map((_, index) => index)
      .filter((index) => locked.includes(index));
  
    const totalDurationsLocked = lockedPropsIndex.reduce(
      (acc, index) => acc + props[index]!.durationInFrames,
      0
    );
  
    return {
      totalDurationsAllProps,
      totalDurationsUnlocked,
      totalDurationsLocked,
      unlockedPropsIndex,
      lockedPropsIndex,
    };
  }

// function adjustLockedProps(
//   lockedProps: FrameSchema[],
//   seekedDuration: number
// ): FrameSchema[] {
//   return lockedProps;
// }

function setUnlockedProps(
  unlockedProps: FrameSchema[],
  extraFrames: number
): FrameSchema[] {
  const extraFramesPerUnlockedProp = Math.round(
    extraFrames / unlockedProps.length
  );

  return unlockedProps.map((prop) => {
    let adjustedDuration = prop.durationInFrames + extraFramesPerUnlockedProp;
    adjustedDuration = Math.max(prop.minDurationFrames, adjustedDuration);
    adjustedDuration = Math.min(prop.maxDurationFrames, adjustedDuration);

    return {
      ...prop,
      durationInFrames: adjustedDuration,
    };
  });
}

// function calculateExtraVariables(
//   propsLength: number,
//   isSeekedDurationLarger: boolean,
//   overallDuration: number,
//   mainDuration: number
// ): number[] {
//   const extraDurationForTraverse = isSeekedDurationLarger
//     ? overallDuration - mainDuration
//     : mainDuration - overallDuration;

//   const extraVariableDurations = Array(propsLength - 1).fill(25);

//   // Handle the case where extraDurationForTraverse is exactly 0
//   if (extraDurationForTraverse !== 0) {
//     extraVariableDurations[0] = +extraDurationForTraverse;
//   }

//   return extraVariableDurations;
// }

// function applyConstraints(props: FrameSchema[]): FrameSchema[] {
//   return props.map((prop) => {
//     const adjustedDuration = Math.max(
//       prop.minDurationFrames,
//       Math.min(prop.maxDurationFrames, prop.durationInFrames)
//     );
//     return {
//       ...prop,
//       durationInFrames: adjustedDuration,
//     };
//   });
// }


function calculateRemainingFrames(
    props: FrameSchema[],
    seekedDuration: number,
    durationLockedProps: number,
    traverseTime:number
  ): number {
    const durationOfProps = getAddedDurationInFrames(props);
    const durationProps = durationLockedProps + durationOfProps + traverseTime; 
    return seekedDuration - durationProps;
  }
  
  function getAddedDurationInFrames(props: FrameSchema[]): number {
    let totalDuration = 0;
    for (const prop of props) {
      totalDuration += prop.durationInFrames;
    }
    return totalDuration;
  }

  function subtractFrames(
    props: FrameSchema[],
    addFrames: number
  ): FrameSchema[] {
  
    // Check if addFrames is divisible by props.length without leaving any remainder
    const isDivisible = addFrames % props.length === 0;
  
    // If addFrames is divisible, distribute frames evenly among all props
    if (isDivisible) {
      const framesToSubtractPerProp = Math.floor(addFrames / props.length);
      props.forEach((prop) => {
        prop.durationInFrames += framesToSubtractPerProp;
      });
    } else {
      // If there are remaining frames, distribute the frames differently
      const framesToSubtractPerProp = Math.floor(addFrames / props.length);
      const remainingFrames = addFrames - framesToSubtractPerProp * props.length;
  
      // Distribute frames equally among all props
      props.forEach((prop) => {
        prop.durationInFrames += framesToSubtractPerProp;
      });
  
      // Distribute remaining frames to the first prop
      props[0]!.durationInFrames += remainingFrames;
    }
  
    return props;
  }

  
function addFramesToRiff(
    props: FrameSchema[],
    addFrames: number
  ): FrameSchema[] {
    // Input validation
    if (!Array.isArray(props) || props.length === 0 || addFrames <= 0) {
      throw new Error("Invalid arguments. props must be a non-empty array and addFrames must be a positive number.");
    }
  
    // Check if addFrames is divisible by props.length without leaving any remainder
    const isDivisible = addFrames % props.length === 0;
  
    // If addFrames is divisible, distribute frames evenly among all props
    if (isDivisible) {
      const framesToAddPerProp = Math.floor(addFrames / props.length);
      props.forEach((prop) => {
        prop.durationInFrames += framesToAddPerProp;
      });
    } else {
      // If there are remaining frames, distribute the frames differently
      const framesToAddPerProp = Math.floor(addFrames / props.length);
      const remainingFrames = addFrames - framesToAddPerProp * props.length;
  
      // Distribute frames equally among all props
      props.forEach((prop) => {
        prop.durationInFrames += framesToAddPerProp;
      });
  
      // Distribute remaining frames to the first prop
      props[0]!.durationInFrames += remainingFrames;
    }
  
    return props;
  }

export function calcFramesOld({
  props,
  seekedDuration,
  locked = [],
  traverseDuration,
}: FramesCalculationInput): any {
  const {
    totalDurationsAllProps,
    // totalDurationsUnlocked,
    totalDurationsLocked,
    // lockedPropsIndex,
    // unlockedPropsIndex
  } = calculateTotalDurations(props, locked);

  const nProps = props.length;
  const nTraverse = nProps - 1;
  const traverseZeit = traverseDuration ? traverseDuration : 25;
  const durationTraverse = nTraverse * traverseZeit

  const mainDuration = totalDurationsAllProps + nTraverse * traverseZeit;

  const durationDifference = seekedDuration - mainDuration;
  const isDivisible = durationDifference % props.length === 0;

    // If addFrames is divisible, distribute frames evenly among all props
    if (isDivisible) {
        const addFrames = durationDifference / props.length;
        props.forEach((prop) => {
          prop.durationInFrames += addFrames;
        });
        return props
    }
    
  const unlockedProps = props.filter((_, index) => !locked.includes(index));
//   const lockedProps = props.filter((_, index) => locked.includes(index));

  // Switch statement based on the calculated durationDifference
  switch (true) {
    case durationDifference > 0:
      const riffProps = setUnlockedProps(unlockedProps, durationDifference);
        const remain = calculateRemainingFrames(riffProps , seekedDuration, totalDurationsLocked, durationTraverse)
            return addFramesToRiff(riffProps,remain);

    case durationDifference === 0:
        console.log("overallDuration is equal to mainDuration");
        return props

    case durationDifference < 0:
        const riffPropsNegative = setUnlockedProps(unlockedProps, durationDifference);
        const remainingNegatives = calculateRemainingFrames(riffPropsNegative , seekedDuration, totalDurationsLocked, durationTraverse)
        return subtractFrames(riffPropsNegative, remainingNegatives)

    default:
      // Default case if none of the above conditions match
      console.log("Invalid case");
      break;
  }


}






