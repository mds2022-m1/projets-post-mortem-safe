import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery } from '@apollo/client'
import client from '../api/apolloClient'
import { gql } from '../__generated__/gql';
import apolloClient from '../api/apolloClient';
import Guard from '../components/Guard';
import { CookiesProvider } from 'react-cookie';

export default function App({ Component, pageProps }: AppProps) {

  return (
      <ApolloProvider client={apolloClient}>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </ApolloProvider>

  )
}
