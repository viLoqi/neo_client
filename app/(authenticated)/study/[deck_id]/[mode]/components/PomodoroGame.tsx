import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import CountdownTimer from "./CountdownTimer";

interface Props {
    initialTime: number,
    setTimeLeft: Dispatch<SetStateAction<number>>
    handleFinishRound: Function
}

const PomodoroGame = ({ initialTime, setTimeLeft, handleFinishRound }: Props) => {
    const handleSessionOver = () => {
        setTimeLeft(0);
        handleFinishRound();
    }

    return <div className="grid">Session time left: {<CountdownTimer initialTime={initialTime * 10} handleTimerOver={handleSessionOver} />}. <button onClick={handleSessionOver}>Click me to simulate time running out</button> </div>;
}

export default PomodoroGame;