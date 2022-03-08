import React from "react";
import s from "./Layout.module.scss";
import { IChildrenProps } from "../../interfaces/childrenPropsInterface";

export default function Layout({ children }: IChildrenProps) {
  return (
    <div className={s.parent}>
      <div className={s.child}>{children}</div>
    </div>
  );
}
