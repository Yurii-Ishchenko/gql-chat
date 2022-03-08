import { useState, useEffect, useContext } from "react";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { userContext } from "../../context/userContext";
import styles from "./RoomsList.module.scss";
import RoomsCreator from "../RoomsCreator/RoomsCreator";
import { GET_ALL_CONVERSATIONS } from "../../servises/queries/getAllConversations";
import RoomsItem from "../RoomsItem/RoomsItem";
import ScrollBar from "../ScrollBar/ScrollBar";
import useSubscribeConversations from "./useSubscribeConversations";

interface IConversation {
  id: string;
  createdBy: number;
  name: string;
  date: string;
}

export default function RoomsList() {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const { setActiveConvId } = useContext(userContext);
  const [activeIdx, setActiveIdx] = useState(0);
  const getIsActive = (idx: number) => {
    return idx === activeIdx ? "active" : "";
  };
  const subscribeConversations = useSubscribeConversations();
  const [getAllConversations] = useLazyQuery(GET_ALL_CONVERSATIONS, {
    onCompleted: (data) => {
      setConversations(data.getAllConversations);
    },
    onError: (error) => {
      toast.error(error.message, {
        theme: "colored",
      });
    },
  });
  useEffect(() => {
    getAllConversations();
    /*eslint-disable-next-line */
  }, []);

  useEffect(() => {
    if (conversations.length === 0) {
      return;
    }
    setActiveConvId(Number(conversations[0].id));
    /*eslint-disable-next-line */
  }, [conversations]);

  useEffect(() => {
    if (!subscribeConversations) {
      return;
    }
    setConversations(subscribeConversations);
  }, [subscribeConversations]);

  return (
    <div className={styles.container}>
      <RoomsCreator />

      <ScrollBar>
        {conversations.length > 0 &&
          conversations.map(({ id, name }, index) => (
            <RoomsItem
              key={id}
              active={getIsActive(index)}
              name={name}
              onClick={() => {
                setActiveIdx(index);
                setActiveConvId(Number(id));
              }}
            />
          ))}
      </ScrollBar>
    </div>
  );
}
