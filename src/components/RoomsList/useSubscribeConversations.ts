import { useSubscription } from "@apollo/client";
import { CONVERSATION_ADDED } from "../../servises/queries/conversationAdded";

export default function useSubscribeConversations() {
  const { data } = useSubscription(CONVERSATION_ADDED);
  return data?.conversationAdded;
}
