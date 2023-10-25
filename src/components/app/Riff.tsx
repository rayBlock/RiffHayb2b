

import { useParams } from 'react-router-dom';

// import type { PromptPrivacyLevel } from '../../lib/trpc/routers/prompts';
import { trpc } from '../trpc';

import { usePromptErrorPage } from './usePromptErrorPage';
// import { useRedirectToLoginPage } from './utils';
import { Player, type PlayerRef } from '@remotion/player';
import { RiffGarden } from '../../remotion/RiffGarden';

import { useReducer, useRef, type Dispatch } from 'react';
// import type { PromptPrivacyLevel } from '../../lib/trpc/routers/prompts';
import { RifferTimeLine } from '../editor/RifferTimeline';
import { SideBar } from '../editor/SideBar';

import { PlayButton } from '../editor/PlayButton';
import { propsReducer, type MainDataObject, type MainDataActionTypes, type UpdatePlayerDimension, type playerDimensions } from '../utils/propsReducer';
import { ColorsEditor } from '../editor/ColorsEditor';
import { menu }from '../editor/Menu';
import { useCurrentPlayerFrame } from '../utils/use-current-frame';
import { useCurrentRiff } from '../utils/use-current-riff';
import { positionReducer, type PositionDataObject, type PositionDataActionTypes, type UpdateOrientationAction } from '../utils/positionReducer';
import { ImagesEditor } from '../editor/ImagesEditor';
import { TextEditor } from '../editor/TextEditor';
import { BuilderLayout } from './BuilderLayout';
import clsx from 'clsx';
import { usePositionHandler } from '../utils/usePositionHandler';
import { TextEditorBase } from '../editor/TextEditorBase';

// import type { PromptPrivacyLevel } from '../../lib/trpc/routers/prompts';

