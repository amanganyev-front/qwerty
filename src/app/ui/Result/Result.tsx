import { FC } from "react";
import styles from "./Result.module.scss";
import { colorEnum, ResultProps } from "@/app/types";

export const Result: FC<ResultProps> = (props) => {
    const { textArray, wordIdState } = props;
    return (
        <div className={styles.result}>
            <div>
                WPM:
                <h2>
                    {textArray.reduce((count, word) => {
                        return (
                            count +
                            word.wordLetters.reduce((wordCount, letter) => {
                                return letter.color === colorEnum.WHITE ? wordCount + 1 : wordCount;
                            }, 0)
                        );
                    }, 0) / 5}
                </h2>
            </div>
            <div>
                Correct letters:
                <h2>
                    {textArray.reduce((count, word) => {
                        return (
                            count +
                            word.wordLetters.reduce((wordCount, letter) => {
                                return letter.color === colorEnum.WHITE ? wordCount + 1 : wordCount;
                            }, 0)
                        );
                    }, 0)}
                </h2>
            </div>
            <div>
                Wrong letters:
                <h2>
                    {textArray.reduce((count, word) => {
                        return (
                            count +
                            word.wordLetters.reduce((wordCount, letter) => {
                                return letter.color === colorEnum.BRIGHTRED || letter.color === colorEnum.DARKRED
                                    ? wordCount + 1
                                    : wordCount;
                            }, 0)
                        );
                    }, 0)}
                </h2>
            </div>
            <div>
                Correct words:
                <h2>
                    {
                        textArray.filter((word) => word.wordLetters.every((letter) => letter.color === colorEnum.WHITE))
                            .length
                    }
                </h2>
            </div>
            <div>
                Wrong words:
                <h2>
                    {
                        textArray
                            .slice(0, wordIdState - 1)
                            .filter((word) => !word.wordLetters.every((letter) => letter.color === colorEnum.WHITE))
                            .length
                    }
                </h2>
            </div>
            <div>
                Accuracy:
                <h2>
                    {(
                        (textArray.reduce((count, word) => {
                            return (
                                count +
                                word.wordLetters.reduce((wordCount, letter) => {
                                    return letter.color === colorEnum.WHITE ? wordCount + 1 : wordCount;
                                }, 0)
                            );
                        }, 0) *
                            100) /
                        (textArray.reduce((count, word) => {
                            return (
                                count +
                                word.wordLetters.reduce((wordCount, letter) => {
                                    return letter.color === colorEnum.WHITE ? wordCount + 1 : wordCount;
                                }, 0)
                            );
                        }, 0) +
                            textArray.reduce((count, word) => {
                                return (
                                    count +
                                    word.wordLetters.reduce((wordCount, letter) => {
                                        return letter.color === colorEnum.BRIGHTRED ||
                                            letter.color === colorEnum.DARKRED
                                            ? wordCount + 1
                                            : wordCount;
                                    }, 0)
                                );
                            }, 0))
                    ).toFixed(1)}
                    %
                </h2>
            </div>
        </div>
    );
};
