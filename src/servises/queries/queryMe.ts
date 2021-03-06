import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      user {
        id
        login
        email
        avatar
      }
      token
    }
  }
`;
