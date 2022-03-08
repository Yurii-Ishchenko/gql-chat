/*eslint-disable */
import { useContext } from "react";
import Avatar from "../Avatar/Avatar";
import styles from "./Message.module.scss";
import { IMessage } from "../../interfaces/messageInterface";
import { getTime } from "../../utils/getTime";
import { userContext } from "../../context/userContext";

interface IProps {
  message: IMessage;
}
export default function Message({ message }: IProps) {
  const { user } = useContext(userContext);
  const { avatar } = message.user;
  const isCurrentUser = message.user.id === user?.id;
  const current = isCurrentUser ? "current" : "";
  return (
    <div
      className={`${styles.container} ${styles[current]}`}
      role="messageContainer"
    >
      <div className={styles.avatar}>
        <Avatar size="normal" url={avatar} />
      </div>
      <div>
        <div className={styles.content}>
          <p>{message.description}</p>
        </div>
        <div>
          <span className={styles.time} role="time">
            {getTime(message.date, isCurrentUser)}
          </span>
        </div>
      </div>
    </div>
  );
}