export function Riff() {
	// const navigate = useNavigate();
	// const { redirectToLogin } = useRedirectToLoginPage();
	const { riffId } = useParams<{ riffId: string }>();
	// const trpcUtils = trpc.useContext();
	const riffQuery = trpc.remotion.getRiff.useQuery(
		{
			riffId: riffId!,
		},
		{
			enabled: !!riffId,
			staleTime: 1000,
			retry: (retry, error) => {
				return retry < 3 && !error.data?.code;
			},
		}
	);

	// const likeMutation = trpc.prompts.likePrompt.useMutation({
	// 	onError: (error) => {
	// 		if (error.data?.code === 'UNAUTHORIZED') {
	// 			redirectToLogin(window.location.pathname);
	// 		}
	// 	},
	// 	onSettled: () => {
	// 		trpcUtils?.remotion.getRiff.invalidate({ riffId });
	// 	},
	// });

	const errorPage = usePromptErrorPage(riffQuery.status, riffQuery.error?.data?.code);

	if (errorPage) {
		return errorPage;
	}

	const { data: riffQueryData } = riffQuery;
	// console.log(riffQueryData, "data all riff");

	const playerRef = useRef<PlayerRef>(null);


	// TODO TYPE... 
	const inputs: any = riffQueryData?.riff.inputs


	const { data, duration: initialDuration, inputs: propsDock, orientation } = inputs;

	interface DataItem {
		id: string;
		duration: number;
	}


	let dimWidth, dimHeight;

	if (orientation === 'Square') {
		dimWidth = dimHeight = 720;
	} else if (orientation === 'Portrait') {
		dimWidth = 720;
		dimHeight = 1280;
	} else if (orientation === 'Landscape') {
		dimWidth = 1280;
		dimHeight = 720;
	} else {

		dimWidth = dimHeight = 1280;
	}





	const extractedData: DataItem[] = data.map((entry: any) => ({
		id: entry.id,
		duration: entry.duration,
	}));

	// TIMEs for useCurrentRiff 
	const adjustedData: DataItem[] = extractedData.map((entry: DataItem, index: number, array: DataItem[]) => {
		if (index % 2 === 0) {
			if (index === 0 && array[1]) {
				// For the first item, subtract the duration of the second item
				return { ...entry, duration: entry.duration - array[1].duration! };
			} else if (index === array.length - 1 && array[index - 1]) {
				// For the last item, subtract the duration of the item before it
				return { ...entry, duration: entry.duration - array[index - 1]!.duration! };
			} else if (array[index - 1] && array[index + 1]) {
				// For other items, subtract the duration from the item before and after
				return {
					...entry,
					duration: entry.duration - array[index - 1]!.duration - array[index + 1]!.duration,
				};
			}
		}
		return entry;
	});

	const frame = useCurrentPlayerFrame(playerRef);

	const riffsTime = useCurrentRiff(adjustedData, frame)
	


	const mainWindowRef = useRef<HTMLDivElement | null>(null);
	// console.log(mainWindowRef.current?.clientWidth);
	
	const mainWindowWidth: number | undefined = mainWindowRef.current?.clientWidth

	// TODO init x & y with correct numbrs depending on window size ?
	// console.log(data, "data ?")
	const duration = parseInt(initialDuration);

	const initialReducerData = { data, propsDock, duration, orientation, playerHeight: dimHeight, playerWidth: dimWidth }
	const initialPositionData = { orientation, menu }

	const [redPropsState, redPropsActions]: [MainDataObject, Dispatch<MainDataActionTypes>] = useReducer(propsReducer, initialReducerData as any);
	
	const [positionState, positionActions]: [PositionDataObject, Dispatch<PositionDataActionTypes>] = useReducer(positionReducer, initialPositionData);
	// console.log(positionState);

	// const positionHandler = usePositionHandler({mainWindow: mainWindowWidth, propsState: redPropsState, positionState, positionActions})


	const updateDimensionProperty = (orientation: playerDimensions, playerWidth?: number, playerHeight?: number) => {
		const action: UpdatePlayerDimension = {
			type: 'UPDATE_PLAYER_DIMENSION',
			payload: {
				orientation,
				playerWidth,
				playerHeight,
			},
		};
		const actionPosition: UpdateOrientationAction = {
			type: 'UPDATE_ORIENTATION',
			payload: {
				value: orientation
			},
		};
		redPropsActions(action);
		positionActions(actionPosition)
	};
	// console.log(reduceState, "red state")

	const playerDuration = 30 * duration

	const ori = redPropsState.orientation




	const playerStyle = ori === "Portrait" ? "30vh" :
		ori === "Landscape" ? '80vh'
			: '45vh';






	// TODO when width and height for user 
	const timeLineWidth = mainWindowWidth && mainWindowWidth < 420 ? Math.round(mainWindowWidth * 0.7) : Math.round(mainWindowWidth! * 0.8);
	// console.log(timeLineWidth, "<-- TL width");





	return (
		<BuilderLayout>

			<main ref={mainWindowRef} className='flex flex-col h-screen relative'>

				{/* <img width={68} className='pt-2 hidden md:block pl-2 absolute' src="https://pub-7f331d131f5a4a8aad6b934de32e2296.r2.dev/imgs/00c3297c-ded0-4ba4-8d33-7ddb4bfd8e61.png" /> */}
				<div className='pt-2 sm:absolute sm:top-0 sm:bg-red-200 md:flex md:bg-transparent hidden '>
					<svg width="99" height="25" viewBox="0 0 99 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M11.26 19V6.04H16.615C16.741 6.04 16.903 6.046 17.101 6.058C17.299 6.064 17.482 6.082 17.65 6.112C18.4 6.226 19.018 6.475 19.504 6.859C19.996 7.243 20.359 7.729 20.593 8.317C20.833 8.899 20.953 9.547 20.953 10.261C20.953 11.317 20.686 12.226 20.152 12.988C19.618 13.744 18.799 14.212 17.695 14.392L16.768 14.473H13.429V19H11.26ZM18.703 19L16.147 13.726L18.352 13.24L21.16 19H18.703ZM13.429 12.448H16.525C16.645 12.448 16.78 12.442 16.93 12.43C17.08 12.418 17.218 12.394 17.344 12.358C17.704 12.268 17.986 12.109 18.19 11.881C18.4 11.653 18.547 11.395 18.631 11.107C18.721 10.819 18.766 10.537 18.766 10.261C18.766 9.985 18.721 9.703 18.631 9.415C18.547 9.121 18.4 8.86 18.19 8.632C17.986 8.404 17.704 8.245 17.344 8.155C17.218 8.119 17.08 8.098 16.93 8.092C16.78 8.08 16.645 8.074 16.525 8.074H13.429V12.448ZM28.6238 19.27C27.3278 19.27 26.2178 18.988 25.2938 18.424C24.3698 17.854 23.6588 17.062 23.1608 16.048C22.6688 15.034 22.4228 13.858 22.4228 12.52C22.4228 11.182 22.6688 10.006 23.1608 8.992C23.6588 7.978 24.3698 7.189 25.2938 6.625C26.2178 6.055 27.3278 5.77 28.6238 5.77C29.9198 5.77 31.0298 6.055 31.9538 6.625C32.8838 7.189 33.5948 7.978 34.0868 8.992C34.5848 10.006 34.8338 11.182 34.8338 12.52C34.8338 13.858 34.5848 15.034 34.0868 16.048C33.5948 17.062 32.8838 17.854 31.9538 18.424C31.0298 18.988 29.9198 19.27 28.6238 19.27ZM28.6238 17.227C29.4938 17.233 30.2168 17.041 30.7928 16.651C31.3748 16.261 31.8098 15.712 32.0978 15.004C32.3918 14.296 32.5388 13.468 32.5388 12.52C32.5388 11.572 32.3918 10.75 32.0978 10.054C31.8098 9.352 31.3748 8.806 30.7928 8.416C30.2168 8.026 29.4938 7.825 28.6238 7.813C27.7538 7.807 27.0308 7.999 26.4548 8.389C25.8788 8.779 25.4438 9.328 25.1498 10.036C24.8618 10.744 24.7178 11.572 24.7178 12.52C24.7178 13.468 24.8618 14.293 25.1498 14.995C25.4378 15.691 25.8698 16.234 26.4458 16.624C27.0278 17.014 27.7538 17.215 28.6238 17.227ZM36.6252 19V6.04H38.5782L43.0602 15.22L47.5422 6.04H49.4952V19H47.4702V10.693L43.4922 19H42.6282L38.6592 10.693V19H36.6252ZM52.0237 19V6.04H57.3787C57.5047 6.04 57.6667 6.046 57.8647 6.058C58.0627 6.064 58.2457 6.082 58.4137 6.112C59.1637 6.226 59.7817 6.475 60.2677 6.859C60.7597 7.243 61.1227 7.729 61.3567 8.317C61.5967 8.899 61.7167 9.547 61.7167 10.261C61.7167 11.317 61.4497 12.226 60.9157 12.988C60.3817 13.744 59.5627 14.212 58.4587 14.392L57.5317 14.473H54.1927V19H52.0237ZM59.4667 19L56.9107 13.726L59.1157 13.24L61.9237 19H59.4667ZM54.1927 12.448H57.2887C57.4087 12.448 57.5437 12.442 57.6937 12.43C57.8437 12.418 57.9817 12.394 58.1077 12.358C58.4677 12.268 58.7497 12.109 58.9537 11.881C59.1637 11.653 59.3107 11.395 59.3947 11.107C59.4847 10.819 59.5297 10.537 59.5297 10.261C59.5297 9.985 59.4847 9.703 59.3947 9.415C59.3107 9.121 59.1637 8.86 58.9537 8.632C58.7497 8.404 58.4677 8.245 58.1077 8.155C57.9817 8.119 57.8437 8.098 57.6937 8.092C57.5437 8.08 57.4087 8.074 57.2887 8.074H54.1927V12.448ZM64.0865 19V6.04H66.2555V19H64.0865ZM68.9514 19V6.04H76.7544V8.209H71.1204V11.44H75.6744V13.6H71.1204V19H68.9514Z" fill="#252E48" />
						<circle cx="85.5" cy="12.5" r="3.5" fill="#252E48" />
					</svg>

				</div>
				<div className='absolute sm:flex hidden flex-col right-2'>

					<select
						id="playerSize"
						className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 sm:text-sm"
						value={ori}
						// disabled={updatePromptMutation.isLoading}
						onChange={(e) => {
							let dimWidth, dimHeight;

							if (e.target.value === 'Square') {
								dimWidth = dimHeight = 720;
							} else if (e.target.value === 'Portrait') {
								dimWidth = 720;
								dimHeight = 1280;
							} else if (e.target.value === 'Landscape') {
								dimWidth = 1280;
								dimHeight = 720;
							} else {

								dimWidth = dimHeight = 720;
							}

							updateDimensionProperty(e.target.value as playerDimensions, dimWidth, dimHeight)
						}}
					>
						<option value="Landscape">16 / 9</option>
						<option value="Square">1 / 1</option>
						<option value="Portrait">9 / 16</option>
						<option value="custom">custom</option>

					</select>

					<div className={clsx(ori && ori === "custom" ? "flex" : "hidden")}>

						<input
							className='w-20 p-2 text-center'
							onChange={(e) =>
								updateDimensionProperty("custom", parseInt(e.target.value), redPropsState.playerHeight,)}
							type='text' inputMode='numeric' id='1' value={`${redPropsState.playerWidth} px`} />
						<input
							className='w-20 p-2 text-center'
							onChange={(e) =>
								updateDimensionProperty("custom", redPropsState.playerWidth, parseInt(e.target.value))}
							type='text' id='1' value={`${redPropsState.playerHeight} px`} />

					</div>

					{/* <button >{playerSizeCustom}</button> */}

					{/* <button >hello</button>
					<button >hello</button>
					<button >hello</button>
					<button >hello</button> */}

				</div>


				<SideBar playerRef={playerRef} propsData={positionState} propsAction={positionActions} />
				<ImagesEditor currentRiff={riffsTime} mainWindow={mainWindowWidth} propsState={redPropsState} propsActions={redPropsActions} positionData={positionState} positionAction={positionActions} />
				<TextEditor currentRiff={riffsTime} mainWindow={mainWindowWidth} propsState={redPropsState} propsActions={redPropsActions} positionData={positionState} positionAction={positionActions} />
				<ColorsEditor currentRiff={riffsTime} mainWindow={mainWindowWidth} propsState={redPropsState} propsActions={redPropsActions} positionData={positionState} positionAction={positionActions} />
				<div className='flex justify-center  gap-4 sm:pt-4'>
					<Player
						ref={playerRef}
						component={RiffGarden}
						inputProps={redPropsState as any}
						durationInFrames={playerDuration}
						fps={30}
						compositionHeight={redPropsState.playerHeight || 720}
						compositionWidth={redPropsState.playerWidth || 720}
						style={{ width: playerStyle }}
						autoPlay
						loop
					// controls
					/>

					{/* <div className='w-1/2 text-right'>{JSON.stringify(data?.riff.inputs)}</div> */}
				</div>
				<PlayButton
					yPosition={20}
					scale="scale-125"
					playerRef={playerRef}
					hiddenProp="lg:flex hidden"
				//  playing={true}
				/>
				<div className='flex justify-center items-center'>
					<RifferTimeLine tlWidth={timeLineWidth} mainWindow={mainWindowWidth} riffsTime={riffsTime} totalFrames={playerDuration} playerRef={playerRef} inputs={inputs as any} />
				</div>
				{/* <div className='pt-4 border border-black mt-2 h-[333px] z-0 px-4 mx-4'>hello 
					?from the riff section itself
				</div> */}
				<TextEditorBase currentRiff={riffsTime} mainWindow={mainWindowWidth} propsState={redPropsState} propsActions={redPropsActions} />
			</main>
		</BuilderLayout>

	);
}

