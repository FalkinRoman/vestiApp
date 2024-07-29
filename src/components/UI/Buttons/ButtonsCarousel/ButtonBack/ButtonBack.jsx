import React from "react";
import styles from "./ButtonBack.module.css";

const ButtonBack = ({ onClick }) => {
  return (
    <div className={styles.box} onClick={onClick}>
      <p className={styles.back}>←</p>
    </div>
  );
};

export default ButtonBack;
