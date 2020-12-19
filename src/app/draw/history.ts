import { Stroke } from './stroke';

export interface History {
    wholeword_segments: string,
    word_ascii: string,
    word_stroke: Stroke[],
    num_interpretations: number
}
