import { Player } from '@remotion/player';
import { useState } from 'react';


// import { AnfaMotion } from '../../remotion/RIFFS/Anfa/Anfa';
import { trpc } from '../trpc';
import { Layout } from './Layout';
import { RiffGarden, type riffInput } from '../../remotion/RiffGarden';

// import {  useRedirectToLoginPage } from './utils';

export function Remotion() {
	// const navigate = useNavigate();
	// const { redirectToLogin } = useRedirectToLoginPage();

	const [state, setState] = useState<any>();
	// const trpcUtils = trpc.useContext();

	const renderMutation = trpc.remotion.render.useMutation({
		// onSettled: () => {
		// 	queryClient.invalidateQueries(getQueryKey(trpc.prompts.getPrompts));
		// },
		onSuccess: (promptId) => {
			setState(promptId);
			// setTimeout(() => setSaved((x) => (x === promptId ? undefined : x)), 500);
		},
	});


	const inputProps: riffInput = {
		data: [
			{
				duration: 120,
				comp: 0,
				props: {vide: "https://player.vimeo.com/external/542127392.hd.mp4?s=cd9b2e359c1af1f8e1e3b48215f387e49d0cf8ba&profile_id=175&oauth2_token_id=57447761",color1: "white", sText: { text: 'hello world', fs: 20 }, name: 'textname', more: 'some', img: "https://plus.unsplash.com/premium_photo-1673721701740-20630b552a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80" },
			},
			{ duration: 30, comp: 4, props: { direction:"open", angle:40, different: 'some', name: 'textname' } },
			{
				duration: 116,
				comp: 1,
				props: {vide: "https://player.vimeo.com/external/542127392.hd.mp4?s=cd9b2e359c1af1f8e1e3b48215f387e49d0cf8ba&profile_id=175&oauth2_token_id=57447761",color1: "lime", sText: { text: ' some world' }, name: 'textname', more: 'some', img: "https://images.unsplash.com/photo-1696172686863-c51dae18bbfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80" },
			},
			{ duration: 30, comp: 4, props: {direction:"close", angle:40, differentElse: 'some', name: 'diff'} },
			{
				duration: 124,
				comp: 0,
				props: {vide: "https://player.vimeo.com/external/542127392.hd.mp4?s=cd9b2e359c1af1f8e1e3b48215f387e49d0cf8ba&profile_id=175&oauth2_token_id=57447761",color1: "orange", sText: { text: ' some world 2', fs: 33 }, name: 'textname', more: 'some', img: "https://plus.unsplash.com/premium_photo-1673913967398-4811ffe30d39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80" },
			},	
		],
	};


	return (
		<Layout>
			{state ? <span className="text-white">{JSON.stringify(state)}</span> : null}
			<div className="flex items-center justify-center gap-4 sm:flex-row ">
				<Player
					component={RiffGarden}
					inputProps={state ? state : inputProps}
					durationInFrames={300}
					fps={30}
					compositionHeight={640 * 0.8}
					compositionWidth={360 * 0.8}
					// style={}
					spaceKeyToPlayOrPause
					// clickToPlay={false}
					controls
					autoPlay
					loop
				/>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						const form = e.currentTarget;
						const formData = new FormData(form);
						const data = {
							...(Object.fromEntries(formData) as {
								title: string;
							}),
						};
						// console.log(data, "formdata");
						renderMutation.mutate(data);
						// weaverMutation.mutate({ duration: '10', prompt: "hello", privacyLevel: "public" });
						return;
					}}
				>
					<div className="mt-4">
						<label className="block text-sm font-medium text-gray-700" htmlFor="promptName">
							Name
						</label>
						<div className="mt-1 w-full">
							<input
								type="text"
								name="title"
								id="promptName"
								className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								placeholder="Prompt name"
								defaultValue={'promptName'}
							/>
						</div>
					</div>

					<button className="text-white border-lime-300 border-2 px-8 py-4">btn</button>
				</form>
			</div>
		</Layout>
	);
}
