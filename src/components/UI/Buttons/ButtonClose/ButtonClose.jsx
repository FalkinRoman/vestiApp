import React from "react";
import st from "./ButtonClose.module.css";

const ButtonClose = ({ setVisible }) => {
  return (
    <div className={st.closeButtonBox}>
      <button onClick={() => setVisible(false)} className={st.closeButton}>
        &times;
      </button>
    </div>
  );
};

export default ButtonClose;
