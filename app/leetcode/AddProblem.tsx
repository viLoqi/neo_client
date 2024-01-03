import { useState, Dispatch, SetStateAction } from "react"
import { Problem } from "./types"

interface AddProblemProp {
    problems: Problem[],
    setRefresh: Dispatch<SetStateAction<boolean>>
}

const AddProblem = ({ problems, setRefresh }: AddProblemProp) => {
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const [difficulty, setDifficulty] = useState("Easy")
    const [disabled, setDisabled] = useState(false)

    const handleAdd = () => {
        const payload = { id: problems.length + 1, name, url, difficulty }
        if (name && url && difficulty && name !== "THIS CAN NOT BE EMPTY" && url !== "THIS CAN NOT BE EMPTY") {
            setDisabled(true)
            fetch("https://ynlxun4uw0.execute-api.us-east-1.amazonaws.com/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then(() => {
                setRefresh(r => !r)
                setDisabled(false)
            }).catch(err => {
                console.log(err)
                setDisabled(false)
            })
            setName("")
            setUrl("")
            setDifficulty("Easy")
        }
        else {
            setName("THIS CAN NOT BE EMPTY")
            setUrl("THIS CAN NOT BE EMPTY")
            setDifficulty("Easy")
        }
    }

    return <div className="m-4">
        <div className="flex gap-4">
            <input className="input input-bordered input-success w-full max-w-xs" onChange={e => setName(e.target.value)} value={name} placeholder="Name of problem"></input>
            <input className="input input-bordered input-success w-full max-w-xs" onChange={e => setUrl(e.target.value)} value={url} placeholder="URL of problem"></input>
            <select className="input input-bordered input-success w-full max-w-xs" onChange={e => setDifficulty(e.target.value)} value={difficulty} placeholder="Difficulty of problem">
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
            </select>
            <button className="btn btn-success" onClick={handleAdd} disabled={disabled}>ADD</button>
        </div>
    </div>;
}

export default AddProblem;