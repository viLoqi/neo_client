import { CheckObj, Problem } from "./types";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useEffect, useState } from "react";

const ProblemTableHeading = () => {
    return <tr>
        <th></th>
        <th>Problem</th>
        <th>Difficulty</th>
        <th>Completed</th>
    </tr>
}

const ProblemTableRow = ({ id, name, url, difficulty, checked_by }: Problem) => {
    const [user, loading] = useAuthState(auth);
    const [checked, setChecked] = useState(false)

    useEffect(() => { setChecked(checked_by.filter(entry => entry.email == user?.email).length > 0) }, [checked, checked_by, user?.email])

    const text_color = difficulty == "Easy" ? "text-success" : difficulty == "Medium" ? "text-warning" : "text-error"
    const handleAck = () => {
        const payload = { id: id, who: user?.displayName, email: user?.email }
        const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
        fetch("https://ynlxun4uw0.execute-api.us-east-1.amazonaws.com/check", options)
        setChecked(true)
    }
    return <tr>
        <th>{id}</th>
        <td><a className="hover:text-blue-500" href={url}>{name}</a></td>
        <td className={text_color}>{difficulty}</td>
        <td><input type="checkbox" onChange={handleAck} disabled={checked} checked={checked}></input></td>
    </tr>


}

const ProblemTable = ({ problems }: { problems: Problem[] }) => {

    return <div className="overflow-x-auto">
        <table className="table table-xs">
            <thead>
                <ProblemTableHeading />
            </thead>
            <tbody>
                {problems.map((p: Problem) => <ProblemTableRow key={p.id} {...p} />)}
            </tbody>
            <tfoot>
                <ProblemTableHeading />
            </tfoot>
        </table>
    </div>
}

export default ProblemTable