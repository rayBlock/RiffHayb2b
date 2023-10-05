import type { CompConfig } from "../types/remotion";
import { JinjasRiff } from "./RIFFS/Jinjas/config";
import { LilyRiff } from "./RIFFS/Lily/config";
// import { PikarRiff } from "./RIFFS/Pikar/config";
import { SempaRiff } from "./RIFFS/Sempa/config";




export const riffsArray:CompConfig<any>[] = [

    JinjasRiff,
    LilyRiff,
    JinjasRiff,
    JinjasRiff,
    JinjasRiff,
    SempaRiff,
]

export const comps:Map<string,any> = new Map<string, CompConfig<any>>(riffsArray.map((riff) => [riff.id, riff]));
