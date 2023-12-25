"use client"

import { useEffect, useRef, useState } from "react";


interface Problem {
    id: number,
    name: string,
    url: string
    checked_by: string[]
}

const LeetCode = () => {
    const [problems, setProblems] = useState([])
    const [refresh, setRefresh] = useState(false)

    const Row = ({ id, name, url, checked_by }: Problem) => {
        const nameRef = useRef<HTMLInputElement>(null)

        const handleAck = () => {
            fetch("https://ynlxun4uw0.execute-api.us-east-1.amazonaws.com/check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: id, who: nameRef.current!.value }) }).then(() => { setRefresh(r => !r) }).catch(err => console.log(err))
        }


        return <div className="m-10">
            <h1>{name}</h1> - <a href={url}>{url}</a>
            <p>This problem has been done by: {checked_by.map(p => <div key={crypto.randomUUID()}>{p}</div>)}</p>
            I have done this: <input type="text" ref={nameRef} className="bg-orange-500" placeholder="Put your name here :D"></input>
            <button className="bg-green-500" onClick={handleAck}>CLick ME TO ACKNOWLEDGE</button>
        </div>
    }


    useEffect(() => {
        fetch("https://ynlxun4uw0.execute-api.us-east-1.amazonaws.com/problems").then(async (r) => {
            const data = await r.json()
            setProblems(data["Items"])
        })
    }, [refresh])

    const nameRef = useRef<HTMLInputElement>(null)
    const urlRef = useRef<HTMLInputElement>(null)

    const handleAdd = () => {
        fetch("https://ynlxun4uw0.execute-api.us-east-1.amazonaws.com/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: problems.length + 1, name: nameRef.current!.value, url: urlRef.current!.value }) }).then(() => { setRefresh(r => !r) }).catch(err => console.log(err))
    }
    return <div>
        <p>ADD a problem</p>
        <input className="bg-orange-500" ref={nameRef} placeholder="Name of problem"></input>
        <br></br>
        <input className="bg-orange-500" ref={urlRef} placeholder="URL of problem"></input>
        <button onClick={handleAdd}>ADD</button>
        {problems.map((p: Problem) => <Row key={p.url} {...p} />)}

    </div>
}

export default LeetCode;