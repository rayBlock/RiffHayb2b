
import type { User } from '@propelauth/node';

import { eq} from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import type { PrivacyLevel } from '../../../components/app/utils';

// import { riffLikes, sharedKeyRatelimit } from '../../../db/schema';
import { usersToPublicUserInfo } from '../../../pages/api/orgs/[orgId]';
// import { serverEnv } from '../../../t3-env';

import { propelauth } from '../../propelauth';

import { apiProcedure, createTRPCRouter, orgProcedure } from '../trpc';

import { db } from '../../../db/db';
import { riffs } from '../../../db/schema';

import { TRPCError } from '@trpc/server';
import { riffWeaver } from '../../remotion/riffWeaver';


// const messageSchema = z.object({
// 	role: z.union([z.literal('user'), z.literal('assistant'), z.literal('system')]),
// 	content: z.string(),
// });
// type Message = z.infer<typeof messageSchema>;
const privacyLevelSchema = z.union([
	z.literal('public'),
	z.literal('team'),
	z.literal('unlisted'),
	z.literal('private'),
]);
export type PromptPrivacyLevel = z.infer<typeof privacyLevelSchema>;

export const remotionRouter = createTRPCRouter({
	getRiff: apiProcedure
		.input(
			z.object({
				riffId: z.string(),
			})
		)
		.query(async ({ input, ctx }) => {
			const user = await ctx.userPromise;
			const userData = user.kind === 'ok' ? user.user : undefined;

			const userId = userData?.userId;
			const res = await db
				.select({
					riffId: riffs.riffId,
					inputs: riffs.inputs,
					userId: riffs.userId,
					orgId: riffs.orgId,
					privacyLevel: riffs.privacyLevel,
					title: riffs.title,
					description: riffs.description,
					tags: riffs.tags,
					// createdAt: riffs.createdAt,
					// updatedAt: riffs.updatedAt,
					// likes: sql<number>`count(${riffLikes.userId})::int`,
					// myLike: sql<boolean>`SUM(CASE WHEN ${riffLikes.userId} = (${
					// 	userId || null
					// })::text THEN 1 ELSE 0 END) > 0`,

				})
				.from(riffs)

				.where(eq(riffs.riffId, input.riffId));

			const originalRiff = res[0];
			if (!originalRiff) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: `Prompt ${input.riffId} not found`,
				});
			}
			const validPrivacyLevel = privacyLevelSchema.safeParse(originalRiff.privacyLevel);
			const riffy = {
				...originalRiff,
				privacyLevel: validPrivacyLevel.success ? validPrivacyLevel.data : 'private',
			};

			const error = checkAccessToPrompt(riffy, userData);
			if (error) {
				if (error === 'UNAUTHORIZED') {
					throw new TRPCError({
						code: 'UNAUTHORIZED',
						message: `You need to sign in to access this prompt`,
					});
				} else {
					throw new TRPCError({
						code: 'FORBIDDEN',
						message: `You don't have access to this prompt`,
					});
				}
			}
			const users = await resolvePropelPublicUsers([riffy.userId]);
			const author = users.kind === 'ok' ? users.users[riffy.userId] : undefined;
			if (!author) {
				console.error('Error fetching users', users);
			}
			const {inputs, title,  ...rest } = riffy;

			// const validTags = z.array(z.string()).safeParse(tags);

			return {
				canEdit: riffy.userId === userId,
				riff: riffy,
				prompt: {
					...rest,
					title: riffy.title
					// tags: validTags.success ? validTags.data : [],
				},
				author,
				shareUrl: new URL(ctx.req.url).origin + '/app/riff/' + riffy.riffId,
				publicUrl: new URL(ctx.req.url).origin + '/videos/' + riffy.riffId,
			};
		}),

	render: apiProcedure
		.input(
			z.object({
				title: z.string().optional(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.userPromise;

			console.log('remotion trpc route', input);

			if (res.kind === 'ok') {
				return `Oh, so cool, you are remotion ${res.user.userId}`;
			}

			return 'Something from the server remotion trpc';
		}),

	createRiff: orgProcedure
		.input(
			z.object({
				duration: z.string(),
				title: z.string().optional(),
				description: z.string().optional(),
				// tags: z.array(z.string()).optional(),
				privacyLevel: privacyLevelSchema,
				prompt:z.string(),
				orientation: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.userPromise;

			if (res.kind === 'ok') {

				const inputs = await riffWeaver({prompt:input.prompt, duration:input.duration, orientation:input.orientation })
				const title = input.title || 'Untitled';
				const description = input.description || '';
				// const tags = (input.tags || []).map((x) => x.trim()).filter((x) => x.length > 0);
				const uRiff_Id = nanoid();
				console.log(inputs.data[1], "1",inputs.data[3], "2")
				await db.insert(riffs).values({
					riffId: uRiff_Id,
					inputs:inputs,
					title,
					description,
					orgId: ctx.requiredOrgId,
					userId: ctx.user.userId,
					privacyLevel: input.privacyLevel,
					//TODO --> add the llmText & Images intoDB
				});

				return uRiff_Id;
			}
			return 'failed ';
		}),
});

// const period = 1000 * 5; // 5 seconds
// const period = 1000 * 60 * 60 * 24 * 7; // 7 Days
// const limit = 5;

// function rateLimitSharedKeyId(userId: string, currentTimestamp: number) {
// 	return `shared_key:${userId}:${Math.floor(currentTimestamp / period)}`;
// }

// function rateLimitSharedKeyResetsAt(currentTimestamp: number) {
// 	return Math.ceil(currentTimestamp / period) * period;
// }

/**
 * @returns the number of requests remaining
 */
// async function rateLimitUpsert(userId: string, currentTimestamp: number) {
// 	// will do UPSERT
// 	const result = await db
// 		.insert(sharedKeyRatelimit)
// 		.values({
// 			limitId: rateLimitSharedKeyId(userId, currentTimestamp),
// 			value: 1,
// 		})
// 		.onConflictDoUpdate({
// 			target: sharedKeyRatelimit.limitId,
// 			set: {
// 				value: sql`${sharedKeyRatelimit.value} + 1`,
// 			},
// 		})
// 		.returning({
// 			value: sharedKeyRatelimit.value,
// 		});
// 	const first = result[0];
// 	if (!first) {
// 		throw new Error('No result from UPSERT');
// 	}

// 	// +1 to get the value that we had before the UPSERT
// 	return limit - first.value + 1;
// }

function resolvePropelAuthUsers(userIds: string[]) {
	return propelauth
		.fetchBatchUserMetadataByUserIds(userIds)
		.then((users) => ({ kind: 'ok' as const, users }))
		.catch((error) => ({ kind: 'error' as const, error }));
}

function resolvePropelPublicUsers(userIds: string[]) {
	return resolvePropelAuthUsers(userIds).then((result) => {
		if (result.kind === 'ok') {
			return { ...result, users: usersToPublicUserInfo(result.users) };
		}
		return result;
	});
}

function checkAccessToPrompt(
	riffy: { riffId: string; privacyLevel: PrivacyLevel; userId: string; orgId: string },
	user: User | undefined
) {
	const privacyLevel = riffy.privacyLevel;

	// everyone can access public and unlisted prompts
	if (privacyLevel === 'public' || privacyLevel === 'unlisted') {
		return undefined;
	}
	// you need to be signed in to access private or team prompts
	if (!user) {
		return 'UNAUTHORIZED';
	}
	// owners can access their own prompts
	if (riffy.userId === user.userId) {
		return undefined;
	}
	// no one else can access private prompts
	if (privacyLevel === 'private') {
		return 'FORBIDDEN';
	}
	// you need to be in the same team to access team prompts
	if (privacyLevel === 'team') {
		const hasAccess = user.orgIdToOrgMemberInfo?.[riffy.orgId] !== undefined;
		if (hasAccess) {
			return undefined;
		}
	}
	return 'FORBIDDEN';
}
