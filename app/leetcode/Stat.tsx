import { Problem } from "./types";
import Bar from "./Bar";


const Aux = ({ name, number }: { name: string, number: number }) => {
    return <div className="stats shadow m-10">
        <div className="stat">
            <div className="stat-title text-info">{name}</div>
            <div className="stat-value text-warning">{number}</div>
            <div className="stat-desc">problems solved</div>
        </div>

    </div>
}
const Stat = ({ problems }: { problems: Problem[] }) => {

    const map = new Map()

    for (const element of problems) {
        element.checked_by.forEach(p => {
            if (!map.has(p.who)) {
                map.set(p.who, [element])
            } else {
                map.get(p.who).push(element)
            }
        })
    }

    const array = Array.from(map, ([who, value]) => ({ label: who, data: value }));


    array.sort(function (a, b) {
        if (a.data.length < b.data.length) return 1;
        if (a.data.length > b.data.length) return -1;
        return 0;
    })

    return (<>
        {array.map(p => <Aux key={crypto.randomUUID()} name={p.label} number={p.data.length} />)}
        <Bar data={array} />
    </>)
}

export default Stat;