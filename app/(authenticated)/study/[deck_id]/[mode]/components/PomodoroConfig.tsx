import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { PomodoroConfigSchema } from "@/app/_types/main";
import { CiCircleChevLeft } from "react-icons/ci";
import { useRouter } from "next/navigation";

interface Props {
    setConfig: Dispatch<SetStateAction<PomodoroConfigSchema>>
}

const PomodoroConfig = ({ setConfig }: Props) => {
    // After config is set, it'll automatically go to the start screen
    // Currently the configuration is not presisted when the user refreshes the page
    // We can look into presisting it on a future date
    // This is noted on Jira
    const router = useRouter();

    const [pomodoroConfig, setPomodoroConfig] = useState({
        studyLength: 0,
        breakLength: 0,
        numSessions: 0
    })

    const handleConfigChange = (name: String, ChangeEvent: ChangeEvent<HTMLInputElement> | undefined) => {
        let value = parseInt(ChangeEvent!.target.value);
        console.log("Setting " + name + " to " + value)
        if (name === "studyLength") setPomodoroConfig({ ...pomodoroConfig, studyLength: value })
        if (name === "breakLength") setPomodoroConfig({ ...pomodoroConfig, breakLength: value })
        if (name === "numSessions") setPomodoroConfig({ ...pomodoroConfig, numSessions: value })
    }

    const handleSubmit = () => {
        if (pomodoroConfig["studyLength"] === 0 ||
            pomodoroConfig["breakLength"] === 0 ||
            pomodoroConfig["numSessions"] === 0) return

        // console.log(pomodoroConfig["studyLength"] > 30 ? 30 : pomodoroConfig["studyLength"])
        // console.log(pomodoroConfig["breakLength"] > 10 ? 10 : pomodoroConfig["breakLength"])
        // console.log(pomodoroConfig["numSessions"] > 5 ? 5 : pomodoroConfig["numSessions"])
        setConfig(
            {
                length: pomodoroConfig["studyLength"] > 30 ? 30 : pomodoroConfig["studyLength"],
                break: pomodoroConfig["breakLength"] > 10 ? 10 : pomodoroConfig["breakLength"],
                rounds: pomodoroConfig["numSessions"] > 5 ? 5 : pomodoroConfig["numSessions"]
            }
        )
    }

    return <div className="relative bg-slate-800 w-full h-screen justify-center items-center flex flex-col">
        <CiCircleChevLeft className="absolute top-[4.25rem] left-12 cursor-pointer" size="50" color="white" onClick={() => router.back()} />
        <div className="flex flex-col rounded-2xl border-gray-500 border-[1px] justify-center items-center w-1/3 h-2/3 overflow-y-scroll no-scrollbar bg-[#45495e] text-white">
            <h1 className="font-bold text-xl mb-16">Session Configurations</h1>
            <div className="w-[70%] h-[35%] justify-between items-end flex flex-col">
                <pre>Pomodoro length <input id="studyLength" type="number" onChange={(e) => handleConfigChange("studyLength", e)} className="text-center text-black mx-2 py-[3px] w-[80px] border-[5px] border-slate-700"></input>  Minutes</pre>
                <pre>Break time length <input id="breakLength" type="number" onChange={(e) => handleConfigChange("breakLength", e)} name="break time" className="text-center text-black mx-2 py-[3px] w-[80px] border-[5px] border-slate-700"></input>  Minutes</pre>
                <pre>Number of sessions <input id="numSessions" type="number" onChange={(e) => handleConfigChange("numSessions", e)} name="number of sessions" className="text-center text-black mx-2 py-[3px] w-[80px] border-[5px] border-slate-700"></input> Sessions</pre>
            </div>
            <button onClick={() => handleSubmit()}
                className="w-3/5 flex p-3 mt-8 rounded-xl bg-blue-500 hover:bg-blue-700 items-center justify-center font-bold text-lg">
                Create
            </button>
        </div>
    </div >;
}

export default PomodoroConfig;