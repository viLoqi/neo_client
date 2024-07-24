import { Dispatch, SetStateAction, useState } from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface Props {
    breakLeft: number,
    setBreakLeft: Dispatch<SetStateAction<number>>,
    handleResetRound: Function,
}

interface TimerProps {
    breakLeft: number,
}
const BreakTimer = ({ breakLeft }: TimerProps) => {

    // return <div className="grid">You are on break for: {timeLeft} minutes <button onClick={handleEndBreak}>Simulate Ending Break</button></div>
    return <CountdownCircleTimer
        isPlaying
        size={200}
        duration={breakLeft * 60}
        colors="#ffffff"
    >
        {({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60)
            const seconds = (remainingTime % 60).toString().padStart(2, '0')
            return `${minutes}:${seconds}`;
        }}
    </CountdownCircleTimer>
}


const PomodoroBreak = ({ breakLeft, setBreakLeft, handleResetRound }: Props) => {
    const router = useRouter();

    //TODO: gotta implement logic to a max of 2 extension and 2 break
    // when limit is reached we go to finish screen

    const [breakTime, setBreakTime] = useState(breakLeft)

    const handleSessionExtension = () => {
        // setBreakLeft(prev => prev + 5)
        // console.log("Break left:",breakLeft)
        setBreakTime(5)
    }

    const handleSessionBreak = () => {
        // setBreakTime(5)
        handleResetRound()
    }

    const handleEndBreak = () => {
        setBreakTime(0)
    }

    return breakTime ? <div className="relative bg-slate-800 w-full h-screen justify-center items-center flex flex-col">
        <CiCircleChevLeft className="absolute top-[4.25rem] left-12 cursor-pointer" size="50" color="white" onClick={() => router.back()} />
        <div className="flex flex-col rounded-2xl border-gray-500 border-[1px] items-center py-10 w-1/3 h-2/3 overflow-y-scroll no-scrollbar bg-[#45495e] text-white text-[3rem] font-bold">
            <h1 className="font-semibold text-3xl mb-10">Break</h1>
            <BreakTimer breakLeft={breakTime}/>
            <button onClick={handleEndBreak} className="w-3/5 flex p-3 mt-12 rounded-xl bg-blue-500 hover:bg-blue-700 items-center justify-center font-bold text-lg">
                End break
            </button>
        </div>
    </div > : <div className="grid">
        <p>Do 5 more minutes?</p>
        <button onClick={handleSessionExtension}> YES </button>
        <button onClick={handleSessionBreak}> NO </button>
    </div>;
}

export default PomodoroBreak;