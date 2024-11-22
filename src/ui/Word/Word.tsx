"use client";

import styles from "./Word.module.scss";
import { colorEnum, WordProps } from "@/types";
import { BRIGHTRED, DARKRED, GRAY, WHITE } from "@/variables";

export default function Word(props: WordProps) {
    const { wordId, wordIdState, wordLetters } = props;
    const colorMap = {
        [colorEnum.GRAY]: GRAY,
        [colorEnum.WHITE]: WHITE,
        [colorEnum.DARKRED]: DARKRED,
        [colorEnum.BRIGHTRED]: BRIGHTRED,
    };
    return (
        <div
            className={styles.Word}
            style={{
                borderBottom:
                    wordIdState > wordId && wordLetters.some((letter) => letter.color !== colorEnum.WHITE)
                        ? `2px solid ${BRIGHTRED}`
                        : "none",
            }}
        >
            {wordLetters.map((letter, i) => (
                <span
                    key={i}
                    style={{
                        color: colorMap[letter.color],
                    }}
                >
                    {letter.letter}
                </span>
            ))}
        </div>
    );
}
