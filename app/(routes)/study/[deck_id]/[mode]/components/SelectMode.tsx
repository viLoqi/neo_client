import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { CiCircleChevLeft } from "react-icons/ci";


const SelectMode = () => {
    const router = useRouter()

    const [mode, setMode] = useState(0)
    const handleSelectMode = (mode: number) => {
        console.log("Setting mode to ", mode)
        setMode(mode)
    }

    const { deck_id } = useParams()
    const path = usePathname()
    const freeModePath = path.replace("select", "free")
    const pomodoroModePath = path.replace("select", "pomodoro")

    const modeToPath = {
        0: path,
        1: freeModePath,
        2: pomodoroModePath
    }
    console.log(freeModePath, pomodoroModePath)

    return <div className="relative bg-slate-800 w-full h-screen justify-center items-center flex flex-col">
        <CiCircleChevLeft className="absolute top-[4.25rem] left-12 cursor-pointer" size="50" color="white" onClick={() => router.back()} />
        <div className="flex flex-col rounded-2xl border-gray-500 border-[1px] justify-center items-center w-1/3 h-2/3 overflow-y-scroll no-scrollbar bg-[#45495e]">
            <button className={`${mode == 1 ? "shadow-lg shadow-white" : ""} w-3/5 py-10 mb-5 text-black font-bold text-2xl
            bg-white rounded-3xl items-center justify-center flex`} onClick={() => handleSelectMode(1)}>
                📚 Free Mode
            </button>
            <h1 className="text-white font-bold text-xl mb-2">🌟 Active Learning Mode 🌟</h1>
            <button className={`${mode == 2 ? "shadow-lg shadow-yellow-300/50" : ""} w-3/5 py-10 mb-5 text-black font-bold text-2xl
        bg-yellow-300 rounded-3xl items-center justify-center flex`} onClick={() => handleSelectMode(2)}>
                ⏲️ Pomodoro Mode
            </button>
            <Link href={(modeToPath as any)[mode]} className="w-3/5">
                <button className="w-full flex p-3 rounded-xl bg-blue-500 items-center justify-center font-bold text-lg">
                    Start Studying
                </button>
            </Link>
        </div>
    </div>;
}

export default SelectMode;