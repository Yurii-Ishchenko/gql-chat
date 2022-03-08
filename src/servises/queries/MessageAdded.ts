import { gql } from "@apollo/client";

export const MESSAGE_ADDED = gql`
  subscription messageAdded($date: DateTime!) {
    messageAdded(date: $date) {
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
