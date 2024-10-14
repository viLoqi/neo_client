import React, { useEffect, useRef, useState } from 'react'

interface Props {
    initialTime: number,
    handleTimerOver: Function,
}

const CountdownTimer = ({ initialTime, handleTimerOver }: Props) => {
    const [countdownTime, setCountdownTime] = useState(initialTime)

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startCountdown = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setCountdownTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerRef.current as NodeJS.Timeout);
                    handleTimerOver()
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
    }, [])

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

    return (
        <div>{formatTime(countdownTime)}</div>
    )
}

export default CountdownTimer