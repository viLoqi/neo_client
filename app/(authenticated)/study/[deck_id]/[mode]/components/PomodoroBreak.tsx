import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import { useRouter } from "next/navigation";
import CountdownTimer from "./CountdownTimer";

interface ExtensionProps {
    handleBreakExtension: Function,
    handleEndBreak: Function,
}
const ExtensionScreen = ({ handleBreakExtension, handleEndBreak }: ExtensionProps) => {
    return (
        <div className="grid">
            <p>Do 5 more minutes?</p>
            <button onClick={_ => handleBreakExtension()}> YES </button>
            <button onClick={_ => handleEndBreak()}> NO </button>
        </div>
    )
}


interface Props {
    initialTime: number,
    setBreakLeft: Dispatch<SetStateAction<number>>,
    handleResetRound: Function,
}


const PomodoroBreak = ({ initialTime, setBreakLeft, handleResetRound }: Props) => {
    const router = useRouter();

    const [isOver, setIsOver] = useState(false)

    const [extensionsTaken, setExtensionsTaken] = useState(0)

    //TODO: gotta implement logic to a max of 2 extension and 2 break
    // when limit is reached we go to finish screen
    const [countdownTime, setCountdownTime] = useState(initialTime)

    const handleTimerOver = () => {
        setIsOver(true)

        if (extensionsTaken === 2) {
            handleEndBreak()
            return;
        }
    }

    const handleBreakExtension = () => {
        setExtensionsTaken(prev => prev + 1)
        setCountdownTime(5)
        setIsOver(false)
    }

    const handleEndBreak = () => {
        console.log("Break over!! Starting new session")
        handleResetRound()
    }

    return (
        isOver && extensionsTaken !== 2 ? <ExtensionScreen handleBreakExtension={handleBreakExtension} handleEndBreak={handleEndBreak} /> :
            <div className="relative bg-slate-800 w-full h-screen justify-center items-center flex flex-col">
                <CiCircleChevLeft className="absolute top-[4.25rem] left-12 cursor-pointer" size="50" color="white" onClick={() => router.back()} />
                <div className="flex flex-col rounded-2xl border-gray-500 border-[1px] justify-center items-center py-10 w-1/3 h-2/3 overflow-y-scroll no-scrollbar bg-[#45495e] text-white text-[3rem] font-bold">
                    <h1 className="font-semibold text-3xl mb-10">Break</h1>
                    <CountdownTimer initialTime={countdownTime * 3} handleTimerOver={handleTimerOver} />
                    <button onClick={handleEndBreak} className="w-3/5 flex p-3 mt-12 rounded-xl bg-blue-500 hover:bg-blue-700 items-center justify-center font-bold text-lg">
                        End break
                    </button>
                </div>
            </div >
    )
}

export default PomodoroBreak;