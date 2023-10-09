import type { QueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Outlet, type RouteObject } from 'react-router-dom';

import { env } from '../../config';
import type { Helpers } from '../../lib/trpc/root';
import { AuthSync } from '../AuthSync';
import { FullPageSupport } from '../fogbender/Support';
import { AuthProvider } from '../propelauth';
import type { RouterUtils } from '../trpc';
import { App } from './App';
import { CreatePrompt } from './CreatePrompt';
import { CreateRiff } from './CreateRiff';
import { EditPrompt } from './EditPrompt';
import { AppNav } from './Nav';
import { Prompt } from './Prompt';
import { Prompts } from './Prompts';
import { Remotion } from './Remotion';
import { Settings } from './Settings';
import { propelAuthAtom } from './store';
import { Riff } from './Riff';

export const routes: RemixBrowserContext & RouteObject[] = [
	{
		path: '/prompts/:promptId',
		loader: async ({ params }) => {
			const promptId = params.promptId;
			if (promptId) {
				// pre-fetch in SSR is done oustide of the loader in .astro file
				// pre-fetch in browser
				await routes.trpcUtils?.prompts.getPrompt.ensureData({ promptId }).catch(() => { });
			}
			return null;
		},
		Component() {
			return <Prompt />;
		},
	},
	{
		path: '/app',
		Component() {
			const key = useAtomValue(propelAuthAtom);
			return (
				<AuthProvider key={key} authUrl={env.PUBLIC_AUTH_URL}>
					<AuthSync />
					<AppNav />
					<Outlet />
					{/* <SupportWidget kind="floatie" /> */}
				</AuthProvider>
			);
		},
		children: [
			{
				index: true,
				Component() {
					return <App />;
				},
			},
			{
				path: '/app/prompts',
				loader: async ({ context }) => {
					// pre-fetch in SSR
					await context?.helpers.prompts.getPrompts.prefetch({});
					// pre-fetch in browser
					await routes.trpcUtils?.prompts.getPrompts.ensureData({}).catch(() => { });
					return null;
				},
				Component() {
					return <Prompts />;
				},
			},
			{
				path: '/app/riff/:riffId',
				loader: async ({ context, params }) => {
					const riffId = params.riffId;
					if (riffId) {
						// pre-fetch in SSR
						await context?.helpers.remotion.getRiff.prefetch({ riffId });
						// pre-fetch in browser
						await routes.trpcUtils?.remotion.getRiff.ensureData({ riffId }).catch(() => { });
					}
					return null;
				},
				Component() {
					return <Riff />;
				},
			},
			{
				path: '/app/prompts/:promptId',
				loader: async ({ context, params }) => {
					const promptId = params.promptId;
					if (promptId) {
						// pre-fetch in SSR
						await context?.helpers.prompts.getPrompt.prefetch({ promptId });
						// pre-fetch in browser
						await routes.trpcUtils?.prompts.getPrompt.ensureData({ promptId }).catch(() => { });
					}
					return null;
				},
				Component() {
					return <Prompt />;
				},
			},
			{
				path: '/app/remotion',
				Component() {
					return <Remotion />;
				},
			},
			
			{
				path: '/app/prompts/:promptId/edit',
				Component() {
					return <EditPrompt />;
				},
			},
			{
				path: '/app/prompts/create',
				Component() {
					return <CreatePrompt />;
				},
			},
			{
				path: '/app/settings',
				Component() {
					return <Settings />;
				},
			},
			{
				path: '/app/support',
				Component() {
					return <FullPageSupport />;
				},
			},
		],
	},








	{
		path: '/build',
		Component() {
			const key = useAtomValue(propelAuthAtom);
			return (
				<AuthProvider key={key} authUrl={env.PUBLIC_AUTH_URL}>
					<AuthSync />
					{/* <AppNav /> */}
					<Outlet />
					{/* <SupportWidget kind="floatie" /> */}
				</AuthProvider>
			);
		},
		children: [
			{
				index: true,
				Component() {
					return <App />;
				},
			},
			
			{
				path: '/build/riff/:riffId',
				loader: async ({ context, params }) => {
					const riffId = params.riffId;
					if (riffId) {
						// pre-fetch in SSR
						await context?.helpers.remotion.getRiff.prefetch({ riffId });
						// pre-fetch in browser
						await routes.trpcUtils?.remotion.getRiff.ensureData({ riffId }).catch(() => { });
					}
					return null;
				},
				Component() {
					return <Riff />;
				},
			},
			{
				path: '/build/riff/create',
				Component() {
					return <CreateRiff />;
				},
			},
			
		],
	},
];

// browser-only context
export type RemixBrowserContext = {
	trpcUtils?: RouterUtils;
	queryClient?: QueryClient;
};

// server only context
export type RemixContext = {
	helpers: Helpers;
};

declare module 'react-router-dom' {
	interface LoaderFunctionArgs {
		context?: RemixContext;
	}

	interface ActionFunctionArgs {
		context?: RemixContext;
	}
}
