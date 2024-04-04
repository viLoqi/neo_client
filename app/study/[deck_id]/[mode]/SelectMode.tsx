import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const SelectMode = () => {
    const { deck_id } = useParams()
    const path = usePathname()
    const freeModePath = path.replace("select", "free")
    const pomodoroModePath = path.replace("select", "pomodoro")
    return <div className="grid"><Link href={freeModePath}>Free Mode</Link><Link href={pomodoroModePath}>Pomodoro Mode</Link></div>;
}

export default SelectMode;