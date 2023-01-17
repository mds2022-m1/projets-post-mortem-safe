import { gql, useQuery } from "@apollo/client"

export const GET_SAFE = gql`
   query useGetSafe{
    useGetSafe{
        files
    }
   }
`;

export const useGetSafe = () => {
    console.log('userId : ')
    return useQuery(GET_SAFE)
}