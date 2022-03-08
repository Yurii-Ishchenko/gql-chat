import { useState } from "react";
import { useSubscription } from "@apollo/client";
import { MESSAGE_ADDED } from "../../servises/queries/MessageAdded";

export default function useSubscribeMessage() {
  const [date, setDate] = useState(() => new Date().toISOString());
  const { data } = useSubscription(MESSAGE_ADDED, {
    variables: { date },
    onSubscriptionData: (data) => {
      const messageList = data.subscriptionData.data.messageAdded;
      setDate(messageList[messageList.length - 1].date);
    },
  });

  return data?.messageAdded[data.messageAdded.length - 1];
}
