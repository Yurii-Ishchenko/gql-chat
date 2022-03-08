import styles from "./ChatBlockView.module.scss";
import MessageForm from "../../components/MessageForm/MessageForm";
import RoomsList from "../../components/RoomsList/RoomsList";
import MessageList from "../../components/MessageList/MessageList";

export default function ChatBlock() {
  return (
    <div className={styles.container}>
      <div className={styles.roomsContainer}>
        <RoomsList />
      </div>
      <div className={styles.chatContainer}>
        <MessageList />
        <MessageForm />
      </div>
    </div>
  );
}
