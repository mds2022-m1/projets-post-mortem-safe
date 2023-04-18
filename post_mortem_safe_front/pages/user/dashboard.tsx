import { List } from '../../components/list'
import { useGetSafe } from '../../hooks/useGetSafe'

export default function Dashboard(){

     const { loading, error, data } = useGetSafe()

    return(
        <div>
            <h1>Dashboard</h1>
            { !loading && (
                <List data={data.useGetSafe.files} />
            ) }
        </div>
    )
}