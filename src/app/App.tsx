import { Result, Word } from "./ui";
import styles from "./App.module.scss";
import { textString } from "./variables";
import { FC, KeyboardEvent, useState } from "react";
import { colorEnum, TextArrayProps } from "./types";

export const App: FC = () => {
    const [timer, setTimer] = useState<number>(60);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [wordIdState, setWordIdState] = useState<number>(1);
    const [letterIdState, setLetterIdState] = useState<number>(1);
    const [textArray, setTextArray] = useState<TextArrayProps[]>(
        textString.split(" ").map((word, i) => ({
            wordId: i + 1,
            wordLetters: word.split("").map((letter, index) => ({
                color: colorEnum.GRAY,
                letterId: index + 1,
                letter: letter,
            })),
        })),
    );

    const isLastLetter =
        textArray[wordIdState - 1].wordLetters[textArray[wordIdState - 1].wordLetters.length - 1].color !==
        colorEnum.GRAY;

    const needLetterState =
        isLastLetter || textArray[wordIdState - 1].wordLetters[letterIdState - 1].color === colorEnum.DARKRED
            ? " "
            : textArray[wordIdState - 1].wordLetters[letterIdState - 1].letter;

    const startTimer = () => {
        if (intervalId) return;
        const id = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(id);
                    return 0;
                }
            });
        }, 1000);
        setIntervalId(id);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === " ") {
            if (letterIdState !== 1 || isLastLetter) {
                startTimer();
                setLetterIdState(1);
                setWordIdState(wordIdState + 1);
            }
        } else if (
            e.key === needLetterState &&
            textArray[wordIdState - 1].wordLetters[letterIdState - 1].color !== colorEnum.DARKRED
        ) {
            startTimer();
            setTextArray((prevArray) =>
                prevArray.map((word) =>
                    word.wordId === wordIdState
                        ? {
                              ...word,
                              wordLetters: word.wordLetters.map((letter) =>
                                  letter.letterId === letterIdState ? { ...letter, color: colorEnum.WHITE } : letter,
                              ),
                          }
                        : word,
                ),
            );
            if (
                textArray[wordIdState - 1].wordLetters[letterIdState - 1].letterId !==
                textArray[wordIdState - 1].wordLetters.length
            ) {
                setLetterIdState(letterIdState + 1);
            }
        } else if (
            e.key !== needLetterState &&
            e.key !== "Shift" &&
            e.key !== "Control" &&
            e.key !== "CapsLock" &&
            e.key !== "Alt" &&
            e.key !== "Backspace" &&
            e.key !== "Tab" &&
            e.key !== "Enter" &&
            e.key !== "ArrowRight" &&
            e.key !== "ArrowLeft" &&
            e.key !== "ArrowUp" &&
            e.key !== "ArrowDown" &&
            e.key !== "Escape" &&
            e.key !== "AudioVolumeMute" &&
            e.key !== "AudioVolumeUp" &&
            e.key !== "AudioVolumeDown" &&
            e.key !== "Delete" &&
            e.key !== "NumLock"
        ) {
            startTimer();
            if (textArray[wordIdState - 1].wordLetters[letterIdState - 1].color === colorEnum.GRAY) {
                setTextArray((prevArray) =>
                    prevArray.map((word) =>
                        word.wordId === wordIdState
                            ? {
                                  ...word,
                                  wordLetters: word.wordLetters.map((letter) =>
                                      letter.letterId === letterIdState
                                          ? { ...letter, color: colorEnum.BRIGHTRED }
                                          : letter,
                                  ),
                              }
                            : word,
                    ),
                );
            }
            if (isLastLetter !== true && letterIdState !== textArray[wordIdState - 1].wordLetters.length) {
                setLetterIdState(letterIdState + 1);
            } else if (isLastLetter === true) {
                setTextArray((prevArray) =>
                    prevArray.map((word) =>
                        word.wordId === wordIdState
                            ? {
                                  ...word,
                                  wordLetters: [
                                      ...word.wordLetters,
                                      {
                                          letter: e.key,
                                          letterId: word.wordLetters[word.wordLetters.length - 1].letterId + 1,
                                          color: colorEnum.DARKRED,
                                      },
                                  ],
                              }
                            : word,
                    ),
                );
            }
        } else if (e.key === "Backspace") {
            startTimer();
            if (
                textArray[wordIdState - 1].wordLetters[textArray[wordIdState - 1].wordLetters.length - 1].color ===
                colorEnum.DARKRED
            ) {
                setTextArray((prevArray) =>
                    prevArray.map((word) =>
                        word.wordId === wordIdState
                            ? {
                                  ...word,
                                  wordLetters: word.wordLetters.filter(
                                      (letter) =>
                                          letter.letterId !==
                                          textArray[wordIdState - 1].wordLetters[
                                              textArray[wordIdState - 1].wordLetters.length - 1
                                          ].letterId,
                                  ),
                              }
                            : word,
                    ),
                );
            } else if (
                textArray[wordIdState - 1].wordLetters[textArray[wordIdState - 1].wordLetters.length - 1].color !==
                    colorEnum.DARKRED &&
                isLastLetter === true
            ) {
                setTextArray((prevArray) =>
                    prevArray.map((word) =>
                        word.wordId === wordIdState
                            ? {
                                  ...word,
                                  wordLetters: word.wordLetters.map((letter) =>
                                      letter.letterId === letterIdState ? { ...letter, color: colorEnum.GRAY } : letter,
                                  ),
                              }
                            : word,
                    ),
                );
            } else if (letterIdState > 1) {
                setTextArray((prevArray) =>
                    prevArray.map((word) =>
                        word.wordId === wordIdState
                            ? {
                                  ...word,
                                  wordLetters: word.wordLetters.map((letter) =>
                                      letter.letterId === letterIdState - 1
                                          ? { ...letter, color: colorEnum.GRAY }
                                          : letter,
                                  ),
                              }
                            : word,
                    ),
                );
                setLetterIdState(letterIdState - 1);
            } else if (letterIdState === 1 && wordIdState > 1) {
                const previousWord = textArray[wordIdState - 2];
                const lastColoredLetter = previousWord.wordLetters
                    .slice()
                    .reverse()
                    .find((letter) => letter.color !== colorEnum.GRAY);
                setWordIdState(wordIdState - 1);
                if (lastColoredLetter && lastColoredLetter.letterId + 1 > previousWord.wordLetters.length) {
                    setLetterIdState(lastColoredLetter ? lastColoredLetter.letterId : 1);
                } else {
                    setLetterIdState(lastColoredLetter ? lastColoredLetter.letterId + 1 : 1);
                }
            }
        }
    };

    const startAgain = () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        setIntervalId(null);
        setTimer(60);
        setWordIdState(1);
        setLetterIdState(1);
        setTextArray((prevArray) =>
            prevArray.map((word) => ({
                ...word,
                wordLetters: word.wordLetters
                    .filter((letter) => letter.color !== colorEnum.DARKRED)
                    .map((letter) => ({
                        ...letter,
                        color: colorEnum.GRAY,
                    })),
            })),
        );
    };

    return (
        <main className={styles.app}>
            <h1>{timer}</h1>
            <button onClick={startAgain}>try again</button>
            {timer > 0 ? (
                <div
                    className={styles.inner}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    {textArray.map((word, i) => (
                        <Word
                            wordLetters={word.wordLetters}
                            wordIdState={wordIdState}
                            wordId={word.wordId}
                            key={i}
                        />
                    ))}
                </div>
            ) : (
                <Result
                    textArray={textArray}
                    wordIdState={wordIdState}
                />
            )}
        </main>
    );
};
