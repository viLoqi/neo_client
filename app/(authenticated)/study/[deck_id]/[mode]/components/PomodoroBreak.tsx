import { Dispatch, SetStateAction, useState } from "react";

interface Props {
    timeLeft: number,
    setTimeLeft: Dispatch<SetStateAction<number>>
}

const BreakTimer = ({ timeLeft, setTimeLeft }: Props) => {

    const handleEndBreak = () => {
        setTimeLeft(0)
    }

    return <div className="grid">You are on break for: {timeLeft} minutes <button onClick={handleEndBreak}>Simulate Ending Break</button></div>
}


const PomodoroBreak = ({ timeLeft, setTimeLeft }: Props) => {

    //TODO: gotta implement logic to a max of 2 extension and 2 break
    // when limit is reached we go to finish screen

    const [breakTime, setBreakTime] = useState(0)

    const handleSessionExtension = () => {
        setTimeLeft(prev => prev + 5)
    }

    const handleSessionBreak = () => {
        setBreakTime(5)
    }

    return breakTime ? <BreakTimer timeLeft={breakTime} setTimeLeft={setBreakTime} /> : <div className="grid">
        <p>Do 5 more minutes?</p>
        <button onClick={handleSessionExtension}> YES </button>
        <button onClick={handleSessionBreak}> NO </button>
    </div>;
}

export default PomodoroBreak;