'use client'








// type MediaDisplayProps = {
//     ai_images: Array<any>; // Replace 'any' with the appropriate type of elements in array1
//     pexel_Images: Array<any>; // Replace 'any' with the appropriate type of elements in array2
//     width: number
//     height: number
// };

export function MediaDisplay (){




    return (
        <div className='h-screen w-full z-10'>
            {/* <div className='flex justify-evenly gap-4 rounded-md  shadow-md px-2 py-4 m-4 mt-2  items-center'>
                <Button className='h-14 rounded-xl' variant={'default'}>Generate Images with AI</Button>

                <Button className='rounded-full ' variant={'icon'} size={'icon'}>
                    <div className='flex flex-col items-center justify-center'>
                        <UploadCloud className='text-white scale-90 -mt-2' />
                        <span className='text-white' style={{ fontSize: '8px' }}>
                            Upload
                        </span>
                    </div>

                </Button>

            </div> */}
            <div className=' bg-gray-100 m-4 mb-4 rounded-md mt-1 pb-1'>
                <div className='pl-4 pt-2 text-xl'>Media from the template</div>
                <div className='grid grid-cols-3 mx-2 my-4 gap-2 items-center justify-items-center h-full '>


                    {/* TODO show the current used Images ...     show the delete button only on selected ? */}
                    {/* {ai_images.map((image: any, i: number) => {
                        return (
                            <div key={i} className='relative'>
                                <div className='rounded-lg group flex justify-center items-center -right-1 text-black -top-1 h-8 w-8 bg-gray-100 opacity-75 hover:opacity-100 hover:bg-black hover:border-black border border-gray-200 absolute'>
                                </div>
                                <Image key={i} className='rounded-md ' width={width / 2} height={height / 2} src={image} alt="somet" />
                            </div>

                        );
                    })} */}

                </div>
            </div>

            <div className='flex-grow overflow-y-scroll'>
                {/* <Tabs defaultValue="media" className="w-full">
                    <TabsList className='flex group justify-evenly pb-2 items-center gap-2 text-2xl'>
                        <TabsTrigger className={"  data-act:shadow-[0_17px_7px_-10px_rgba(0,0,0,5)]  mx-4 data-act:text-black ring-0 outline-none hover:text-black text-gray-600  w-full"} value="ai">AI</TabsTrigger>
                        <TabsTrigger className={" data-act:shadow-[0_17px_7px_-10px_rgba(0,0,0,5)]  mx-4 data-act:text-black ring-0 outline-none hover:text-black text-gray-600 w-full"} value="media">Media</TabsTrigger>
                        <TabsTrigger className={"  data-act:shadow-[0_17px_7px_-10px_rgba(0,0,0,5)]  mx-4 data-act:text-black ring-0 outline-none hover:text-black text-gray-600  w-full"} value="myMedia">My Media</TabsTrigger>
                    </TabsList>
                    <TabsContent className='active:border-black' value="ai">
                        <div className='grid grid-cols-2 gap-2 mb-2 mx-2 pt-4  '>
                            {ai_images.map((aiImage: string, i: number) => (
                                <div key={i}>

                                    <Image style={{}} width={width} height={height} src={aiImage} alt="somet" />
                                </div>
                            ))}
                        </div>


                    </TabsContent>
                    <TabsContent value="media" className='pt-4 h-auto'>



                        <ScrollArea className='flex flex-col align-middle content-center items-center justify-items-center w-full gap-x-2 h-full overflow-y-scroll'>



                            <div className='grid grid-cols-2 gap-2 px-2'>

                                {pexel_Images.map((image: any, i: number) => (
                                    <div key={i} >

                                        <Image className='rounded-lg' width={width} height={height} src={`${image.modifiedUrl}h=${height}&w=${width}`} alt="somet" />
                                    </div>

                                ))}
                            </div>

                        </ScrollArea>


                    </TabsContent>
                    <TabsContent className='active:border-black' value="myMedia">
                        No Media yet


                    </TabsContent>
                </Tabs> */}
            </div>

        </div >
    );
};