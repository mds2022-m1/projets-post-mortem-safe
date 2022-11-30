import { gql } from '../../__generated__/gql';

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




/* Exemple Playground

  mutation {
    userCreate(nom: "Laroche", prenom: "Jordan", email: "jojo@gmail.com", mdp: "1234") {
      nom
      prenom
      email
      mdp
    }


*/
