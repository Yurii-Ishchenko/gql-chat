import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import styles from "./RoomsCreator.module.scss";
import addIcon from "../../images/add_icon.svg";
import RoomsCreatorForm from "../RoomsCreatorForm/RoomsCreatorForm";
import { CREATE_CONVERSATION } from "../../servises/queries/createConversation";

export default function RoomsCreator() {
  const [isShowForm, setIsShowForm] = useState(false);
  const [conversationName, setConversationName] = useState("");
  const [createConversation] = useMutation(CREATE_CONVERSATION, {
    variables: { name: conversationName },
    onError: (error) => {
      console.log("onError", error);
      toast.error(error.message, {
        theme: "colored",
      });
    },
  });
  const toggleShowForm = () => {
    setIsShowForm(!isShowForm);
  };
  useEffect(() => {
    if (conversationName === "") {
      return;
    }
    createConversation();
    /*eslint-disable-next-line */
  }, [conversationName]);
  return (
    <div className={styles.rooms_creator_container}>
      <div className={styles.rooms_creator}>
        <h2 className={styles.title}>Rooms</h2>
        <button className={styles.button_icon} onClick={toggleShowForm}>
          <img src={addIcon} alt="cross" width="16px" className={styles.icon} />
        </button>
      </div>
      {isShowForm ? (
        <RoomsCreatorForm onSubmit={setConversationName} />
      ) : (
        <hr className={styles.delimiter} />
      )}
    </div>
  );
}
