import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql`
  mutation createMessage($description: String!, $convId: Int) {
    createMessage(description: $description, convId: $convId) {
      id
    }
  }
`;
