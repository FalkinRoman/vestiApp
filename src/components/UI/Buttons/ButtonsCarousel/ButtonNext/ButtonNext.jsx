import React from "react";
import styles from "./ButtonNext.module.css";

const ButtonNext = ({ onClick }) => {
  return (
    <div className={styles.box} onClick={onClick}>
      <p className={styles.back}>→</p>
    </div>
  );
};

export default ButtonNext;
