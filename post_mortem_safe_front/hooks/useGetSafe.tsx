import { gql, useQuery } from "@apollo/client"

export const GET_SAFE = gql`
   query useGetSafe($userId: ID!) {
    useGetSafe(userID: $userId){
        files
    }
   }
`;

export const useGetSafe = (userId: string) => {
    console.log('userId : ',userId)
    return useQuery(GET_SAFE, {variables: userId})
}