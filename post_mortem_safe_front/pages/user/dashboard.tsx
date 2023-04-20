import { FileUpload } from '../../components/fileUpload'
import { List } from '../../components/list'
import { useGetSafe } from '../../hooks/useGetSafe'

export default function Dashboard(){

     const { loading, error, data } = useGetSafe()

    return(
        <div>
            <h1>Dashboard</h1>
            { !loading && (
                <div>
                <List data={data.useGetSafe.files} />
                <FileUpload />
                </div>
            ) }
        </div>
    )
}