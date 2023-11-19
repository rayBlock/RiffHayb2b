
import { useEffect, type Dispatch, type RefObject, useRef, useState } from "react";
import type { MainDataActionTypes, MainDataObject, UpdateTextItemAction } from "../utils/propsReducer";
import type { PlayerRef } from "@remotion/player";
import type { PositionDataActionTypes, PositionDataObject, UpdatePlayingAction, } from "../utils/positionReducer";
import clsx from "clsx";

interface TextProps {
    playerRef: RefObject<PlayerRef>
    text: any
    propsState: MainDataObject
    propsAction: Dispatch<MainDataActionTypes>
    positionData: PositionDataObject
    positionAction: Dispatch<PositionDataActionTypes>
    width: number
}

export const TextPropsModal = ({ text, propsState, width,
    // positionData, 
    positionAction, propsAction, playerRef }: TextProps) => {

    const editorRef = useRef<HTMLDivElement | null>(null);
    const [activeTab, setActiveTab] = useState(0);
    const [strokeActive, setStrokeActive] = useState<boolean>();
    const [shadowActive, setShadowActive] = useState<boolean>();


    const breit = width > 1800 ? "largest" :
        width <= 1800 && width > 1500 ? "secondLargest" :
            width <= 1500 && width > 1000 ? "big" :
                width <= 1000 && width > 700 ? "middle" :
                    width <= 700 ? "small" :
                        0

    const updateRedSelect = (value: boolean) => {
        const action: UpdatePlayingAction = {
            type: 'UPDATE_PLAYING',
            payload: {
                value,
            },
        };
        positionAction(action);
    }
    function spaceHandler({ key }: { key: string }) {
        console.log(editorRef.current?.clientHeight);

        if (key === " " && editorRef.current?.clientHeight) {

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



    const updateTextItemProperty = (id: string, propName: string, textProp: string, value: any) => {

        const action: UpdateTextItemAction = {
            type: 'UPDATE_TEXT_ITEM',
            payload: {
                id,
                propName,
                textProp,
                value
            },
        };
        propsAction(action);
    };

    const tabs = [
        'Text',
        'Font',
        'Style',
        'Coloring',
        'Position',
        'More',
    ];


    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const handleVisibilityClick = (prop: any) => {


        updateTextItemProperty(text.id, text.propName, "opa", prop)

    }
    const foundObject: any = text ? propsState.data.find(item => item.id === text.id) : 0;
    const opacit = foundObject.props ? foundObject.props[text.propName].opa : 1;
    const decorationColour = foundObject.props ? foundObject.props[text.propName].decorationColor : "#000000";
    const fontStyled = foundObject.props ? foundObject.props[text.propName].fontStyle : "";
    const bgColor = foundObject.props ? foundObject.props[text.propName].bg : "transparent";
    const bgLinear = foundObject.props ? foundObject.props[text.propName].bgLinear : undefined;
    const bgLinearColor = foundObject.props ? foundObject.props[text.propName].bg2 : undefined;
    const bgLinearDeg = foundObject.props ? foundObject.props[text.propName].bgLinearDeg : undefined;
    const stroke = foundObject.props ? foundObject.props[text.propName].stroke : undefined;
    const strokeColor = foundObject.props ? foundObject.props[text.propName].strokeColor : undefined;
    const shadow = foundObject.props ? foundObject.props[text.propName].shadow : undefined;
    const shadowColor = foundObject.props ? foundObject.props[text.propName].shadowColor : undefined;
    const shadowOffsetX = foundObject.props ? foundObject.props[text.propName].shadowOffsetX : undefined;
    const shadowOffsetY = foundObject.props ? foundObject.props[text.propName].shadowOffsetY : undefined;
    const borderW = foundObject.props ? foundObject.props[text.propName].borderW : undefined;
    const borderAdvanced = foundObject.props ? foundObject.props[text.propName].borderAdvanced : undefined;
    const borderStyle = foundObject.props ? foundObject.props[text.propName].borderStyle : undefined;
    const borderRadius = foundObject.props ? foundObject.props[text.propName].borderRadius : undefined;
    const borderRadiusTL = foundObject.props ? foundObject.props[text.propName].borderRadiusTL : undefined;


    const userX = foundObject.props ? foundObject.props[text.propName].userX : undefined;
    const userY = foundObject.props ? foundObject.props[text.propName].userY : undefined;





    // breit === "big" ? "" :
    // breit === "middle" ? "" :
    //     breit === "small" ? "" :
    //         "",





    return (
        <div ref={editorRef}>
            <div className="flex justify-evenly pt-4 sm:pt-2 md:mx-10 ">


                {opacit === 0 ? <button onClick={() => handleVisibilityClick(1)} className="hidden sm:block mr-2">
                    {/* eye slashed */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#000000" viewBox="0 0 256 256"><path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z"></path></svg>
                </button>
                    :
                    <button
                        className="hidden sm:block mr-2"
                        onClick={() => handleVisibilityClick(0)}>
                        {/* eye open  */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#000000" viewBox="0 0 256 256"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path></svg>

                    </button>
                }

                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab ${activeTab === index ? 'active border-b-2 border-black rounded-lg p-2 pb-1 bg-green-200  sm:px-6 text-xl' : 'text-xl sm:px-6 p-2 pb-1 border-b-2 border-black'}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>


            {/* The  'Text', --> Edit the text & visibility button on smaller screen */}

            {activeTab === 0 && text && text ?
                <div className="flex pt-4">
                    <textarea
                        onChange={(e) => updateTextItemProperty(text.id, text.propName, "text", e.target.value)}
                        className="w-4/5 h-24 sm:h-16 sm:w-[88%] md:w-[90%] mb-2 border border-black rounded-xl py-2 mt-2 mx-2 px-2" value={text.value.text}
                    />
                </div>
                : null}
            {activeTab === 0 && text && text ?

                // <button className="mr-2 absolute ml-2"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#000000" viewBox="0 0 256 256"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path></svg></button>
                opacit === 0 ?
                    <button
                        onClick={() => handleVisibilityClick(1)}
                        className="absolute sm:hidden mr-2 ml-4">
                        {/* eye slashed */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#000000" viewBox="0 0 256 256"><path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z"></path></svg>
                    </button>
                    :
                    <button
                        className="absolute sm:hidden mr-2 ml-4"
                        onClick={() => handleVisibilityClick(0)}>
                        {/* eye open  */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#000000" viewBox="0 0 256 256"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path></svg>

                    </button>


                : null}



            {/* The 'Font', - > */}

            {activeTab === 1 && text && text ?
                <div className="gap-6 justify-center flex  auto-cols-fr pb-4 pt-4 sm:pt-8 px-2 mx-2">
                    <div className="flex gap-6 sm:mr-4">
                        <div className="flex flex-col">

                            <label className="text-xl pl-1 pb-3">Size</label>
                            <input
                                type="text" inputMode="numeric" placeholder="55"
                                className="border-2 rounded-tl-none shadow-[0px_3px_0px_0px_black] text-center w-[4.5rem] h-10 rounded-full border-black"
                                onChange={(e) => updateTextItemProperty(text.id, text.propName, "fs", e.target.value)} />
                        </div>



                        <div className="flex flex-col">

                            <label className="text-xl pl-1 pb-3">Font Family</label>
                            {/* <input
                            type="text" inputMode="numeric"
                            className="border-2 rounded-tl-none shadow-[0px_3px_0px_0px_black] text-center w-36 h-10 rounded-full border-black"
                            onChange={(e) => updateTextItemProperty(text.id, text.propName, "fs", e.target.value)} /> */}

                            <select
                                id="fontFamily"
                                className="block w-full rounded-full pl-2  h-10 border-2 rounded-tl-none shadow-[1px_3px_0px_0px_black] border-black focus:border-dashed focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 sm:text-sm"
                                // disabled={updatePromptMutation.isLoading}
                                onChange={(e) => {
                                    updateTextItemProperty(text.id, text.propName, "fontFamily", e.target.value)
                                }}
                            >
                                <option style={{ fontFamily: 'Montseeat Variable' }} value="Montserrat Variable">Montserrat</option>
                                <option value='Lora Variable'>Lora</option>
                                <option value="Roboto Mono Variable">Roboto</option>
                                <option value="Quicksand Variable">Quicksand</option>
                                <option value="Oswald Variable">Oswald</option>
                                <option value="Mulish Variable">Mulish</option>
                                <option value="Rokkitt Variable">Rokkitt</option>
                                <option value="Hepta Slab Variable">Hepta Slab</option>
                                <option value="Aleo Variable">Aleo</option>
                                <option value="Heebo Variable">Heebo</option>
                                <option value="Red Hat Display Variable">Red Hat Display</option>
                                <option value="Yanone Kaffeesatz Variable">Yanone Kaffeesatz</option>
                                <option value="Teko Variable">Teko</option>
                                <option value="Cinzel Variable">Cinzel</option>
                                <option value="Red Rose Variable">Red Rose</option>
                                <option value="Readex Pro Variable">Readex Pro</option>
                                <option value="Tourney Variable">Tourney</option>
                                <option value="Nabla Variable">Nabla</option>
                                <option value="Sansita Swashed Variable">Sansita Swashed</option>
                            </select>
                        </div>


                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col">

                            <label className="text-xl pl-1  pb-3">Weight</label>
                            <select
                                id="fontWeight"
                                className="block w-full rounded-full pl-2 h-10 border-2 rounded-tl-none shadow-[1px_3px_0px_0px_black] border-black focus:border-dashed focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 sm:text-sm"
                                onChange={(e) => {
                                    updateTextItemProperty(text.id, text.propName, "fontW", e.target.value)
                                }}
                            >
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                                <option value="600">600</option>
                                <option value="700">700</option>
                                <option value="800">800</option>
                                <option value="900">900</option>

                            </select>

                        </div>
                        <div className="flex flex-col">

                            <label className="text-xl pl-1  pb-3">Height</label>
                            <input
                                type="text" inputMode="numeric" placeholder="55"
                                className="border-2 rounded-tl-none shadow-[0px_3px_0px_0px_black] text-center w-20 h-10 rounded-full border-black"
                                onChange={(e) => updateTextItemProperty(text.id, text.propName, "lineHeight", e.target.value)} />
                        </div>

                        <div className="flex gap-1 flex-col">
                            <label className="text-xl pl-1 pb-1">Italic</label>

                            <div className="flex w-full gap-2">

                                <button className={clsx(fontStyled !== 'italic' ? " bg-red-200" : "", "w-12 border-2 rounded-full rounded-tr-none rounded-tl-none shadow-[1px_3px_0px_0px_black] py-1 border-black")}
                                    onClick={() => updateTextItemProperty(text.id, text.propName, "fontStyle", "")}>
                                    <span className="text-2xl "><b>I</b></span>
                                </button>

                                <button className={clsx(fontStyled === 'italic' ? " bg-red-200" : "", "w-12 border-2 rounded-full rounded-tr-none rounded-tl-none shadow-[1px_3px_0px_0px_black] py-1 border-black")}
                                    onClick={() => updateTextItemProperty(text.id, text.propName, "fontStyle", "italic")}>
                                    <span className="text-2xl " style={{ fontStyle: 'italic' }}><b>I</b></span>
                                </button>
                            </div>

                        </div>


                    </div>

                </div>
                : null}


            {/* The 'Style', - > */}

            {activeTab === 2 && text && text ?

                <div className="flex gap-6 pt-4 sm:pt-8 sm:gap-6 justify-center px-2 mx-2">
                    <div className="flex gap-6 flex-col sm:flex-row">
                        <div>

                            <label className="text-xl pl-1">
                                Decoration
                            </label>
                            <div className="flex gap-2 pt-3">

                                <button onClick={() => updateTextItemProperty(text.id, text.propName, "decorationStyle", "unset")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#000000" viewBox="0 0 256 256"><path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
                                </button>
                                <button onClick={() => updateTextItemProperty(text.id, text.propName, "decorationStyle", "overline")}>
                                    <svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.49922 0.549805C1.28705 0.549805 1.08356 0.63409 0.933534 0.784119C0.783505 0.934148 0.699219 1.13763 0.699219 1.3498C0.699219 1.56198 0.783505 1.76546 0.933534 1.91549C1.08356 2.06552 1.28705 2.1498 1.49922 2.1498H17.4992C17.7114 2.1498 17.9149 2.06552 18.0649 1.91549C18.2149 1.76546 18.2992 1.56198 18.2992 1.3498C18.2992 1.13763 18.2149 0.934148 18.0649 0.784119C17.9149 0.63409 17.7114 0.549805 17.4992 0.549805H1.49922ZM4.49922 4.8498C4.49922 4.58459 4.39386 4.33023 4.20633 4.1427C4.01879 3.95516 3.76444 3.8498 3.49922 3.8498C3.234 3.8498 2.97965 3.95516 2.79211 4.1427C2.60458 4.33023 2.49922 4.58459 2.49922 4.8498V15.4498C2.49922 17.3063 3.23672 19.0868 4.54947 20.3996C5.86223 21.7123 7.6427 22.4498 9.49922 22.4498C11.3557 22.4498 13.1362 21.7123 14.449 20.3996C15.7617 19.0868 16.4992 17.3063 16.4992 15.4498V4.8498C16.4992 4.58459 16.3939 4.33023 16.2063 4.1427C16.0188 3.95516 15.7644 3.8498 15.4992 3.8498C15.234 3.8498 14.9796 3.95516 14.7921 4.1427C14.6046 4.33023 14.4992 4.58459 14.4992 4.8498V15.4498C14.4992 16.7759 13.9724 18.0477 13.0348 18.9853C12.0971 19.923 10.8253 20.4498 9.49922 20.4498C8.17314 20.4498 6.90137 19.923 5.96369 18.9853C5.026 18.0477 4.49922 16.7759 4.49922 15.4498V4.8498Z" fill="black" />
                                    </svg>


                                </button>
                                <button onClick={() => updateTextItemProperty(text.id, text.propName, "decorationStyle", "underline")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M200,224a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H192A8,8,0,0,1,200,224Zm-72-24a64.07,64.07,0,0,0,64-64V56a8,8,0,0,0-16,0v80a48,48,0,0,1-96,0V56a8,8,0,0,0-16,0v80A64.07,64.07,0,0,0,128,200Z"></path></svg></button>
                                <button onClick={() => updateTextItemProperty(text.id, text.propName, "decorationStyle", "line-through")}>
                                    <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.49922 1.2002C6.49922 0.934979 6.39386 0.680625 6.20633 0.493089C6.01879 0.305552 5.76444 0.200195 5.49922 0.200195C5.234 0.200195 4.97965 0.305552 4.79211 0.493089C4.60458 0.680625 4.49922 0.934979 4.49922 1.2002V8.9002H1.49922C1.28705 8.9002 1.08356 8.98448 0.933534 9.13451C0.783505 9.28454 0.699219 9.48802 0.699219 9.7002C0.699219 9.91237 0.783505 10.1159 0.933534 10.2659C1.08356 10.4159 1.28705 10.5002 1.49922 10.5002H4.49922V11.8002C4.49922 13.6567 5.23672 15.4372 6.54947 16.7499C7.86223 18.0627 9.6427 18.8002 11.4992 18.8002C13.3557 18.8002 15.1362 18.0627 16.449 16.7499C17.7617 15.4372 18.4992 13.6567 18.4992 11.8002V10.5002H21.4992C21.7114 10.5002 21.9149 10.4159 22.0649 10.2659C22.2149 10.1159 22.2992 9.91237 22.2992 9.7002C22.2992 9.48802 22.2149 9.28454 22.0649 9.13451C21.9149 8.98448 21.7114 8.9002 21.4992 8.9002H18.4992V1.2002C18.4992 0.934979 18.3939 0.680625 18.2063 0.493089C18.0188 0.305552 17.7644 0.200195 17.4992 0.200195C17.234 0.200195 16.9796 0.305552 16.7921 0.493089C16.6046 0.680625 16.4992 0.934979 16.4992 1.2002V8.9002H6.49922V1.2002ZM6.49922 10.5002V11.8002C6.49922 13.1263 7.026 14.398 7.96369 15.3357C8.90137 16.2734 10.1731 16.8002 11.4992 16.8002C12.8253 16.8002 14.0971 16.2734 15.0348 15.3357C15.9724 14.398 16.4992 13.1263 16.4992 11.8002V10.5002H6.49922Z" fill="black" />
                                    </svg>

                                </button>
                            </div>
                        </div>



                        <div className="flex flex-col ml-2">
                            <label className="text-xl pl-1 pb-3">
                                Line
                            </label>
                            <select
                                id="fontWeight"
                                className="block w-full rounded-full pl-2 h-10 border-2 rounded-tl-none shadow-[1px_3px_0px_0px_black] border-black focus:border-dashed focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 sm:text-sm"
                                onChange={(e) => {
                                    updateTextItemProperty(text.id, text.propName, "decorationLine", e.target.value)
                                }}
                            >
                                <option value="solid">solid</option>
                                <option value="dotted">dotted</option>
                                <option value="dashed">dashed</option>
                                <option value="double">double</option>
                            </select>
                        </div>
                    </div>


                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex gap-6">

                            <div className="flex ml-2 flex-col">

                                <label className="text-xl pl-1 pb-3">Width</label>
                                <input
                                    type="text" inputMode="numeric" placeholder="55"
                                    className="border-2 rounded-tl-none shadow-[0px_3px_0px_0px_black] text-center w-20 h-10 rounded-full border-black"
                                    onChange={(e) => updateTextItemProperty(text.id, text.propName, "decorationW", e.target.value)} />
                            </div>

                            <div className="flex flex-col items-center">
                                <label className="text-xl pl-1 pb-3">Color</label>

                                <input value={decorationColour}
                                    onChange={(e) => updateTextItemProperty(text.id, text.propName, "decorationColor", e.target.value)}
                                    className="justify-start min-w-8 w-8 cursor-pointer shadow-[0px_3px_0px_#000000] h-8" type="color" />
                            </div>
                        </div>
                        <div className="flex flex-col">

                            <label className="text-xl pl-1 pb-3">Transform</label>


                            <div className=" h-8 gap-2 flex w-32">

                                <button onClick={() => updateTextItemProperty(text.id, text.propName, "transform", "none")} className="w-20">
                                    <svg style={{ transform: `translateY(3px)` }} viewBox="0 0 29 19.05"><g id="uuid-309a13b1-726d-4479-a82f-b05597d98cba"><path d="m9.91.57c-.23-.5-.83-.71-1.33-.48-.21.1-.38.27-.48.48L.1,17.57c-.24.5-.02,1.1.48,1.33.5.24,1.1.02,1.33-.48h0l2.08-4.42h10.02l2.08,4.42c.24.5.83.71,1.33.48.5-.24.71-.83.48-1.33L9.91.57Zm-4.98,11.43L9,3.35l4.07,8.65H4.93Zm19.07-6c-1.59,0-2.84.43-3.7,1.29-.38.4-.37,1.03.03,1.41.38.37.99.37,1.38,0,.48-.47,1.25-.71,2.3-.71,1.65,0,3,1.12,3,2.5v.4c-.89-.59-1.93-.91-3-.9-2.76,0-5,2.02-5,4.5s2.24,4.5,5,4.5c1.07,0,2.11-.31,3-.91.03.55.49.98,1.05.95s.98-.49.95-1.05v-7.5c0-2.48-2.24-4.5-5-4.5Zm0,11c-1.65,0-3-1.12-3-2.5s1.35-2.5,3-2.5,3,1.12,3,2.5-1.35,2.5-3,2.5Z" /></g></svg>
                                </button>
                                <button onClick={() => updateTextItemProperty(text.id, text.propName, "transform", "lowercase")} className="w-20">
                                    <svg style={{ transform: `scale(0.8) translateY(7px) ` }} viewBox="0 0 21.42 13.05"><g id="uuid-a9c90ef6-eeff-449f-821d-b7b13454a989"><path d="m16.42,0c-1.59,0-2.84.43-3.7,1.29-.38.4-.37,1.03.03,1.41.38.37.99.37,1.38,0,.48-.47,1.25-.71,2.3-.71,1.65,0,3,1.12,3,2.5v.4c-.89-.59-1.93-.91-3-.9-2.76,0-5,2.02-5,4.5s2.24,4.5,5,4.5c1.07,0,2.11-.31,3-.91.03.55.49.98,1.05.95s.98-.49.95-1.05v-7.5c0-2.48-2.24-4.5-5-4.5Zm0,11c-1.65,0-3-1.12-3-2.5s1.35-2.5,3-2.5,3,1.12,3,2.5-1.35,2.5-3,2.5Z" /><path d="m5,0c-1.59,0-2.84.43-3.7,1.29-.38.4-.37,1.03.03,1.41.38.37.99.37,1.38,0,.48-.47,1.25-.71,2.3-.71,1.65,0,3,1.12,3,2.5v.4c-.89-.59-1.93-.91-3-.9C2.24,4,0,6.02,0,8.5s2.24,4.5,5,4.5c1.07,0,2.11-.31,3-.91.03.55.49.98,1.05.95s.98-.49.95-1.05v-7.5C10,2.02,7.76,0,5,0Zm0,11c-1.65,0-3-1.12-3-2.5s1.35-2.5,3-2.5,3,1.12,3,2.5-1.35,2.5-3,2.5Z" /></g></svg>
                                </button>
                                <button onClick={() => updateTextItemProperty(text.id, text.propName, "transform", "uppercase")} className="w-20">
                                    <svg style={{ transform: `scale(1.2) translateY(4px) ` }} viewBox="0 0 37.14 19"><g ><path d="m9.91.57c-.23-.5-.83-.71-1.33-.48-.21.1-.38.27-.48.48L.1,17.57c-.24.5-.02,1.1.48,1.33.5.24,1.1.02,1.33-.48h0l2.08-4.42h10.02l2.08,4.42c.24.5.83.71,1.33.48.5-.24.71-.83.48-1.33L9.91.57Zm-4.98,11.43L9,3.35l4.07,8.65H4.93Z" /><path d="m29.04.57c-.23-.5-.83-.71-1.33-.48-.21.1-.38.27-.48.48l-8,17c-.24.5-.02,1.1.48,1.33.5.24,1.1.02,1.33-.48h0l2.08-4.42h10.02l2.08,4.42c.24.5.83.71,1.33.48.5-.24.71-.83.48-1.33L29.04.57Zm-4.98,11.43l4.07-8.65,4.07,8.65h-8.14Z" /></g></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                : null}



            {/* The 'Coloring', - >  Background, Stroke , Shadow*/}

            {activeTab === 3 && text && text ?


                <div className="flex flex-col lg:mb-6 lg:flex-row lg:gap-12 gap-2 sm:gap-4 pt-4 justify-center items-center px-2 mx-2">


                    <div className={clsx(bgColor === 'transparent' || bgColor === undefined ? "gap-4" : "gap-1", "flex gap-4 justify-center")}>

                        <div className={clsx(bgColor === 'transparent' || bgColor === undefined ? "w-52" : "absolute lg:relative left-8 md:left-36 lg:left-0 mt-4", "flex items-center justify-between")}>
                            {bgColor === 'transparent' || bgColor === undefined ?
                                <label className="text-xl pl-1 pb-1">Background</label>
                                : null
                            }
                            {bgColor === 'transparent' || bgColor === undefined ?
                                <button

                                    onClick={() => updateTextItemProperty(text.id, text.propName, "bg", "#ffffff")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"></path></svg>
                                </button>
                                :
                                <button onClick={() => updateTextItemProperty(text.id, text.propName, "bg", "transparent")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM208,208V48H48V208H208Z"></path></svg>
                                </button>
                            }

                        </div>


                        {bgColor !== 'transparent' && bgColor !== undefined ?
                            <div className={clsx(bgColor === 'transparent' || bgColor === undefined ? "gap-4" : "gap-1", "flex")}>

                                <div className="flex flex-col items-center justify-center">
                                    <label className="text-xl pl-1 ">Color</label>
                                    <input value={bgColor}
                                        onChange={(e) => updateTextItemProperty(text.id, text.propName, "bg", e.target.value)}
                                        className="justify-start h-10 min-w-8 w-20 cursor-pointer shadow-[0px_3px_0px_#000000] " type="color"
                                    />
                                </div>
                                <div className="flex flex-col  items-center">
                                    <label className="text-xl pl-1 pt-1">Linear </label>

                                    {bgLinear === false || bgLinear === undefined ?
                                        <button onClick={() => updateTextItemProperty(text.id, text.propName, "bgLinear", true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"></path></svg>
                                        </button>
                                        :
                                        <button onClick={() => updateTextItemProperty(text.id, text.propName, "bgLinear", false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM208,208V48H48V208H208Z"></path></svg>
                                        </button>
                                    }
                                </div>
                                {bgLinear === false || bgLinear === undefined ? null :

                                    <div className="flex flex-col items-center">
                                        <label className="text-xl pl-1 pt-1 pb-1">Angle </label>
                                        <input
                                            value={bgLinearDeg}
                                            type="text" inputMode="numeric" placeholder="55"
                                            className="border-2 rounded-tl-none shadow-[0px_3px_0px_0px_black] text-center w-20 h-10 rounded-full border-black"
                                            onChange={(e) => updateTextItemProperty(text.id, text.propName, "bgLinearDeg", e.target.value)}
                                        />

                                    </div>
                                }


                                {bgLinear === false || bgLinear === undefined ? null :

                                    <div className={clsx(bgColor === 'transparent' || bgColor === undefined ? "gap-4" : "gap-2", "flex")}>


                                        <div className="flex flex-col items-center justify-center">
                                            <label className="text-xl pl-1 ">Color</label>
                                            <input
                                                value={bgLinearColor}
                                                onChange={(e) => updateTextItemProperty(text.id, text.propName, "bg2", e.target.value)}
                                                className="justify-start h-10 min-w-8 w-20 cursor-pointer shadow-[0px_3px_0px_#000000]" type="color"
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                            : null
                        }
                    </div>

                    <div className="flex gap-4 justify-center">

                        <div className={clsx(strokeActive === false || stroke === undefined ? "w-52" : "absolute lg:relative lg:left-0 left-8 md:left-36 mt-4", "flex items-center justify-between")}>
                            {strokeActive === false || stroke === undefined ?
                                <label className="text-xl pl-1">Stroke</label>
                                : null
                            }

                            {strokeActive === false || stroke === undefined ?
                                <button onClick={() => { setStrokeActive(true), updateTextItemProperty(text.id, text.propName, "stroke", 1) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"></path></svg>
                                </button>
                                :
                                <button onClick={() => { setStrokeActive(false), updateTextItemProperty(text.id, text.propName, "stroke", 0) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM208,208V48H48V208H208Z"></path></svg>
                                </button>}
                        </div>
                        {strokeActive === false || stroke === undefined ? null :

                            <div className="flex flex-col items-center">
                                <label className="text-xl pl-1">Width </label>
                                <input
                                    value={stroke}
                                    type="text" inputMode="numeric" placeholder="55"
                                    className="border-2 rounded-tl-none shadow-[0px_3px_0px_0px_black] text-center w-20 h-10 rounded-full border-black"
                                    onChange={(e) => updateTextItemProperty(text.id, text.propName, "stroke", e.target.value)}
                                />

                            </div>

                        }

                        {strokeActive === false || stroke === undefined ? null :
                            <div className="flex flex-col items-center justify-center">
                                <label className="text-xl pl-1 ">Color</label>
                                <input
                                    value={strokeColor}
                                    onChange={(e) => updateTextItemProperty(text.id, text.propName, "strokeColor", e.target.value)}
                                    className="justify-start h-10 min-w-8 w-20 cursor-pointer shadow-[0px_3px_0px_#000000] " type="color"
                                />
                            </div>
                        }
                    </div>





                    <div className="flex gap-4 justify-center lg:mb-0 mb-4">

                        <div className={clsx(shadowActive === false || shadow === undefined ? "w-52" : "absolute lg:relative lg:left-0  left-8 md:left-36 mt-4", "flex items-center justify-between")}>

                            {shadowActive == false || shadow === undefined ?
                                <label className="text-xl pl-1">Shadow</label>
                                : null}


                            {shadowActive == false || shadow === undefined ?
                                <button onClick={() => { setShadowActive(true), updateTextItemProperty(text.id, text.propName, "shadow", 1) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"></path></svg>
                                </button>
                                :
                                <button onClick={() => { setShadowActive(false), updateTextItemProperty(text.id, text.propName, "shadow", 0) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM208,208V48H48V208H208Z"></path></svg>
                                </button>
                            }



                        </div>
                        {shadowActive == false || shadow === undefined ? null :
                            <div className="flex flex-col items-center">
                                <label className="text-xl pl-1">Width </label>
                                <input
                                    value={shadow}
                                    type="text" inputMode="numeric" placeholder="55"
                                    className="border-2 rounded-tl-none shadow-[0px_3px_0px_0px_black] text-center w-20 h-10 rounded-full border-black"
                                    onChange={(e) => updateTextItemProperty(text.id, text.propName, "shadow", e.target.value)}
                                />

                            </div>
                        }

                        {shadowActive === false || shadow === undefined ? null :
                            <div className="flex flex-col items-center justify-center">
                                <label className="text-xl pl-1 ">Color</label>
                                <input
                                    value={shadowColor}
                                    onChange={(e) => updateTextItemProperty(text.id, text.propName, "shadowColor", e.target.value)}
                                    className="justify-start h-10 min-w-8 w-20 cursor-pointer shadow-[0px_3px_0px_#000000] " type="color"
                                />
                            </div>
                        }

                        {shadowActive == false || shadow === undefined ? null :
                            <div className="flex flex-col items-center">
                                <label className="text-xl pl-1">offsetX </label>
                                <input
                                    value={shadowOffsetX}
                                    type="text" inputMode="numeric" placeholder="55"
                                    className="border-2 rounded-tl-none shadow-[0px_3px_0px_0px_black] text-center w-20 h-10 rounded-full border-black"
                                    onChange={(e) => updateTextItemProperty(text.id, text.propName, "shadowOffsetX", e.target.value)}
                                />

                            </div>
                        }

                        {shadowActive == false || shadow === undefined ? null :
                            <div className="flex flex-col items-center">
                                <label className="text-xl pl-1">offsetY </label>
                                <input
                                    value={shadowOffsetY}
                                    type="text" inputMode="numeric" placeholder="55"
                                    className="border-2 rounded-tl-none shadow-[0px_3px_0px_0px_black] text-center w-20 h-10 rounded-full border-black"
                                    onChange={(e) => updateTextItemProperty(text.id, text.propName, "shadowOffsetY", e.target.value)}
                                />

                            </div>
                        }
                    </div>

                </div>

                : null}

            {activeTab === 4 && text && text ?
                <div className="grid grid-cols-3 lg:mt-2 mt-6 gap-4 sm:gap-1 justify-center px-2 mx-2">

                    <div className="flex col-span-2  justify-center ">

                        <div className={clsx(borderAdvanced === false || shadow === undefined ? "" : "left-8 md:left-6 mt-4",
                            "flex flex-col sm:flex-row items-center lg:justify-center lg:gap-6 justify-evenly w-full ")}>

                            {borderAdvanced == true ? null :
                                <label className="text-xl underline underline-offset-2 "> Border </label>
                            }




                            <div className="flex flex-col sm:flex-row gap-4">

                                <div className="flex gap-4">
                                    {borderAdvanced === true ? null :
                                        <div className="flex flex-col items-center">
                                            <label className="text-xl pl-1">Width </label>
                                            <input
                                                value={borderW}
                                                type="text" inputMode="numeric" placeholder="55"
                                                className="border-2 rounded-tl-none shadow-[0px_3px_0px_0px_black] text-center w-20 h-10 rounded-full border-black"
                                                onChange={(e) => updateTextItemProperty(text.id, text.propName, "borderW", e.target.value)}
                                            />

                                        </div>
                                    }
                                    {borderAdvanced === true ? null :
                                        <div className="flex flex-col items-center justify-center">
                                            <label className="text-xl pl-1 ">Color</label>
                                            <input
                                                value={"#fffff"}
                                                onChange={(e) => updateTextItemProperty(text.id, text.propName, "borderColor", e.target.value)}
                                                className="justify-start h-10 min-w-8 w-20 cursor-pointer shadow-[0px_3px_0px_#000000] " type="color"
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="flex gap-4">

                                    {borderAdvanced == true ? null :
                                        <div className="flex flex-col items-center">
                                            <label className="text-xl pl-1">Radius </label>
                                            <input
                                                value={borderRadius}
                                                type="text" inputMode="numeric" placeholder="55"
                                                className="border-2 rounded-tl-none shadow-[0px_3px_0px_0px_black] text-center w-20 h-10 rounded-full border-black"
                                                onChange={(e) => updateTextItemProperty(text.id, text.propName, "borderRadius", e.target.value)}
                                            />

                                        </div>
                                    }

                                    {borderAdvanced === true ? null :
                                        <div className="flex flex-col ml-2">
                                            <label className="text-xl pl-1 ">
                                                Style
                                            </label>
                                            <select
                                                id="borderStyle"
                                                className="block w-full rounded-full lg:pl-4 pl-2 h-10 border-2 rounded-tl-none shadow-[1px_3px_0px_0px_black] border-black focus:border-dashed focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 lg:text-xl sm:text-sm"
                                                onChange={(e) => {
                                                    updateTextItemProperty(text.id, text.propName, "borderStyle", e.target.value)
                                                }}
                                            >
                                                <option value="solid">solid</option>
                                                <option value="dotted">dotted</option>
                                                <option value="dashed">dashed</option>
                                                <option value="double">double</option>


                                            </select>
                                        </div>
                                    }
                                </div>
                            </div>

                            {/* {borderAdvanced === false || borderAdvanced === undefined ?
                                <div className="flex flex-col relative items-center">
                                    <p className="text-xl">More</p>
                                    <button onClick={() => {
                                        updateTextItemProperty(text.id, text.propName, "borderAdvanced", true)

                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"></path></svg>
                                    </button>
                                </div>
                                :
                                <button className={clsx(borderAdvanced === true ? " absolute left-6 sm:left-8 md:left-[12vw]" : "", "")}
                                    onClick={() => updateTextItemProperty(text.id, text.propName, "borderAdvanced", false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM208,208V48H48V208H208Z"></path></svg>
                                </button>
                            } */}
                        </div>
                    </div>


                    <div className=" flex flex-col lg:mt-2 sm:flex-row ml-4 lg:mb-0 mb-4 gap-2">
                        <div className="flex flex-col items-center">
                            <label className="text-lg w-[110%] pb-1 sm:w-full sm:text-xl pl-1">Up / Down </label>
                            <input
                                value={userY}
                                type="number" inputMode="numeric" placeholder="0"
                                className="border-2 rounded-tl-none shadow-[0px_3px_0px_0px_black] text-center lg:w-28 w-20 h-10 rounded-full border-black"
                                onChange={(e) => updateTextItemProperty(text.id, text.propName, "userY", e.target.value)}
                            />

                        </div>
                        <div className="flex flex-col items-center">
                            <label className="text-lg w-[110%] pb-1 sm:w-full sm:text-xl pl-1">Left / Right </label>
                            <input
                                value={userX}
                                type="number" inputMode="numeric" placeholder="0"
                                className="border-2 rounded-tl-none shadow-[0px_3px_0px_0px_black] text-center lg:w-28 w-20 h-10 rounded-full border-black"
                                onChange={(e) => updateTextItemProperty(text.id, text.propName, "userX", e.target.value)}
                            />

                        </div>

                    </div>
                </div>

                : null}


            {activeTab === 5 && text && text ?
                <div className={clsx(
                    breit === "big" ? "grid grid-cols-2" :
                        breit === "middle" ? "grid grid-cols-2" :
                            breit === "small" ? "grid grid-cols-1" :
                                " grid grid-cols-2",
                    // "grid gap-6 pt-4 sm:pt-8 sm:gap-6 justify-center px-2 mx-2"
                )}>
                    <div className={clsx(
                         breit === "big" ? "" :
                         breit === "middle" ? "" :
                             breit === "small" ? "" :
                                 "col-span-1",
                        `flex justify-center gap-6
                        bg-red-200
                        `
                    )}
                    >

                        <label className="text-xl pl-1">
                            Decoration
                        </label>
                    </div>

                </div>

                : null}
        </div>

    )
}