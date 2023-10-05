import { z } from "zod";

export interface CompConfig<T> {
    id: string;
    durationInFrames: number;
    minDurationFrames?:number
    maxDurationFrames?:number
    inputPropsSchema: z.ZodType<T>;
    component: any;
  }