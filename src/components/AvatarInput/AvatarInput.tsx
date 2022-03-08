import React from "react";
import Avatar from "../Avatar/Avatar";
import Input from "../Input/Input";
import styles from "./AvatarInput.module.scss";
interface IProps {
  url: string;
  error: string;
  label: string;
  type: string;
  name: string;
}
const AvatarInput = (
  { url, error, label, type, ...rest }: IProps,
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <div className={styles.container}>
      <p className={styles.logo}>Logo</p>
      <div className={styles.block}>
        <Avatar size="large" url={url} />
        <div className={styles.input}>
          <Input error={error} type={type} label={label} ref={ref} {...rest} />
        </div>
      </div>
    </div>
  );
};

const ForwaredAvatarInput = React.forwardRef(AvatarInput);
export default ForwaredAvatarInput;
