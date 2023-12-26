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

    const handleAdd = () => {
        const payload = { id: problems.length + 1, name, url, difficulty }
        fetch("https://ynlxun4uw0.execute-api.us-east-1.amazonaws.com/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then(() => { setRefresh(r => !r) }).catch(err => console.log(err))
        setName("")
        setUrl("")
        setDifficulty("Easy")
    }

    return <div className="m-4">
        <div className="flex gap-4">
            <input className="input input-bordered input-success w-full max-w-xs" onChange={e => setName(e.target.value)} placeholder="Name of problem"></input>
            <input className="input input-bordered input-success w-full max-w-xs" onChange={e => setUrl(e.target.value)} placeholder="URL of problem"></input>
            <select className="input input-bordered input-success w-full max-w-xs" onChange={e => setDifficulty(e.target.value)} placeholder="Difficulty of problem" value={difficulty}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
            </select>
            <button className="btn btn-success" onClick={handleAdd}>ADD</button>
        </div>
    </div>;
}

export default AddProblem;