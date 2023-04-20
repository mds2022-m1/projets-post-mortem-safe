import { FC, FormEvent, useState } from "react";
import { GET_SAFE } from "../hooks/useGetSafe";
import { useUploadFile } from "../hooks/useUploadFile";

export const FileUpload: FC = () => {

    const [files, setFiles] = useState<FileList | null>(null)

    const [uploadFile] = useUploadFile()

    const onSave = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if(!files) return

        for(const file of files){
            uploadFile({
                variables: {
                    file,
                },
                refetchQueries: [ GET_SAFE ]
            })
        }
    }


    return (
        <div>
            <form onSubmit={onSave}>
                <input type="file" multiple name="file" onChange={e => setFiles(e.target.files)} />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    )
}