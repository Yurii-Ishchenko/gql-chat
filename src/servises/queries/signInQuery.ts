import { gql } from "@apollo/client";

export const SIGNIN = gql`
  query signIn($password: String!, $email: String!) {
    signIn(password: $password, email: $email) {
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
