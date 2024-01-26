import React from "react";
import "./style.css";

const CustomInput = (props) => {
  return (
    <input
      type={props.type}
      maxLength={props.maxLength}
      minLength={props.minLength}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      className="Input"
    />
  );
};

export default CustomInput;
