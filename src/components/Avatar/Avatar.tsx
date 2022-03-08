import style from "./Avatar.module.scss";
import defaultAvatarUrl from "../../images/avatar.png";
interface IProps {
  size: "normal" | "large";
  url?: string;
}
export default function Avatar({ url, size }: IProps) {
  return (
    <>
      <div className={`${style.container} ${style[size]}`}>
        <img
          src={url ? url : defaultAvatarUrl}
          alt="user's avatar"
          className={style.image}
        />
      </div>
    </>
  );
}
