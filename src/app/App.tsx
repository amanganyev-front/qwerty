import { FC } from "react";
import { Word } from "./ui";
import styles from "./App.module.scss";
import { textArray } from "./variables";

export const App: FC = () => {
    const divided = textArray.split(" ");
    console.log(divided, "divided");

    return (
        <div className={styles.app}>
            {divided.map((word, i) => (
                <Word
                    text={word}
                    key={i}
                />
            ))}
        </div>
    );
};
