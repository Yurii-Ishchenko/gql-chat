/*eslint-disable*/

import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_SERVER_URL,
});

export const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_APOLLO_SERVER_WSS_URL}`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => {
      return { "access-token": localStorage.getItem("token") || null };
    },
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "access-token": localStorage.getItem("token") || null,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),

  link: concat(authMiddleware, link),
});
export default client;
