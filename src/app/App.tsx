import { FC, KeyboardEvent } from "react";
import { Word } from "./ui";
import styles from "./App.module.scss";
import { textArray } from "./variables";

export const App: FC = () => {
    const handleKeyDown = (e: KeyboardEvent) => {
        console.log(e.key);
    };
    return (
        <main className={styles.app}>
            <div
                className={styles.inner}
                onKeyDown={handleKeyDown}
                tabIndex={0}
            >
                {textArray.map((word, i) => (
                    <Word
                        text={word}
                        key={i}
                    />
                ))}
            </div>
        </main>
    );
};
