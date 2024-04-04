"use client";
import React from "react";
import { useParams } from "next/navigation";
import SelectMode from "./SelectMode";
import PomodoroMode from "./PomodoroMode";
import FreeMode from "./FreeMode";

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