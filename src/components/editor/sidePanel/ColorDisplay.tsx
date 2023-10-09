'use client'


// import { ScrollArea } from '@radix-ui/react-scroll-area';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
// import { BadgeX, Loader, Pen, UploadCloud } from 'lucide-react';
// import Image from 'next/image'

// import { SketchPicker, } from 'react-color'

// import { useReducer } from 'react';
// import { ColorPicker, useColor } from 'react-color-palette';


// type State = {
//     selectedRiff: number;
// };

// // Define the type for your action
// type Action = {
//     type: string;
//     payload: number; // Assuming payload is a number representing the index
// };

// const reducer = (state: State, action: Action): State => {
//     switch (action.type) {
//         case 'SELECT_RIFF':
//             return { ...state, selectedRiff: action.payload };
//         default:
//             return state;
//     }
// };

// type ColorDisplayProps = {
//     ai_images: Array<any>; // Replace 'any' with the appropriate type of elements in array1
//     pexel_Images: Array<any>; // Replace 'any' with the appropriate type of elements in array2
//     width: number
//     height: number
// };

export function ColorDisplay() {

    // TODO: feed the current Riff from Remotion Context
    // const [state, dispatch] = useReducer(reducer, { selectedRiff: 0 });
    // const [color, setColor] = useColor("hex", "#121212");




    // const handleRiffClick = (index: number) => {
    //     if (index === state.selectedRiff) { return }
    //     else if (index === 100) {
    //         dispatch({ type: 'SELECT_RIFF', payload: index });

    //     }
    //     else {
    //         dispatch({ type: 'SELECT_RIFF', payload: index });


    //     }
    // };

    return (
        <div className='h-full w-full  z-10'>
            {/* <div className='flex justify-evenly gap-4 rounded-md  shadow-md px-2 py-4 m-4 mt-2  items-center'>

                <Button className='group rounded-xl w-24 ' variant={'icon'} size={'icon'}>
                    <div className='flex flex-col items-center justify-center'>
                    <Loader className='text-white mb-2 group-hover:text-red-200' />
                        <span className='text-white group-hover:text-red-200' style={{ fontSize: '8px' }}>
                            Random
                        </span>
                    </div>

                </Button>

            </div> */}
            <div className=' bg-gray-100 m-4 mb-4 flex justify-center rounded-md mt-1 pb-1'>
                <div className='inline-grid grid-flow-col-dense mx-2 my-4 gap-2 items-center justify-items-center h-full '>


                    {/* TODO show the current used Images ...     show the delete button only on selected ? */}
                    {/* {ai_images.map((image: any, i: number) => {
                        return (
                            <div key={i} className={state.selectedRiff === i ?
                                cn(`relative w-full shadow-[0_14px_6px_-6px_rgba(0,0,0,5)]  shadow-red-200`) : cn("relative")}


                                onClick={() => handleRiffClick(i)}>
                                <div className={cn("h-20 w-20 bg-no-repeat bg-cover bg-center bg-[url('https://firebasestorage.googleapis.com/v0/b/rayriffs-420.appspot.com/o/ai-images%2F003ccb17-8184-49b6-9dd7-739e63138fea.jpg?alt=media&token=3aab7430-c43b-4163-b2c7-265e88f1dcb4')]")} />
                            </div>

                        );
                    })} */}

                </div>
            </div>

            <div>

                {/* <SketchPicker
                    color={color}
                    onChange={handleChangeComplete} /> */}




                {/* 
                <ColorPicker width={456} height={228}
                    color={color}
                    onChange={setColor} dark />; */}




                {/* <Tabs defaultValue="media" className="w-full">
                    <TabsList className='flex group justify-evenly pb-2 items-center gap-4 text-2xl'>
                        <TabsTrigger className={" data-act:shadow-[0_16px_7px_-10px_rgba(0,0,0,5)]  mx-12 data-act:text-black ring-0 outline-none hover:text-black text-gray-600 w-full"} value="media">Media</TabsTrigger>
                        <TabsTrigger className={"  data-act:shadow-[0_16px_7px_-10px_rgba(0,0,0,5)]  mx-12 data-act:text-black ring-0 outline-none hover:text-black text-gray-600  w-full"} value="myMedia">My media</TabsTrigger>
                    </TabsList>
                    <TabsContent value="media" className='pt-4 h-full'>





                    </TabsContent>
                    <TabsContent className='active:border-black' value="myMedia">
                        No Colors yet


                    </TabsContent>
                </Tabs> */}
            </div>

        </div >
    );
};
