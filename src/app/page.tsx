"use client";

import { Result, Word } from "@/ui";
import styles from "./page.module.scss";
import { qwertyState } from "@/state";
import { useEffect } from "react";

export default function Home() {
    const { startAgain, handleKeyDown, textArray, wordIdState, timer } = qwertyState();
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return (
        <main className={styles.Home}>
            <h1>{timer}</h1>
            <button onClick={startAgain}>try again</button>
            {timer > 0 ? (
                <div className={styles.inner}>
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
}
