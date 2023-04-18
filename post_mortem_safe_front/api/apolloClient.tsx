import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
  cache: new InMemoryCache(),
  credentials: 'include',
});

export default apolloClient;