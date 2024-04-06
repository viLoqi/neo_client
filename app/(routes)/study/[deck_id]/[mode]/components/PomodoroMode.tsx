import { useState } from "react";
import PomodoroConfig from "./PomodoroConfig";
import PomodoroStart from "./PomodoroStart";
import { PomodoroConfigSchema } from "@/app/_types/main";

const PomodoroMode = () => {
    const [config, setConfig] = useState<PomodoroConfigSchema | {}>({})


    const isConfigEmpty = Object.keys(config).length === 0;


    return isConfigEmpty ? <PomodoroConfig setConfig={setConfig} /> : <PomodoroStart />;
}

export default PomodoroMode;