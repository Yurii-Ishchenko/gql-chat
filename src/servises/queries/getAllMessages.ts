import { gql } from "@apollo/client";

export const GET_ALL_MESSAGES = gql`
  query getAllMessages($convId: Int) {
    getAllMessages(convId: $convId) {
      id
      description
      userId
      convId
      date
      user {
        id
        login
        email
        avatar
      }
    }
  }
`;
