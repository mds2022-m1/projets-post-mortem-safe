import { gql, useMutation } from "@apollo/client";

const GET_TOKEN = gql`
mutation getToken($username: String!, $password: String!){
     authLogin(username: $username, password: $password){accessToken refreshToken user{ nom prenom id email}}
}
`;


export const useLogin = () => {
    return useMutation(GET_TOKEN)
}