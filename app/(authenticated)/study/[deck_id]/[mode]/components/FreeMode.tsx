"use client";

import { useRouter } from "next/navigation";
import { CiCircleChevLeft } from "react-icons/ci";
import UsersPanel from "@/app/_components/UsersPanel";
import CountdownTimer from "./CountdownTimer";
import FlashcardCarousel from "./FlashcardCarousel";

const FreeMode = () => {
    const router = useRouter();

    const course = "TBD"

    const handleEndSession = () => {
        console.log("Ending session...")
        router.back()
    }

    return (
        <div className="flex h-screen bg-slate-800">
            <div className="flex flex-col w-full h-full bg-[#18593c]">
                <h1 className="flex w-full justify-center text-white font-semibold border-b-[1px] py-2 mb-1 border-black">
                    {course}
                </h1>
                <div className="flex h-full pl-12">
                    <div className="flex flex-col">
                        <CiCircleChevLeft size="50" color="white" onClick={handleEndSession} />
                        <div className="flex my-auto items-center justify-center text-white text-xl font-semibold size-36 justify-self-center">
                            <CountdownTimer initialTime={300} handleTimerOver={handleEndSession} />
                        </div>
                    </div>

                    <FlashcardCarousel/>
                </div>
            </div>
            <UsersPanel />
        </div>
    );
}

export default FreeMode;