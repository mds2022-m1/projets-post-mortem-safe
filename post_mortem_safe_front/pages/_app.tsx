import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery } from '@apollo/client'
import client from '../apolloClient'
import { gql } from '../__generated__/gql';

const GET_USERS = gql(`
    query getUsers {
      Users {
        id
        nom
        prenom
        email
        mdp
      }
    }
  `);

const GET_USER = gql(`
    query getUser(id) {
      Users {
        id
        nom
        prenom
        email
        mdp
      }
    }
  `);

const ADD_USER = gql(`
    mutation userCreate($nom: String!, $prenom: String!, $email: String!, $mdp: String!) {
      userCreate(nom: $nom, prenom: $prenom, email: $email, mdp: $mdp) {
        id
        nom
        prenom
        email
        mdp
      }
    }
  `);


export default function App({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
