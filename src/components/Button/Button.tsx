import React from "react";
import style from "./Button.module.scss";

interface IProps {
  type?: "button" | "submit";
  children: React.ReactChild;
  color?: "primary" | "secondary";
  disabled?: boolean;
}

export default function Button({
  type = "button",
  children,
  color = "primary",
  disabled,
}: IProps) {
  return (
    <>
      <button type={type} className={`${style.button} ${style[color]}`}>
        <span className={style.child}>{children}</span>
      </button>
    </>
  );
}
