import { Problem } from "./types";
import Bar from "./Bar";


const Aux = ({ name, number, index }: { name: string, number: number, index: number }) => {

    let text_color = "text-content"

    if (index == 0)
        text_color = "text-yellow-300"
    else if (index == 1)
        text_color = "text-slate-200"
    else if (index == 2)
        text_color = "text-amber-700"

    return <div className="stats shadow">
        <div className="stat">
            <div className="stat-title text-info">{name}</div>
            <div className={`stat-value ${text_color}`}>{number}</div>
            <div className="stat-desc">problems solved</div>
        </div>
    </div >
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
    if (array.length)
        return (<>
            <div className="grid grid-flow-col m-8 gap-4">
                {array.map((p, i) => <Aux key={crypto.randomUUID()} name={p.label} number={p.data.length} index={i} />)}
            </div>
            <Bar data={array} />
        </>)

    return null
}

export default Stat;