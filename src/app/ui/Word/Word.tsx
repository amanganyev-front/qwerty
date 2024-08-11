import { FC } from "react";
import styles from "./Word.module.scss";

export const Word: FC<{ text: string }> = ({ text }) => {
    const letters = text.split("")
    console.log(letters, "letters");
    return <div className={styles.word}>
        {letters.map((item, i) => (
            <div key={i}>{item}</div>
        ))}
    </div>;
};
