import { gql } from "@apollo/client";

export const GET_MESSAGE_STATISTICS = gql`
  query getMessageStatistics {
    getMessageStatistics {
      count
      date
    }
  }
`;
