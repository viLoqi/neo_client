import { Problem } from "./types";

const Aux = ({ id, name, checked_by }: Problem) => {
    return <div className="stats shadow m-10">
        <div className="stat">
            <div className="stat-title">{id}. {name}</div>
            <div className="stat-value">{checked_by.length}</div>
            <div className="stat-desc">Users has solved</div>
        </div>

    </div>
}
const Stat = ({ problems }: { problems: Problem[] }) => {


    return problems.map((p: Problem) => <Aux key={p.id} {...p} />)
}

export default Stat;