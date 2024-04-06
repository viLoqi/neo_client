"use client";
import { useParams } from "next/navigation";

import SelectMode from "./components/SelectMode";
import PomodoroMode from "./components/PomodoroMode";
import FreeMode from "./components/FreeMode";

const ModeSelectPage = () => {
    const { deck_id, mode } = useParams()

    switch (mode) {
        case "select":
            return <SelectMode />
        case "free":
            return <FreeMode />
        case "pomodoro":
            return <PomodoroMode />
        default:
            return <div>Not a Valid MODE</div>
    }
}

export default ModeSelectPage;