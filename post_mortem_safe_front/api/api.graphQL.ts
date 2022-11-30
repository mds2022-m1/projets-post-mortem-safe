import { TypedDocumentNode } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { gql } from '../__generated__/gql';

export const GET_USERS = gql(`
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

export const GET_USER = gql(`
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






/* Exemple Playground

  mutation {
    userCreate(nom: "Laroche", prenom: "Jordan", email: "jojo@gmail.com", mdp: "1234") {
      nom
      prenom
      email
      mdp
    }


*/
