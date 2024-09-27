import React, { useState, useEffect } from 'react';

interface Props {
    duration: number,
    isOver: boolean,
    activeCardIndex: number,
    numCards: number,
    onComplete: Function,
}

function ProgressBarTimer({ duration, isOver, activeCardIndex, numCards, onComplete }: Props) {
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const [timerColor, setTimerColor] = useState('green');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 0) {
                    onComplete()
                    clearInterval(intervalId);
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [duration]);

    const progress = (timeRemaining / duration) * 100;

    useEffect(() => {
        if (progress < 67) {
            setTimerColor('yellow');
        } else if (progress < 20) {
            setTimerColor('red');
        }
    }, [progress])

    if (isOver) {
        return (
            <div className="absolute flex flex-col items-center w-full p-4 top-0">
                <h1 className="animate-bounce">Times up!</h1>
                <h1 className="text-sm">{activeCardIndex == numCards - 1 ? "Session over!" : `Next card in ${timeRemaining}`}</h1>
            </div>
        )
    }

    return (
        <div className='absolute flex flex-col w-full p-4 top-0 space-y-2'>
            <div className='duration-1000 rounded-lg' style={{ width: `${progress}%`, height: '20px', backgroundColor: timerColor }}></div>
            <p className='self-center'>Time remaining: {timeRemaining} seconds</p>
        </div>
    );
}

export default ProgressBarTimer;