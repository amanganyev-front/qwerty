export enum colorEnum {
    BRIGHTRED,
    DARKRED,
    GRAY,
    WHITE,
}

export interface WordLetterProps {
    color: colorEnum;
    letterId: number;
    letter: string;
}

export interface WordProps {
    wordId: number;
    wordIdState: number;
    wordLetters: WordLetterProps[];
}

export interface TextArrayProps {
    wordId: number;
    wordLetters: WordLetterProps[];
}

export interface ResultProps {
    textArray: TextArrayProps[];
    wordIdState: number;
}
