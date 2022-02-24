import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const API_URL =
  process.env.NEXT_PUBLIC_API_GRAPHQL_URL || "http://localhost:1337/graphql";

const defaultOptions = {
  watchQuery: {
    // fetchPolicy: "no-cache",
    // errorPolicy: "ignore",
  },
  query: {
    // fetchPolicy: "no-cache",
    // errorPolicy: "all",
  },
};

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({}),
  // cache: new InMemoryCache({
  //   typePolicies: {
  //     Query: {
  //       fields: {
  //         posts: {
  //           //Query name
  //           keyArgs: false,
  //           // Concatenate prev with new
  //           merge(existing = [], incoming) {
  //             return [...existing, ...incoming];
  //           },
  //         },
  //       },
  //     },
  //   },
  // }),
  defaultOptions: defaultOptions,
});

export default client;
