import { useState } from "react";
import { PomodoroConfigSchema } from "@/app/_types/main";
import PomodoroBreak from "./PomodoroBreak";
import PomodoroGame from "./PomodoroGame";

interface Props {
    config: PomodoroConfigSchema | {}
}

const PomodoroStart = ({config}: Props) => {

    const [timeLeft, setTimeLeft] = useState("length" in config ? config.length : 30)

    return timeLeft ? <PomodoroGame timeLeft={timeLeft} setTimeLeft={setTimeLeft} /> : <PomodoroBreak timeLeft={timeLeft} setTimeLeft={setTimeLeft} />;
}

export default PomodoroStart;