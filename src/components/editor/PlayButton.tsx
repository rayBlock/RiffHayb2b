import clsx from "clsx";
import { useEffect, useState } from "react";


export const PlayButton = ({ playerRef, yPosition, hiddenProp, scale }: any) => {
    const [playing, setStatePlaying] = useState<boolean>(true);
    const [spaceModeTime, setSpaceModeTime] = useState<any>(null);


    function spaceHandler({ key }: { key: string }) {

        const windowInnerWidth = window.innerWidth;

        
        if (key === " ") {
            // stupid stuff because play button at 2 separate places...
            if (windowInnerWidth >= 1024 && scale === 'scale-125'){
                turn_play();

            } else if (windowInnerWidth < 1024 && scale === 'scale-90') {
                turn_play();

            }
            else return
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

        if (spaceModeTime === null || currentTime - spaceModeTime > 200) {
            let playCondition = playerRef.current?.isPlaying();
            playCondition ? playerRef.current?.pause() : playerRef.current?.play()
            setStatePlaying(!playCondition)
        }
        setSpaceModeTime(currentTime)

    };

    return (
        <div style={{ transform: `translateY(${yPosition}px)` }}
            className={clsx(hiddenProp, "  justify-center items-center")}>
            <button
                onClick={turn_play}
                aria-label={playing ? 'Pause' : 'Play'}
                className=" w-36 h-12"
            >
                {playing ?
                    // Pause
                    <div className={clsx(scale, '')}>

                        < svg width="80" height="35" viewBox="0 -1 28 45" xmlns="http://www.w3.org/2000/svg" >
                            <g transform="rotate(90, 23, 23.5) " >

                                <path d="M37.6875 19.0781H3.3125C2.62874 19.0781 1.97298 19.3497 1.48949 19.8332C1.006 20.3167 0.734375 20.9725 0.734375 21.6562V30.25C0.734375 30.9338 1.006 31.5895 1.48949 32.073C1.97298 32.5565 2.62874 32.8281 3.3125 32.8281H37.6875C38.3713 32.8281 39.027 32.5565 39.5105 32.073C39.994 31.5895 40.2656 30.9338 40.2656 30.25V21.6562C40.2656 20.9725 39.994 20.3167 39.5105 19.8332C39.027 19.3497 38.3713 19.0781 37.6875 19.0781ZM38.5469 30.25C38.5469 30.4779 38.4563 30.6965 38.2952 30.8577C38.134 31.0188 37.9154 31.1094 37.6875 31.1094H3.3125C3.08458 31.1094 2.86599 31.0188 2.70483 30.8577C2.54367 30.6965 2.45312 30.4779 2.45312 30.25V21.6562C2.45312 21.4283 2.54367 21.2097 2.70483 21.0486C2.86599 20.8874 3.08458 20.7969 3.3125 20.7969H37.6875C37.9154 20.7969 38.134 20.8874 38.2952 21.0486C38.4563 21.2097 38.5469 21.4283 38.5469 21.6562V30.25ZM37.6875 0.171875H3.3125C2.62874 0.171875 1.97298 0.443498 1.48949 0.92699C1.006 1.41048 0.734375 2.06624 0.734375 2.75V11.3438C0.734375 12.0275 1.006 12.6833 1.48949 13.1668C1.97298 13.6503 2.62874 13.9219 3.3125 13.9219H37.6875C38.3713 13.9219 39.027 13.6503 39.5105 13.1668C39.994 12.6833 40.2656 12.0275 40.2656 11.3438V2.75C40.2656 2.06624 39.994 1.41048 39.5105 0.92699C39.027 0.443498 38.3713 0.171875 37.6875 0.171875ZM38.5469 11.3438C38.5469 11.5717 38.4563 11.7903 38.2952 11.9514C38.134 12.1126 37.9154 12.2031 37.6875 12.2031H3.3125C3.08458 12.2031 2.86599 12.1126 2.70483 11.9514C2.54367 11.7903 2.45312 11.5717 2.45312 11.3438V2.75C2.45312 2.52208 2.54367 2.30349 2.70483 2.14233C2.86599 1.98117 3.08458 1.89062 3.3125 1.89062H37.6875C37.9154 1.89062 38.134 1.98117 38.2952 2.14233C38.4563 2.30349 38.5469 2.52208 38.5469 2.75V11.3438Z"
                                    fill="black" />
                            </g>
                        </svg >
                    </div >
                    // Play
                    :
                    <div className={clsx(scale, '')}>
                        <svg width="80" height="35" viewBox="0 0 69 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_909_2078)">
                                <path d="M45.3675 25.4375L54.8737 19.6562C55.3287 19.3787 55.5563 18.9933 55.5563 18.5C55.5563 18.0067 55.3287 17.6212 54.8737 17.3437L45.3675 11.5625C44.88 11.2542 44.3841 11.2307 43.8797 11.4922C43.3753 11.7537 43.1237 12.1625 43.125 12.7187L43.125 24.2812C43.125 24.8362 43.3772 25.2451 43.8816 25.5078C44.386 25.7705 44.8813 25.7471 45.3675 25.4375ZM48 37C45.3025 37 42.7675 36.5141 40.395 35.5422C38.0225 34.5703 35.9588 33.2525 34.2038 31.5887C32.4488 29.9238 31.0597 27.9658 30.0366 25.715C29.0135 23.4642 28.5013 21.0592 28.5 18.5C28.5 15.9408 29.0122 13.5358 30.0366 11.285C31.061 9.03417 32.4501 7.07625 34.2038 5.41125C35.9588 3.74625 38.0225 2.42843 40.395 1.4578C42.7675 0.487167 45.3025 0.00123333 48 0C50.6975 0 53.2325 0.485933 55.605 1.4578C57.9775 2.42967 60.0413 3.74748 61.7963 5.41125C63.5513 7.07625 64.9409 9.03417 65.9653 11.285C66.9897 13.5358 67.5013 15.9408 67.5 18.5C67.5 21.0592 66.9878 23.4642 65.9634 25.715C64.939 27.9658 63.55 29.9238 61.7963 31.5887C60.0413 33.2537 57.9775 34.5722 55.605 35.544C53.2325 36.5159 50.6975 37.0012 48 37Z"
                                    fill="black" />
                            </g>
                            <defs>
                                <clipPath id="clip0_909_2078">
                                    <rect width="95" height="37" fill="black" transform="translate(0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>}
            </button>
        </div>
    )
}