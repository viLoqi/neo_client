"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CiCircleChevLeft } from "react-icons/ci";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { AnimatePresence } from "framer-motion"

import UsersPanel from "@/app/_components/UsersPanel";
import { CardSchema } from "@/app/_types/main";
import FlashCardCarousel from "./FlashCardCarousel";

const FreeMode = () => {
    const router = useRouter();

    const [cards, setCards] = useState<CardSchema[]>([])
    const [activeCardIndex, setActiveCardIndex] = useState(0)
    const { deck_id } = useParams()

    // for the countdown timer
    const [timerKey, setTimerKey] = useState(0);

    const getPrevCard = () => {
        activeCardIndex == 0 ? setActiveCardIndex(deckLength - 1) : setActiveCardIndex(activeCardIndex - 1);
        console.log("getting prev card...");
        setTimerKey(prevKey => prevKey + 1); // reset timer
    }

    const getNextCard = () => {
        setActiveCardIndex((activeCardIndex + 1) % deckLength);
        console.log("getting next card...");
        setTimerKey(prevKey => prevKey + 1); // reset timer
    }

    useEffect(() => {
        fetch(`/api/deck/${deck_id}`).then(async r => {
            const data = await r.json() as CardSchema
            if (Array.isArray(data) && data.length) {
                setCards(data)
                setActiveCardIndex(0)
            }
            else
                setCards([])
        })
    }, [deck_id])

    const duration = 70;
    const course = "Course TBD"
    const deckLength = cards.length

    console.log("current card index: " + activeCardIndex);
    return (
        <div className="flex h-screen bg-slate-800">
            <div className="flex flex-col w-full h-full bg-[#18593c]">
                {/* Course title */}
                <h1 className="flex w-full justify-center text-white font-semibold border-b-[1px] py-2 mb-1 border-black">
                    {course}
                </h1>
                <div className="flex h-full pl-12">
                    {/* Left side */}
                    <div className="flex flex-col">
                        {/* Back Button */}
                        <CiCircleChevLeft size="50" color="white" onClick={() => router.back()} />

                        {/* Timer */}
                        <div className="flex mt-[30vh] items-center justify-center text-white text-xl font-semibold size-36 justify-self-center">
                            <CountdownCircleTimer
                                isPlaying
                                key={timerKey}
                                size={150}
                                duration={duration}
                                colors={["#ffffff", "#F7B801", "#A30000"]}
                                colorsTime={[duration, duration / 2, 0]}
                            >
                                {({ remainingTime }) => {
                                    const minutes = Math.floor(remainingTime / 60)
                                    const seconds = (remainingTime % 60).toString().padStart(2, '0')
                                    return `${minutes}:${seconds}`;
                                }}
                            </CountdownCircleTimer>
                        </div>
                    </div>

                    <FlashCardCarousel cards={cards} />
                </div>
            </div>
            {/* Users panel */}
            <UsersPanel />
        </div>
    );
}

export default FreeMode;