import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { userContext } from "../../context/userContext";
import { IMessage } from "../../interfaces/messageInterface";
import Message from "../Message/Message";
import styles from "./MessageList.module.scss";
import { GET_ALL_MESSAGES } from "../../servises/queries/getAllMessages";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import useSubscribeMessage from "./useSubscribeMessage";
import TypingList from "../../components/TypingList/TypingList";
import ScrollBar from "../ScrollBar/ScrollBar";

function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messageListRef: React.LegacyRef<HTMLDivElement> = useRef(null);
  const { activeConvId } = useContext(userContext);
  const message = useSubscribeMessage();

  const [getAllMessages, { loading }] = useLazyQuery(GET_ALL_MESSAGES, {
    variables: { convId: activeConvId },
    onCompleted: (data) => {
      setMessages(data.getAllMessages);
    },
    onError: (error) => {
      toast.error(error.message, {
        theme: "colored",
      });
    },
  });
  useEffect(() => {
    if (!activeConvId) {
      return;
    }
    getAllMessages();
    /* eslint-disable-next-line */
  }, [activeConvId]);

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }
    messageListRef?.current?.children[messages.length - 1].scrollIntoView();
  }, [messages]);

  const memoizedSortedMessages = useMemo(() => {
    return [...messages].sort(
      (a: IMessage, b: IMessage) => Number(a.id) - Number(b.id)
    );
  }, [messages]);

  useEffect(() => {
    if (!message || messages.find(({ id }) => id === message.id)) {
      return;
    }
    setMessages((prevMessages) => [...prevMessages, message]);
  }, [message, messages]);

  if (loading) {
    return <h1 className={styles.loading}>Loading...</h1>;
  }

  return (
    <>
      <ScrollBar>
        <div className={styles.list} ref={messageListRef}>
          {messages.length > 0 &&
            memoizedSortedMessages.map((message) => (
              <Message message={message} key={message.id} />
            ))}
        </div>
      </ScrollBar>
      <TypingList />
    </>
  );
}

export default MessageList;

// <p className={styles.loading}>
//   {/* {typing && typing.id !== user?.id && `${typing.login} is typing...`} */}
//   {typingLIst.length > 0 && typingLIst.map((item) => item)}
// </p>;
