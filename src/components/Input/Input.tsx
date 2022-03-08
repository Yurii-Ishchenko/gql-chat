import styles from "./Input.module.scss";
import React from "react";

interface IProps {
  error: string;
  type: string;
  label: string;
  name: string;
}

const Input = (
  { error, type, label, name, ...rest }: IProps,
  ref: React.LegacyRef<HTMLInputElement>
) => {
  return (
    <>
      <label className={styles.label} htmlFor={name}>
        <span className={styles.labelText}>{label}</span>
        <input
          ref={ref}
          type={type}
          className={`${styles.input} ${styles[error && "error"]}`}
          name={name}
          {...rest}
        />
      </label>

      {error && <p className={styles.text}>{error}</p>}
    </>
  );
};
const ForwaredInput = React.forwardRef(Input);
export default ForwaredInput;
