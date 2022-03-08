import { gql } from "@apollo/client";

export const TYPING_USER = gql`
  query typingUser($convId: Int!) {
    typingUser(convId: $convId) {
      user {
        login
      }
    }
  }
`;
