import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { fetch } from "cross-fetch";
import { logger } from "@modules/log";

const log = logger("APOLLO");

export const minaNodeClient = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          log.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) log.error(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: process.env.MINA_NODE_GQL,
      // credentials: 'same-origin',
      fetch: fetch,
    }),
  ]),
  cache: new InMemoryCache(),
});
