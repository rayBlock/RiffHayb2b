

import { useVideoConfig, Img, spring, useCurrentFrame, interpolate, Easing } from "remotion";
import { cn } from "../../../../lib/utils";



// const mask: React.CSSProperties = {
//     maskType: "alpha",
// };
type rectAni = "keepUp" | "height" | "keepUpSmaller"

export const MultiRectColsMask: React.FC<{
    src: string,
    className?: string,
    height1?: number
    height2?: number
    animationDuration?: number
}> = ({ src, className, height1 = 500, height2 = 400, animationDuration = 40 }) => {
    const { width, fps } = useVideoConfig();
    const frame = useCurrentFrame();
    const RECT_SPACE = 100
    const BAR_SPACE = 90
    const START_POS = 60



    const rectangleHeight = ({ height, type }: { height: number, type: rectAni }): number => {
        const progress = spring({
            fps,
            frame,
            config: {
                damping: 100,
            },
            durationInFrames: animationDuration,
        });
        if (type === "height")
            return interpolate(progress, [0, 1], [START_POS, height], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.ease })
        else if (type === "keepUp")
            return interpolate(progress, [0, 1], [height1 / 2, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.ease })
        else
            return interpolate(progress, [0, 1], [height1 / 2, (height1 - height2) / 2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.ease })

    }

    const progress = spring({
        fps,
        frame,
        config: {
            damping: 200,
        },
        durationInFrames: 80,
    });

    const rightStop = interpolate(progress, [0, 1], [200, 0]);

    const leftStop = Math.max(0, rightStop - 100);
    const maskImage = `linear-gradient(-45deg, transparent ${leftStop}%, black ${rightStop}%)`;

    const clipRectangles = Math.floor(width / RECT_SPACE)
    console.log(clipRectangles, "rects")

    const vectorMargin = (width - (clipRectangles * RECT_SPACE - (RECT_SPACE - BAR_SPACE))) / 2
    console.log(vectorMargin, "margin")
    return (
        <div className={cn(className)} style={{ display: 'flex', transform: `scale(0.95)`, justifyContent: 'center' }}>
            {/* @ts-ignore */}
            <Img style={{
                clipPath: `url(#myClip)`,
                //  maskImage: maskImage, WebkitMaskImage: maskImage

            }} src={src}
                width={'100%'} />
            <svg width="0" height="0" className={cn("")}
                style={{
                    maskImage: maskImage, WebkitMaskImage: maskImage
                }}

            >
                <defs>
                    <clipPath id="myClip" >

                        {new Array(clipRectangles)
                            .fill(true)
                            .map((_, i) => {
                                return (
                                    i % 2 === 0 ?
                                        <rect key={i} width={BAR_SPACE} y={rectangleHeight({ height: height1, type: "keepUp" })} height={rectangleHeight({ height: height1, type: "height" })}
                                            x={i * RECT_SPACE + vectorMargin} rx={40}
                                            className="border-2 border-black" />
                                        :
                                        <rect key={i} width={BAR_SPACE} y={rectangleHeight({ height: height1, type: "keepUpSmaller" })} height={rectangleHeight({ height: height2, type: "height" })}
                                            x={i * RECT_SPACE + vectorMargin} rx={40} />

                                );
                            })
                        }


                    </clipPath>
                </defs>
            </svg>

        </div>
    )
}