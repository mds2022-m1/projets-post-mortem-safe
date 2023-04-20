import { gql, useMutation } from "@apollo/client";

const UPLOAD_FILES = gql`
mutation useUploadFile($file: Upload!) {
    useUploadFile(file: $file)
}
`;

export const useUploadFile = () => {
    return useMutation<File>(UPLOAD_FILES);
}