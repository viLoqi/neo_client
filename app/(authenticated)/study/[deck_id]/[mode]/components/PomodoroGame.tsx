import { Dispatch, SetStateAction } from "react";

interface Props {
    timeLeft: number,
    setTimeLeft: Dispatch<SetStateAction<number>>
    handleFinishRound: Function
}

const PomodoroGame = ({ timeLeft, setTimeLeft, handleFinishRound }: Props) => {
    const simulateTimeOut = () => {
        setTimeLeft(0)
        handleFinishRound() // Decrement session count
        // when the user runs out of time the following code will redirect user to the timeout page
    }
    return <div className="grid">This is Game Screen {timeLeft} minutes left. <button onClick={simulateTimeOut}>Click me to simulate time running out</button> </div>;
}

export default PomodoroGame;