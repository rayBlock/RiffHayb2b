'use client'

// import ReactAudioPlayer from 'react-audio-player';
// import { metadata } from '@/app/layout';
// import { Button } from '@/components/ui/button';
// import { TemplateProps } from '../../../../types/types';
// import { useUser } from '@clerk/nextjs';
// import { Divide, Fan, Music } from 'lucide-react';
// import { useState, type FC, ChangeEvent } from 'react';
// import { ScrollArea } from '@radix-ui/react-scroll-area';

// interface MusicDisplayProps {
//     musicPrompt: string
//     template: TemplateProps
// }
// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function MusicDisplay (
    // { musicPrompt, template }
    ) {
    // const [inputPrompt, setInputPrompt] = useState(musicPrompt)
    // const [genActive, setGenActive] = useState(false)
    // const [music, setMusic] = useState(template.metadata.Music_Replicate.audioReplicate);
    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(false)
    // const { user } = useUser()

    // const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    //     setInputPrompt(event.target.value);
    // };
    // const handleSubmit = async () => {
    //     setLoading(true)
    //     setGenActive(false)
    //     const response = await fetch("/api/replicate", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             inputPrompt: inputPrompt,
    //             userPublicMetaData: user?.publicMetadata,
    //             templateId: template.id,
    //             metadata: template.metadata
    //         }),
    //     });
    //     if (response.ok) {
    //         const data = await response.json(); // Assuming the server returns JSON data
    //         setMusic(data.url); // Extract the URL and update the state with it
    //         setLoading(false)
    //     } else {
    //         console.error('Error replicating:', response.statusText);
    //         // Handle error if needed
    //     }
    // };

    return (

        <div className='h-auto sm:h-full w-full z-20'>
            {/* <div className='flex justify-evenly gap-4 sm:h-32 rounded-md  shadow-md px-2 py-4 m-4 mt-2  items-center'>
                {!genActive ? <Button onClick={() => setGenActive(!genActive)} className='h-14 rounded-xl' variant={'default'}>
                    Generate Music with AI  </Button> :
                    <>
                        <Button onClick={() => setGenActive(!genActive)}>Abort</Button>
                        <div>This will cost 5 coins </div>
                    </>
                }


            </div>
            {genActive ? <div className="card relative w-full mx-2 my-4 flex justify-center ">
                <div className=' justify-center flex w-full  self-center  items-center   '>


                    <form onSubmit={handleSubmit}
                            className='  flex flex-col md:flex-row w-10/12 md:w-6/12'>





                    <textarea
                        className=" rounded relative w-10/12 sm:w-full h-40 sm:h-48 focus-visible:border-spacing-12 focus:outline-black focus:outline-offset-2 focus:outline-2  whitespace-pre-line bottom-0 border border-gray-300  shadow-xl p-2"
                        value={inputPrompt}
                        onChange={handleTextareaChange}
                        placeholder='Tell me about your Music idea or leave bla'
                    />
                    <button className='-bottom-16 sm:bottom-4 md:right-12 lg:right-[20vw] h-12 sm:h-16 absolute w-32 border-2 border-black text-black text-xl rounded-lg hover:bg-black hover:text-white active:bg-white active:text-black '
                        type="button" onClick={handleSubmit}>Send</button>
                </div>
            </div> : null}

            {music.length > 0 ? <div>hello</div> : <div>Create your own Music or choose from an existing file</div>
            }


            {loading === true ?
                (
                    <div className='flex 20 w-full justify-center'>


                        <div className='flex flex-col overflow-hidden gap-4 w-40 items-center'>
                            <Fan className='motion-safe:animate-spin text-black' />
                            <span className='animate-leftRightEndless text-black rounded-3xl text-xl'>loading</span>
                        </div>

                    </div>
                )

                : null
            }
            <ScrollArea className='grid grid-cols-2 mx-2 gap-y-4 overflow-y-scroll'>

                {template.metadata.Music_Replicate.audioReplicate.length ? template.metadata.Music_Replicate.audioReplicate.map((audioFile, i) => (
                    // <audio key={i}><source src={audioFile.url} />hmm</audio>
                    <div key={i} className='w-full  sm:w-10/12 justify-self-center flex justify-center items-center flex-col'>
                        <div className='px-4'>
                            <div className='bg-gray-300 rounded-lg w-24 h-32 flex justify-center items-center'>
                                <Music className='scale-[2.2]' />
                            </div>
                        </div>
                        <ReactAudioPlayer
                            className='scale-[0.8] sm:scale-[0.4] '
                            src={audioFile}
                            controls
                        />
                    </div>

                )) : null}
            </ScrollArea>



            <div>

            </div> */}

        </div>
    )
}
export default MusicDisplay;

