import { useState } from "react"
import { useDeleteFile } from "../hooks/useDeleteFile"

type Tprops = {
    data: Array<string>
}

export const List = (props: Tprops) => {

    const { data } = props

    const [list, setList] = useState(data)

    const computeDate = (data: Date) => {
        const date = new Date(data)
        return `${date.getDate().toLocaleString('fr-FR', {minimumIntegerDigits: 2})}/${date.getMonth().toLocaleString('fr-FR', {minimumIntegerDigits: 2})}/${date.getFullYear()} ${date.getHours().toLocaleString('fr-FR', {minimumIntegerDigits: 2})}:${date.getMinutes().toLocaleString('fr-FR', {minimumIntegerDigits: 2})}:${date.getSeconds().toLocaleString('fr-FR', {minimumIntegerDigits: 2})}` 
    }

    const onDelete = (file: string) => {
        useDeleteFile(file)
    }

    return (
        <ul>
        { list.map((file: any, index: number)=> {
        return (
            <li key={index}>
                <div className="flex justify-between">
                    <div>
                        <p>{file.name}</p>
                        <p>Type {file.type}</p>
                    </div>
                    <div><p>Date d'ajout : { computeDate(file.added as Date) }</p></div>
                </div>
                <div>
                    <button type="button" onClick={() => onDelete(`${file.name}.${file.type}`)}>Supprimer</button>
                </div>
            </li>
        )
        })
        }
        </ul>
    )
}
