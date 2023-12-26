import { CheckObj, Problem } from "./types";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import moment from "moment";

const ProblemTableHeading = () => {
    return <tr>
        <th></th>
        <th>Problem</th>
        <th>Date Added</th>
        <th>Difficulty</th>
        <th>Date Completed</th>
        <th>Completed</th>
    </tr>
}

interface PTR extends Problem {
    setRefresh: Dispatch<SetStateAction<boolean>>
}

const ProblemTableRow = ({ id, name, date_added, url, difficulty, checked_by, setRefresh }: PTR) => {
    const [user, loading] = useAuthState(auth);
    const [checked, setChecked] = useState(false)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        setDisabled(checked_by.filter(entry => entry.email == user?.email).length > 0)
        setChecked(checked_by.filter(entry => entry.email == user?.email).length > 0)
    }, [checked, checked_by, user?.email])

    const text_color = difficulty == "Easy" ? "text-success" : difficulty == "Medium" ? "text-warning" : "text-error"

    const handleAck = () => {
        const payload = { id: id, who: user?.displayName, email: user?.email }
        const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
        fetch("https://ynlxun4uw0.execute-api.us-east-1.amazonaws.com/check", options).then(() => {
            setRefresh(prev => !prev)
        })
    }
    return <tr>
        <th>{id}</th>
        <td><a className="hover:text-blue-500" href={url}>{name}</a></td>
        <td>{moment(date_added).format("MM/DD/YY")}</td>
        <td className={text_color}>{difficulty}</td>
        <td>{checked ? <>{moment((checked_by.filter(entry => entry.email == user?.email)[0]?.when)).fromNow()}</> : <>--</>}</td>
        <td><input type="checkbox" onChange={handleAck} disabled={disabled} checked={checked} onClick={() => setDisabled(true)}></input></td>
    </tr>


}

interface ProblemTableProp {
    problems: Problem[],
    setRefresh: Dispatch<SetStateAction<boolean>>
}


const ProblemTable = ({ problems, setRefresh }: ProblemTableProp) => {
    return <div className="overflow-x-auto">
        <table className="table table-xs">
            <thead>
                <ProblemTableHeading />
            </thead>
            <tbody>
                {problems.map((p: Problem) => <ProblemTableRow key={p.id} {...p} setRefresh={setRefresh} />)}
            </tbody>
            <tfoot>
                <ProblemTableHeading />
            </tfoot>
        </table>
    </div>
}

export default ProblemTable