import React from "react";
import classes from "./style.module.css";

const MainButton = (props) => {
  return (
    <button
      onClick={props.clicked}
      disabled={props.disabled}
      className={[classes.Button, classes[props.btnType]].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default MainButton;
