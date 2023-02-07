import { useGetSafe } from '../../hooks/useGetSafe'

export default function Dashboard(){

     const { loading, error, data } = useGetSafe()

     console.log("get safe",data, error)


    return(
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}