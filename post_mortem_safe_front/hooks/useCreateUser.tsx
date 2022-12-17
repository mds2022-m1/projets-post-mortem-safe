import { gql, useMutation } from "@apollo/client";

interface CreatUserInput {
    nom: string,
    prenom: string,
    email: string,
    mdp: string
}

interface User {
    email:string,
    id: string
}

const CREATE_USER = gql`
mutation userCreate($createUserData: CreateUserInput!) {
    userCreate(input: $createUserData){
        user {
            email,
            id
        }
    }
}
`;

export const useCreateUser = () => {
    return useMutation<User, CreatUserInput>(CREATE_USER);
}