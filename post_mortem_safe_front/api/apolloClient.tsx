import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

console.log(process.env.PUBLIC_API_URL)
const httpLink = new HttpLink({
  uri: `${process.env.API_URL}/graphql`,
  credentials: 'same-origin'
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;