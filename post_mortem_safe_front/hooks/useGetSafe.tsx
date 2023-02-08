import { gql, useQuery } from "@apollo/client"

export const GET_SAFE = gql`
   query useGetSafe{
    useGetSafe{
        files {
            name
            type
            added
        }
    }
   }
`;

export const useGetSafe = () => {
    return useQuery(GET_SAFE)
}