import { gql } from "@apollo/client";

export const CONVERSATION_ADDED = gql`
  subscription conversationAdded {
    conversationAdded {
      id
      createdBy
      name
      date
    }
  }
`;
