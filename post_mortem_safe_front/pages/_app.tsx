import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../api/apolloClient';
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