// const LikesText = ({ data }: { data: { likes: number; myLike: boolean } | undefined }) => {
// 	const likes = data?.likes || 0;
// 	const withoutMyLike = likes - (data?.myLike ? 1 : 0);
// 	const showCounter = withoutMyLike > 0;
// 	return (
// 		<span className="flex">
// 			<span aria-label="likes ">{data?.myLike ? '❤️' : '🤍'}</span>
// 			<span className={clsx(showCounter ? '' : 'opacity-0', '-mr-6 min-w-[2.5rem] px-2')}>
// 				{likes}
// 			</span>
// 		</span>
// 	);
// };

// export const JsonSnippet = ({ messages }: { messages: Message[] }) => {
// 	const json = JSON.stringify(resolveTemplates(messages));

// 	return <code className="rounded bg-gray-800 p-2 text-xs text-white">{json}</code>;
// };

// const focus = (el: Element | undefined | null) => {
// 	if (el && el instanceof HTMLElement) {
// 		el.focus();
// 	}
// };


// const SimpleModalButton = ({
// 	className,
// 	title = 'Share',
// 	children,
// }: {
// 	className?: string;
// 	title?: string;
// 	children: React.ReactNode;
// }) => {
// 	const modalRef = useRef<HTMLDivElement | null>(null);
// 	const [isModalOpen, setIsModalOpen] = useState(false);
// 	const focusRef = useRef<Element | null>(null);
// 	useEffect(() => {
// 		if (isModalOpen) {
// 			focusRef.current = document.activeElement;
// 			document.body.style.overflow = 'hidden';
// 		} else {
// 			// try to restore focus to the last focused element
// 			focus(focusRef.current);
// 			document.body.style.overflow = 'unset';
// 		}
// 		const handleKeyDown = (e: KeyboardEvent) => {
// 			if (e.key === 'Escape') {
// 				setIsModalOpen(false);
// 			}
// 			const isTabPressed = e.key === 'Tab';
// 			if (isTabPressed) {
// 				// add all the elements inside modal which you want to make focusable
// 				const focusableElements =
// 					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
// 				const focusableContent = modalRef.current?.querySelectorAll(focusableElements);
// 				if (e.shiftKey) {
// 					// shift + tab wraps focus to end if you're on first element
// 					if (document.activeElement === focusableContent?.[0]) {
// 						e.preventDefault();
// 						focus(focusableContent?.[focusableContent.length - 1]);
// 					}
// 				} else {
// 					// tab wraps focus to start if you're on last element
// 					if (document.activeElement === focusableContent?.[focusableContent.length - 1]) {
// 						e.preventDefault();
// 						focus(focusableContent?.[0]);
// 					}
// 				}
// 				let focusedOutside = false;
// 				focusableContent?.forEach((el) => {
// 					focusedOutside = focusedOutside || el === document.activeElement;
// 				});
// 				console.log('focusedOutside', focusedOutside, document.activeElement);
// 				return;
// 			}
// 		};
// 		document.addEventListener('keydown', handleKeyDown);
// 		return () => {
// 			document.removeEventListener('keydown', handleKeyDown);
// 		};
// 	}, [isModalOpen]);

