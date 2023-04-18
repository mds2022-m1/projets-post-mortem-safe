import { gql, useMutation } from "@apollo/client";

const DELETE_FILE = gql`
mutation userCreate($file: String!) {
    userCreate(input: $file){
        user {
            email,
            id
        }
    }
}
`;

export const useDeleteFile = (file: string) => {
    return useMutation<String>(DELETE_FILE);
}