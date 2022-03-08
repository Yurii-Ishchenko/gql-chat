import React from "react";
import styles from "./Textarea.module.scss";

interface ITexteriaProps {
  placeholder: string;
}

function Textarea(
  { placeholder, ...rest }: ITexteriaProps,
  ref: React.LegacyRef<HTMLTextAreaElement>
) {
  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      ref={ref}
      {...rest}
    />
  );
}

const ForwaredTextarea = React.forwardRef(Textarea);
export default ForwaredTextarea;
