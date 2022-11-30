import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery } from '@apollo/client'
import client from '../api/apolloClient'
import { gql } from '../__generated__/gql';
import apolloClient from '../api/apolloClient';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
