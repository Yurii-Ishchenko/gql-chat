import { gql } from "@apollo/client";

export const IS_TYPING = gql`
  subscription isTyping($convId: Float!) {
    isTyping(convId: $convId) {
      user {
        login
        id
      }
    }
  }
`;
