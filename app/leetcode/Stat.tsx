import { Problem } from "./types";
const Aux = ({ id, name, checked_by }: Problem) => {
    return <div className="stats shadow m-10">
        <div className="stat">
            <div className="stat-title">{id}. {name}</div>
            <div className="stat-value">{checked_by.length}</div>
            <div className="stat-desc">Users has solved</div>
            {checked_by.map(p => { return <span key={p.when}>{p.who}</span> })}
        </div>

    </div>
}
const Stat = ({ problems }: { problems: Problem[] }) => {

    const map = new Map()

    for (const element of problems) {
        element.checked_by.forEach(p => {
            if (!map.has(p.who)) {
                map.set(p.who, 1)
            } else {
                map.set(p.who, map.get(p.who) + 1)
            }
        })
    }

    const array = Array.from(map, ([who, value]) => ({ label: who, data: value }));


    return (<>
        {array.map(p => <p key={crypto.randomUUID()} className="m-4">{p.label} has solved {p.data}</p>)}
        {problems.map((p: Problem) => <Aux key={p.id} {...p} />)}
    </>)
}

export default Stat;