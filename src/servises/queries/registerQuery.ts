import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation registration(
    $avatar: String!
    $email: String!
    $password: String!
    $login: String!
  ) {
    registration(
      avatar: $avatar
      email: $email
      password: $password
      login: $login
    ) {
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
