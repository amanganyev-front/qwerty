import { colorEnum, TextArrayProps } from "@/types";
import { textString } from "@/variables";
import { create } from "zustand";

interface IQwertyState {
    timer: number;
    intervalId: NodeJS.Timeout | null;
    wordIdState: number;
    letterIdState: number;
    textArray: TextArrayProps[];
    startTimer: () => void;
    handleKeyDown: (e: KeyboardEvent) => void;
    startAgain: () => void;
}

export const qwertyState = create<IQwertyState>()((set, get) => ({
    timer: 60,
    intervalId: null,
    wordIdState: 1,
    letterIdState: 1,
    textArray: textString.split(" ").map((word, i) => ({
        wordId: i + 1,
        wordLetters: word.split("").map((letter, index) => ({
            color: colorEnum.GRAY,
            letterId: index + 1,
            letter: letter,
        })),
    })),
    startTimer: () => {
        const { timer, intervalId } = get();
        if (intervalId) return;
        const id = setInterval(() => {
            if (timer > 0) {
                return set({ timer: timer - 1 });
            } else {
                clearInterval(id);
                return set({ timer: 0, intervalId: null });
            }
        }, 1000);
        set({ intervalId: id });
    },
    handleKeyDown: (e) => {
        console.log(e.key, "key");
        const { startTimer, wordIdState, letterIdState, textArray } = get();
        const isLastLetter =
            textArray[wordIdState - 1].wordLetters[textArray[wordIdState - 1].wordLetters.length - 1].color !==
            colorEnum.GRAY;
        const needLetterState =
            isLastLetter || textArray[wordIdState - 1].wordLetters[letterIdState - 1].color === colorEnum.DARKRED
                ? " "
                : textArray[wordIdState - 1].wordLetters[letterIdState - 1].letter;
        if (e.key === " ") {
            if (letterIdState !== 1 || isLastLetter) {
                startTimer();
                set({
                    letterIdState: 1,
                    wordIdState: wordIdState + 1,
                });
            }
        } else if (
            e.key === needLetterState &&
            textArray[wordIdState - 1].wordLetters[letterIdState - 1].color !== colorEnum.DARKRED
        ) {
            startTimer();
            set((prevState) => ({
                textArray: prevState.textArray.map((word) =>
                    word.wordId === wordIdState
                        ? {
                              ...word,
                              wordLetters: word.wordLetters.map((letter) =>
                                  letter.letterId === letterIdState ? { ...letter, color: colorEnum.WHITE } : letter,
                              ),
                          }
                        : word,
                ),
            }));
            if (
                textArray[wordIdState - 1].wordLetters[letterIdState - 1].letterId !==
                textArray[wordIdState - 1].wordLetters.length
            ) {
                set({ letterIdState: letterIdState + 1 });
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
                console.log(needLetterState, "need");

                set((prevState) => ({
                    textArray: prevState.textArray.map((word) =>
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
                }));
            }
            if (isLastLetter !== true && letterIdState !== textArray[wordIdState - 1].wordLetters.length) {
                set({ letterIdState: letterIdState + 1 });
            } else if (isLastLetter === true) {
                set((prevState) => ({
                    textArray: prevState.textArray.map((word) =>
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
                }));
            }
        } else if (e.key === "Backspace") {
            startTimer();
            if (
                textArray[wordIdState - 1].wordLetters[textArray[wordIdState - 1].wordLetters.length - 1].color ===
                colorEnum.DARKRED
            ) {
                set((prevState) => ({
                    textArray: prevState.textArray.map((word) =>
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
                }));
            } else if (
                textArray[wordIdState - 1].wordLetters[textArray[wordIdState - 1].wordLetters.length - 1].color !==
                    colorEnum.DARKRED &&
                isLastLetter === true
            ) {
                set((prevState) => ({
                    textArray: prevState.textArray.map((word) =>
                        word.wordId === wordIdState
                            ? {
                                  ...word,
                                  wordLetters: word.wordLetters.map((letter) =>
                                      letter.letterId === letterIdState ? { ...letter, color: colorEnum.GRAY } : letter,
                                  ),
                              }
                            : word,
                    ),
                }));
            } else if (letterIdState > 1) {
                set((prevState) => ({
                    textArray: prevState.textArray.map((word) =>
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
                }));
                set({ letterIdState: letterIdState - 1 });
            } else if (letterIdState === 1 && wordIdState > 1) {
                const previousWord = textArray[wordIdState - 2];
                const lastColoredLetter = previousWord.wordLetters
                    .slice()
                    .reverse()
                    .find((letter) => letter.color !== colorEnum.GRAY);
                set({ wordIdState: wordIdState - 1 });
                if (lastColoredLetter && lastColoredLetter.letterId + 1 > previousWord.wordLetters.length) {
                    set({ letterIdState: lastColoredLetter ? lastColoredLetter.letterId : 1 });
                } else {
                    set({ letterIdState: lastColoredLetter ? lastColoredLetter.letterId + 1 : 1 });
                }
            }
        }
    },
    startAgain: () => {
        const { intervalId } = get();
        if (intervalId) {
            clearInterval(intervalId);
        }
        set({
            intervalId: null,
            timer: 60,
            wordIdState: 1,
            letterIdState: 1,
        });
        set((prevState) => ({
            textArray: prevState.textArray.map((word) => ({
                ...word,
                wordLetters: word.wordLetters
                    .filter((letter) => letter.color !== colorEnum.DARKRED)
                    .map((letter) => ({
                        ...letter,
                        color: colorEnum.GRAY,
                    })),
            })),
        }));
    },
}));
