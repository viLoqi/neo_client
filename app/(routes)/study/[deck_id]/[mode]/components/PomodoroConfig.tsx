import { Dispatch, SetStateAction } from "react";
import { PomodoroConfigSchema } from "@/app/_types/main";

interface Props {
    setConfig: Dispatch<SetStateAction<PomodoroConfigSchema>>
}

const PomodoroConfig = ({ setConfig }: Props) => {
    // After config is set, it'll automatically go to the start screen
    // Currently the configuration is not presisted when the user refreshes the page
    // We can look into presisting it on a future date
    // This is noted on Jira
    return <div className="grid">This is Config Screen <button onClick={() => setConfig({ length: 100, break: 100, rounds: 100 })}>Click to set sample config</button></div>;
}

export default PomodoroConfig;