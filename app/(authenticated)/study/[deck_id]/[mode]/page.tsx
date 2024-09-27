"use client";
import { useParams } from "next/navigation";

import SelectMode from "./components/SelectMode";
import PomodoroMode from "./components/PomodoroMode";
import FreeMode from "./components/FreeMode";
import FreeModeMobile from "./components/FreeModeMobile";
import { useEffect, useState } from "react";

const ModeSelectPage = () => {
    const { deck_id, mode } = useParams()

    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, [])

    const isMobile = width <= 760
    switch (mode) {
        case "select":
            return <SelectMode />
        case "free":
            if (isMobile) {
                return <FreeModeMobile />
            }
            return <FreeMode />
        case "pomodoro":
            return <PomodoroMode />
        default:
            return <div>Not a Valid MODE</div>
    }
}

export default ModeSelectPage;