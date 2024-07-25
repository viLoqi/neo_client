import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface Props {
    initialTime: number,
    setBreakLeft: Dispatch<SetStateAction<number>>,
    handleResetRound: Function,
}

interface TimerProps {
    breakLeft: number,
}


const PomodoroBreak = ({ initialTime, setBreakLeft, handleResetRound }: Props) => {
    const router = useRouter();

    //TODO: gotta implement logic to a max of 2 extension and 2 break
    // when limit is reached we go to finish screen

    const [countdownTime, setCountdownTime] = useState(initialTime * 3)

    const handleBreakExtension = () => {
        console.log("Extending break by 5 minutes")
        setCountdownTime(5 * 60)
        startCountdown()
    }

    const handleSessionBreak = () => {
        console.log("Ending break")
        handleResetRound()
    }

    const handleEndBreak = () => {
        setBreakLeft(0)
        handleResetRound()
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
                    // handleResetRound()
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

    return countdownTime ?
        <div className="relative bg-slate-800 w-full h-screen justify-center items-center flex flex-col">
            <CiCircleChevLeft className="absolute top-[4.25rem] left-12 cursor-pointer" size="50" color="white" onClick={() => router.back()} />
            <div className="flex flex-col rounded-2xl border-gray-500 border-[1px] justify-center items-center py-10 w-1/3 h-2/3 overflow-y-scroll no-scrollbar bg-[#45495e] text-white text-[3rem] font-bold">
                <h1 className="font-semibold text-3xl mb-10">Break</h1>
                <p>{formatTime(countdownTime)}</p>
                <button onClick={handleEndBreak} className="w-3/5 flex p-3 mt-12 rounded-xl bg-blue-500 hover:bg-blue-700 items-center justify-center font-bold text-lg">
                    End break
                </button>
            </div>
        </div >
        : <div className="grid">
            <p>Do 5 more minutes?</p>
            <button onClick={handleBreakExtension}> YES </button>
            <button onClick={handleSessionBreak}> NO </button>
        </div>;
}

export default PomodoroBreak;