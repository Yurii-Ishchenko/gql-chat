import { gql } from "@apollo/client";

export const CREATE_CONVERSATION = gql`
  mutation createConversation($name: String!) {
    createConversation(name: $name) {
      id
    }
  }
`;
