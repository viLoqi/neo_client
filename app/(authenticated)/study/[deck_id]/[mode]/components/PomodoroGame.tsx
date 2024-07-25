import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

interface Props {
    initialTime: number,
    setTimeLeft: Dispatch<SetStateAction<number>>
    handleFinishRound: Function
}

const PomodoroGame = ({ initialTime, setTimeLeft, handleFinishRound }: Props) => {
    const [countdownTime, setCountdownTime] = useState(initialTime * 3)


    const timeoutCalledRef = useRef(false);
    const simulateTimeout = () => {
        if (!timeoutCalledRef.current) {
            timeoutCalledRef.current = true;
            console.log("Timeout reached. Calling simulateTimeout");
            setTimeLeft(0);
            handleFinishRound(); // Decrement session count
        }
    }

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startCountdown = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setCountdownTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerRef.current as NodeJS.Timeout);
                    simulateTimeout();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }
    useEffect(() => {
        startCountdown()
    }, []);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

    return <div className="grid">Session time left: {formatTime(countdownTime)}. <button onClick={simulateTimeout}>Click me to simulate time running out</button> </div>;
}

export default PomodoroGame;