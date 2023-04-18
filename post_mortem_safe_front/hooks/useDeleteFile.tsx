import { gql, useMutation } from "@apollo/client";

const DELETE_FILE = gql`
mutation deleteFile($file: String!){
  useDeleteFile(file: $file)
}
`;

export const useDeleteFile = () => {
    return useMutation<String>(DELETE_FILE);
}