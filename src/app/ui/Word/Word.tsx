import { FC } from "react";
import styles from "./Word.module.scss";

export const Word: FC<{ text: string }> = ({ text }) => {
    const letters = text.split("")
    return <div className={styles.word}>
        {letters.map((item, i) => (
            <span key={i}>{item}</span>
        ))}
    </div>;
};
