import { gql } from "@apollo/client";

export const GET_ALL_CONVERSATIONS = gql`
  query getAllConversations {
    getAllConversations {
      id
      createdBy
      name
      date
    }
  }
`;
