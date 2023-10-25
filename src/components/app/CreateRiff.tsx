
// import { useState } from 'react';
import { Layout } from './Layout';
import type { PrivacyLevel } from './utils';
import { useRequireActiveOrg } from '../propelauth';
import { trpc } from '../trpc';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export function CreateRiff() {


    const { hasSubscription } = useSubscriptions();
    // console.log(hasSubscription, "has subs ??")

    // const [duration, setDuration] = useState<number>(10)
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const createRiffMutation = trpc.remotion.createRiff.useMutation({
        onSettled: () => {
            queryClient.invalidateQueries(getQueryKey(trpc));
        },
        onSuccess: (riff_id) => {
            navigate(`/build/riff/${riff_id}`);
        },
    });

    return (

        <Layout title="Create your video"  >


            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setIsLoading(true)

                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const data: any = {
                        ...(Object.fromEntries(formData) as {
                            // title: string;
                            // description: string;
                            privacyLevel: PrivacyLevel;
                            duration: any,
                            orientation: string
                            prompt: string

                        }),
                        // tags:
                        //     formData
                        //         .get('tags')
                        //         ?.toString()
                        //         .split(',')
                        //         .map((x) => x.trim()) ?? [],
                    };

                    // const { submitter } = e.nativeEvent as any as { submitter: HTMLButtonElement };
                    if (data.prompt) {
                        createRiffMutation.mutate(data,);
                    }
                    else {
                        alert('You need to provide a prompt');
                        setIsLoading(false)
                    }
                    //     addPromptMutation.mutate(data);
                    // }
                }}
            >




                <div className='flex justify-end items-end flex-col w-full'>
                    <div className="mt-4 ml-4">
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="promptPrivacyLevel"
                        >
                            Visibility
                        </label>
                        <div className="mt-1 w-full">
                            <select
                                id="promptPrivacyLevel"
                                name="privacyLevel"
                                className="block rounded-md outline-none border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                defaultValue={hasSubscription ? "team" : "public"}
                            // onChange={(e) => {
                            //     const value = e.currentTarget.value as PrivacyLevel;
                            //     setNewIsPublic(value === 'public');
                            // }}
                            >
                                {hasSubscription ? <>
                                    <option value="public">Public </option>

                                    <option value="team">
                                        Team
                                    </option>
                                    <option value="private">Private</option>
                                </>
                                    : <option value="public">Public </option>}
                            </select>
                        </div>
                    </div>
                    <div className="mt-4">

                        <label
                            className=" hidden text-xl pl-2 pb-1 font-medium text-gray-700"
                            htmlFor="promptPrivacyLevel"
                        >
                            Duration
                        </label>
                        <select
                            name="duration"
                            className="rounded-md ring-0  outline-none shadow-[0px_0px_4px_0px_black] border border-gray-300 p-4 text-sm"
                            defaultValue={10}
                        >
                            <option>Select a duration</option>

                            <option value={10}>
                                10 seconds
                            </option>
                            {/* <option value={"15s"}>
                        15 seconds
                    </option> */}
                            <option value={20}>
                                20 seconds
                            </option>

                            <option value={30}>
                                30 seconds
                            </option>
                        </select>
                    </div >



                    <div className="mt-4">
                        <label
                            className="block text-xl pl-2 font-medium text-gray-700"

                        >
                            Orientation
                        </label>
                        <div className="mt-1 w-full">
                            <select

                                name="orientation"
                                className="block rounded-md outline-none shadow-md border border-gray-300 p-2  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                defaultValue={"Portrait"}
                            // onChange={(e) => {
                            //     const value = e.currentTarget.value as PrivacyLevel;
                            //     setNewIsPublic(value === 'public');
                            // }}
                            >
                                <option value="Portrait">Portrait </option>
                                {/* <option value="unlisted">
                                Unlisted (only people with the link can access it)
                            </option> */}
                                <option value="Square">
                                    Square
                                </option>
                                <option value="Landscape">Landscape</option>
                            </select>
                        </div>
                    </div>

                    <label
                        className="block text-2xl mt-8 font-medium text-gray-700"

                    >
                        What would you like to advertise ?
                    </label>
                    <textarea
                        name="prompt"
                        // ref={onMount}
                        // value={message.content}
                        // onChange={(e) => {
                        //     const newText = e.currentTarget.value;
                        //     setMessages((messages) => {
                        //         const key = getMessageKey(message);
                        //         const newMessages = structuredClone(messages);
                        //         const x = newMessages[index];
                        //         if (x) {
                        //             messageKeys.set(x, key); // to preserve the same key
                        //             x.content = newText;
                        //         }
                        //         return newMessages;
                        //     });
                        // }}
                        // onKeyDown={(e) => {
                        //     if (e.key === 'Enter' && e.metaKey) {
                        //         runPromptMutationNewMessage();
                        //     } else if (e.key === 'Backspace') {
                        //         if (e.currentTarget.value === '') {
                        //             const confirm = window.confirm(
                        //                 'Are you sure you want to delete this message?'
                        //             );
                        //             if (confirm) {
                        //                 setMessages((messages) => messages.filter((_, i) => i !== index));
                        //             }
                        //         }
                        //     }
                        // }}
                        className={clsx(

                            'block w-full md:w-4/5 mt-2 min-h-[10rem] outline-none resize-y overflow-y-scroll whitespace-pre-wrap rounded-md border border-gray-800 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        )}
                    ></textarea>





                    <button
                        disabled={isLoading}
                        className={clsx(
                            isLoading ?
                                'border-2 text-transparent -translate-y-1 shadow-[1px_2px_0px_0px_black] border-black p-4 outline-none mt-8'
                                :
                                'border-2 border-black shadow-[1px_4px_0px_0px_black] p-4 outline-none hover:bg-red-200 rounded-xl mt-8')}
                        type="submit" name="buttonsubmititi" >create </button>
                </div>
            </form>

        </Layout>
    )
}


function useSubscriptions() {
    const { activeOrg } = useRequireActiveOrg();
    const orgId = activeOrg?.orgId || '';
    const { data: subscriptions } = trpc.settings.getSubscriptions.useQuery(
        { orgId },
        { enabled: !!orgId }
    );
    const hasSubscription = subscriptions === undefined ? false : subscriptions.some((s) => s.active);

    return {
        hasSubscription,
    };
}