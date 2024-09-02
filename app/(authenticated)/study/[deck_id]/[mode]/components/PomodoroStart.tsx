import { useState } from "react";
import { PomodoroConfigSchema } from "@/app/_types/main";
import PomodoroBreak from "./PomodoroBreak";
import PomodoroGame from "./PomodoroGame";
import PomodoroFinish from "./PomodoroFinish";

interface Props {
    config: PomodoroConfigSchema | {}
}

const PomodoroStart = ({ config }: Props) => {

    const [timeLeft, setTimeLeft] = useState("length" in config ? config.length : 30)
    const [breakLeft, setBreakLeft] = useState("break" in config ? config.break : 10)
    const [roundsLeft, setroundsLeft] = useState("rounds" in config ? config.rounds : 1)

    const handleFinishRound = () => {
        setroundsLeft(prev => {
            return prev - 1
        })
    }

    const handleResetRound = () => {
        setTimeLeft("length" in config ? config.length : 30)
    }

    if (roundsLeft <= 0) {
        return <PomodoroFinish />
    }

    if (timeLeft) {
        console.log("Current rounds left:", roundsLeft)
        return (
            <PomodoroGame initialTime={timeLeft} setTimeLeft={setTimeLeft} handleFinishRound={handleFinishRound} />
        )
    }

    return <PomodoroBreak initialTime={breakLeft} setBreakLeft={setBreakLeft} handleResetRound={handleResetRound} />;
}

export default PomodoroStart;