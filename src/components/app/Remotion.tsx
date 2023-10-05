
import { useState } from 'react';
// import { JinjasMotion } from '../remotion/RIFFS/Jinjas/Jinjas';
import { trpc } from '../trpc';
import { Layout } from './Layout';
import { Player } from '@remotion/player'

import { RiffGarden, type riffInput } from '../../remotion/RiffGarden';
import { AnfaMotion } from '../../remotion/RIFFS/Anfa/Anfa';

// import {  useRedirectToLoginPage } from './utils';

export function Remotion() {
	// const navigate = useNavigate();
	// const { redirectToLogin } = useRedirectToLoginPage();

	const [state, setState] = useState<any>()
	// const trpcUtils = trpc.useContext();

	const renderMutation = trpc.render.render.useMutation({
		// onSettled: () => {
		// 	queryClient.invalidateQueries(getQueryKey(trpc.prompts.getPrompts));
		// },
		onSuccess: (promptId) => {
			setState(promptId);
			// setTimeout(() => setSaved((x) => (x === promptId ? undefined : x)), 500);
		},
	});

	const weaverMutation = trpc.render.riffWeaver.useMutation({
		// onSettled: () => {
		// 	queryClient.invalidateQueries(getQueryKey(trpc.prompts.getPrompts));
		// },
		onSuccess: (promptId) => {
			console.log(promptId, "<-  weaver success output")
			setState(promptId);
			// setTimeout(() => setSaved((x) => (x === promptId ? undefined : x)), 500);
		},
	});

	const inputProps: riffInput = {
		
		data:[
		{duration: 100, comp: 0, props: {shortS:{text:"hello world", fs:20}, name:"textname", more:"some"}},
		{duration: 50, comp: 2, props: {different:"some", name:"textname",}},
		{duration: 100, comp: 1, props: {shortS:{text:" some world"}, name:"textname", more:"some"}},
		{duration: 30, comp: 3, props: {differentElse:"some", name:"diff", more:"foo"}},
		{duration: 100, comp: 0, props: {shortS:{text:" some world 2", fs:33}, name:"textname", more:"some"}},
		{duration: 20, comp: 4, props: {different:"diff", name:"divi", more:"some"}},
		{duration: 100, comp: 1, props: {shortS:"some", name:"textname", more:"some"}},

	]}


	// 	sequenceData: [
	// 		{duration: 100, comp: <JinjasMotion/>, from:10},
	// 		{duration: 100, comp: <LilyMotion/>, from:10},
	// 		{duration: 100, comp: <PikarMotion/>, from:10}


	// 	],
	// 	transitionData: [
	// 		{type:'circularWipe', duration:20, },
	// 		{type:'pan', duration:20, },
	// 		{type:'fadeThroughColor', duration:20, },
	
	// ]
	

	return (
		<Layout>
			{state ? <span className='text-white'>

					{JSON.stringify(state)}

				</span>
					: "null"}
			<div className="flex items-center gap-4 sm:flex-row ">
				
				<Player
					component={AnfaMotion}
					 inputProps={{shortS:{text:"hello world", fs:20},
					 image1: "https://images.unsplash.com/photo-1659465081408-ca96af85e91e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2848&q=80",
					  name:"textname", more:"some"}}
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

				<form onSubmit={(e) => {
					e.preventDefault();
					const form = e.currentTarget;
					const formData = new FormData(form);
					const data = {
						...(Object.fromEntries(formData) as {
							title: string;

						})
					}
					// console.log(data, "formdata");
					renderMutation.mutate(data);
					weaverMutation.mutate({ duration: 10 })
					return;
				}}>
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
								defaultValue={"promptName"}
							/>
						</div>
					</div>

					<button className='text-white border-lime-300 border-2 px-8 py-4'>btn</button>
				</form>
			</div>
		</Layout>
	);
}
