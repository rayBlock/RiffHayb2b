

import { useParams } from 'react-router-dom';

// import type { PromptPrivacyLevel } from '../../lib/trpc/routers/prompts';
import { trpc } from '../trpc';

import { usePromptErrorPage } from './usePromptErrorPage';
// import { useRedirectToLoginPage } from './utils';
import { Player, type PlayerRef } from '@remotion/player';
import { RiffGarden } from '../../remotion/RiffGarden';

import { useRef } from 'react';
// import type { PromptPrivacyLevel } from '../../lib/trpc/routers/prompts';
import { RifferTimeLine } from '../editor/RifferTimeline';

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

	const data = riffQuery.data;
	const playerRef = useRef<PlayerRef>(null);


	return (

		<main className='flex flex-col justify-center items-center'>

			<div className='flex justify-center  gap-4'>
				{/* <RiffEditor data={data} ref={playerRef} /> */}
				<Player
					ref={playerRef}
					component={RiffGarden}
					inputProps={data?.riff.inputs as any}
					durationInFrames={300}
					fps={30}
					compositionHeight={1280}
					compositionWidth={720}
					style={{ width: '280px' }}
					autoPlay
					loop
				/>

				{/* <div className='w-1/2 text-right'>{JSON.stringify(data?.riff.inputs)}</div> */}
			</div>
			<div className=''>
				<RifferTimeLine playerRef={playerRef} />
			</div>
		</main>

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
// 	const updatePromptMutation = trpc.prompts.updatePrompt.useMutation({
// 		onSettled: async () => {
// 			await trpcUtils.prompts.getPrompt.invalidate({ riffId: promptData.riffId });
// 		},
// 	});

// 	const privacyLevel = updatePromptMutation.variables?.privacyLevel || promptData.privacyLevel;
// 	return (
// 		<>
// 			<h1 className="mb-4 text-2xl font-bold">Share this prompt with your friends</h1>
// 			<div className="mt-4">
// 				<label className="block text-sm font-medium text-gray-700" htmlFor="promptPrivacyLevel">
// 					Visibility
// 				</label>
// 				<div className="mt-1 w-full">
// 					<select
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
// 					</select>
// 				</div>
// 			</div>
// 			{(privacyLevel === 'public' || privacyLevel === 'unlisted') && (
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
// 			)}
// 			<div className="mt-4">
// 				<label className="block text-sm font-medium text-gray-700" htmlFor="promptUrl">
// 					Prompt URL{' '}
// 					{privacyLevel === 'team' || privacyLevel === 'public'
// 						? '(for you and your team)'
// 						: '(for you)'}
// 				</label>
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
// 			{updatePromptMutation.error && (
// 				<div className="mt-4">
// 					<p className="text-red-500">{updatePromptMutation.error.message}</p>
// 				</div>
// 			)}
// 			<br />
// 		</>
// 	);
// };