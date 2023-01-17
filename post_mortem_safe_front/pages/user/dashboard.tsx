import * as fs from 'fs'
import { GET_SAFE, useGetSafe } from '../../hooks/useGetSafe'
import * as jose from "jose"
import { useCookies } from 'react-cookie';
import { useQuery } from '@apollo/client';

export default function Dashboard(){

    const [cookies] = useCookies(['user']);
    console.log(cookies)

    const { loading, error, data } = useQuery(GET_SAFE);

    console.log(data)

    return(
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}