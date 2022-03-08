import { useState, useContext } from "react";
import { useSubscription } from "@apollo/client";
import { userContext } from "../../context/userContext";
import { IS_TYPING } from "../../servises/queries/isTyping";
import { IUser } from "../../interfaces/userInterface";
import styles from "./TypingList.module.scss";

interface ITypingListItem {
  user: IUser;
}
export default function TypingList() {
  const [typingUsersLogins, setTypingUsersLogins] = useState<any>([]);
  const { activeConvId, user } = useContext(userContext);
  /*eslint-disable-next-line*/
  const { data } = useSubscription(IS_TYPING, {
    variables: { convId: activeConvId },
    onSubscriptionData: (data) => {
      const typingList: ITypingListItem[] = data.subscriptionData.data.isTyping;
      if (typingList.length > 0) {
        setTypingUsersLogins(typingList.map(({ user: { login } }) => login));
      } else {
        setTypingUsersLogins([]);
      }
    },
  });
  const isCurrrentUserTyping =
    user && typingUsersLogins.includes(user.login) ? true : false;

  return (
    <div className={styles.typing}>
      {typingUsersLogins.length > 0 &&
        !isCurrrentUserTyping &&
        `${typingUsersLogins.join(", ")} is typing...`}
    </div>
  );
}