// 	return (
// 		<>
// 			<button className={className} onClick={() => setIsModalOpen((x) => !x)}>
// 				{title}
// 			</button>
// 			<div
// 				ref={modalRef}
// 				onClick={() => setIsModalOpen(false)}
// 				className={clsx(
// 					'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50',
// 					isModalOpen ? 'flex' : 'hidden'
// 				)}
// 			>
// 				<div
// 					className="mx-auto max-h-[90vh] max-w-lg overflow-auto rounded bg-white p-6 shadow-lg"
// 					onClick={(e) => e.stopPropagation()}
// 				>
// 					{children}
// 					<button
// 						onClick={() => setIsModalOpen(false)}
// 						className="rounded bg-red-500 px-4 py-2 text-white"
// 					>
// 						Close
// 					</button>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// const ShareDialog = ({ response }: { response: RouterOutput['prompts']['getPrompt'] }) => {
// 	const promptData = response.prompt;
// 	const trpcUtils = trpc.useContext();
// 	// const updatePromptMutation = trpc.prompts.updatePrompt.useMutation({
// 	// 	onSettled: async () => {
// 	// 		await trpcUtils.remotion.getRiff.invalidate({ riffId: riff });
// 	// 	},
// 	// });

// 	// const privacyLevel = updatePromptMutation.variables?.privacyLevel || promptData.privacyLevel;
// 	return (
// 		<>
// 			<h1 className="mb-4 text-2xl font-bold">Share this prompt with your friends</h1>
// 			<div className="mt-4">
// 				<label className="block text-sm font-medium text-gray-700" htmlFor="promptPrivacyLevel">
// 					Visibility
// 				</label>
// 				<div className="mt-1 w-full">
// 					{/* <select
// 						id="promptPrivacyLevel"
// 						className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 sm:text-sm"
// 						value={privacyLevel}
// 						disabled={updatePromptMutation.isLoading}
// 						onChange={(e) => {
// 							updatePromptMutation.mutate({
// 								riffId: promptData.riffId,
// 								privacyLevel: e.target.value as PromptPrivacyLevel,
// 								title: promptData.title,
// 								description: promptData.description,
// 								tags: promptData.tags,
// 								template: promptData.template,
// 							});
// 						}}
// 					>
// 						<option value="public">Public</option>
// 						<option value="unlisted">Unlisted (only people with the link can access it)</option>
// 						<option value="team">Team (only members of your organization can access it)</option>
// 						<option value="private">Private (only you can access it)</option>
// 					</select> */}
// 				</div>
// 			</div>
// 			{/* {(privacyLevel === 'public' || privacyLevel === 'unlisted') && (
// 				<div className="mt-4">
// 					<label className="block text-sm font-medium text-gray-700" htmlFor="shareUrl">
// 						Public URL ({privacyLevel === 'unlisted' ? 'not ' : ''}indexed by Google)
// 					</label>
// 					<div className="mt-1 flex flex-row gap-4">
// 						<input
// 							id="shareUrl"
// 							className="w-full rounded border p-2"
// 							type="text"
// 							value={response.publicUrl}
// 							readOnly
// 						/>
// 						<button
// 							className="rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700"
// 							onClick={() => {
// 								navigator.clipboard.writeText(response.publicUrl);
// 							}}
// 						>
// 							Copy
// 						</button>
// 					</div>
// 				</div>
// 			)} */}
// 			<div className="mt-4">
// 				{/* <label className="block text-sm font-medium text-gray-700" htmlFor="promptUrl">
// 					Prompt URL{' '}
// 					{privacyLevel === 'team' || privacyLevel === 'public'
// 						? '(for you and your team)'
// 						: '(for you)'}
// 				</label> */}
// 				<div className="mt-1 flex flex-row gap-4">
// 					<input
// 						id="promptUrl"
// 						className="w-full rounded border p-2"
// 						type="text"
// 						value={response.shareUrl}
// 						readOnly
// 					/>
// 					<button
// 						className="rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700"
// 						onClick={() => {
// 							navigator.clipboard.writeText(response.shareUrl);
// 						}}
// 					>
// 						Copy
// 					</button>
// 				</div>
// 			</div>
// 			{/* {updatePromptMutation.error && (
// 				<div className="mt-4">
// 					<p className="text-red-500">{updatePromptMutation.error.message}</p>
// 				</div>
// 			)} */}
// 			<br />
// 		</>
// 	);
// };
