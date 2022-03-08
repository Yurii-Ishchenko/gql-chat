import { IChildrenProps } from "../../interfaces/childrenPropsInterface";
import styles from "./ScrollBar.module.scss";

export default function ScrollBar({ children }: IChildrenProps) {
  return <div className={styles.scrollbar}>{children}</div>;
}
