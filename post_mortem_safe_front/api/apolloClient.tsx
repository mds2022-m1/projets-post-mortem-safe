import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';


const apolloClient = new ApolloClient({
  link: createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    fetch,
    fetchOptions: { credentials: 'include' },
  }),
  cache: new InMemoryCache(),
  credentials: 'include',
});

export default apolloClient;