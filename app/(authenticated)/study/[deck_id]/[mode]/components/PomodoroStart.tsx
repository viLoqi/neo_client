import { useState } from "react";
import PomodoroBreak from "./PomodoroBreak";
import PomodoroGame from "./PomodoroGame";

const PomodoroStart = () => {

    const [timeLeft, setTimeLeft] = useState(100)

    return timeLeft ? <PomodoroGame timeLeft={timeLeft} setTimeLeft={setTimeLeft} /> : <PomodoroBreak timeLeft={timeLeft} setTimeLeft={setTimeLeft} />;
}

export default PomodoroStart;