import { useContext } from "react";
import { userContext } from "../../context/userContext";
import styles from "./ChatBlockView.module.scss";
import MessageForm from "../../components/MessageForm/MessageForm";
import RoomsList from "../../components/RoomsList/RoomsList";
import MessageList from "../../components/MessageList/MessageList";

export default function ChatBlock() {
  const { isShowRoomsList } = useContext(userContext);
  const visible = isShowRoomsList ? "visible" : "";
  return (
    <div className={styles.container}>
      <div className={`${styles.roomsContainer} ${styles[visible]}`}>
        <RoomsList />
      </div>
      <div className={styles.chatContainer}>
        <MessageList />
        <MessageForm />
      </div>
    </div>
  );
}
