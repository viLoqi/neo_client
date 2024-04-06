"use client"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/_modules/firebase"

import { Problem } from "@/app/_types/leetcode";
import ProblemTable from "./components/ProblemTable";
import Stat from "./components/Stat";
import AddProblem from "./components/AddProblem";

const LeetCode = () => {
    const [problems, setProblems] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        fetch("https://ynlxun4uw0.execute-api.us-east-1.amazonaws.com/problems").then(async (r) => {
            const data = await r.json()
            data["Items"].sort(function (a: Problem, b: Problem) {
                if (a.id < b.id) return -1;
                if (a.id > b.id) return 1;
                return 0;
            });
            setProblems(data["Items"])
        })
    }, [refresh])

    const [user, loading] = useAuthState(auth);
    if (user)
        return <div>
            <AddProblem problems={problems} setRefresh={setRefresh} />
            <ProblemTable problems={problems} setRefresh={setRefresh} />
            <Stat problems={problems} />
        </div>
    else {
        return <Link href="/">Click here to login!!</Link>
    }
}

export default LeetCode;