import type { CompConfig } from '../types/types_remotion';
import { AnfaRiff } from './RIFFS/Anfa/config';
// import { JinjasRiff } from './RIFFS/Jinjas/config';
// import { LilyRiff } from './RIFFS/Lily/config';

export const riffsArray: CompConfig<any>[] = [
	AnfaRiff,
	AnfaRiff,
	AnfaRiff,AnfaRiff,AnfaRiff,AnfaRiff,AnfaRiff,AnfaRiff,AnfaRiff,AnfaRiff,
	AnfaRiff,AnfaRiff,AnfaRiff,AnfaRiff,AnfaRiff,AnfaRiff,AnfaRiff,AnfaRiff,
	AnfaRiff,


	AnfaRiff,

	AnfaRiff,

	AnfaRiff,

];

export const comps: Map<string, any> = new Map<string, CompConfig<any>>(
	riffsArray.map((riff) => [riff.id, riff])
);
