"use client";

import { useParams } from "next/navigation";
import { CardSchema } from "@/app/types";
import { useEffect, useState } from "react";

import { CiCircleChevLeft } from "react-icons/ci";
import Link from "next/link";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import UsersPanel from "../../components/UsersPanel";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import Flashcard from "./Flashcard";

// Carolsuole
const StudyPage = () => {
    const [cards, setCards] = useState<CardSchema[]>([])
    const [activeCardIndex, setActiveCardIndex] = useState(0)
    const { deck_id } = useParams()

    // for the countdown timer
    const [timerKey, setTimerKey] = useState(0);

    const getPrevCard = () => {
        activeCardIndex == 0 ? setActiveCardIndex(cards.length - 1) : setActiveCardIndex(activeCardIndex - 1);
        console.log("getting prev card...");
        setTimerKey(prevKey => prevKey + 1); // reset timer
    }

    const getNextCard = () => {
        setActiveCardIndex((activeCardIndex + 1) % cards.length);
        console.log("getting next card...");
        setTimerKey(prevKey => prevKey + 1); // reset timer
    }

    useEffect(() => {
        fetch(`/api/deck/deck/${deck_id}`).then(async r => {
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
    const course = "TBD"

    console.log("current card index: " + activeCardIndex);
    return (
        <div className="flex h-screen">
            <div className="flex flex-col w-full h-full bg-[#18593c]">
                {/* Course title */}
                <h1 className="flex w-full justify-center text-white font-semibold border-b-[1px] py-2 mb-1 border-black">
                    {course}
                </h1>
                {/* main body */}
                <div className="flex h-full pl-12">
                    {/* Left side */}
                    <div className="flex flex-col">
                        {/* Back button */}
                        <Link href="/">
                            <CiCircleChevLeft size="50" color="white" />
                        </Link>
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

                    {/* middle section */}
                    <div className="flex w-full mx-20 items-center justify-between">
                        {/* prev button */}
                        <button className={`${activeCardIndex == 0 ? "invisible w-[3rem]" : "btn"}`} onClick={getPrevCard}><FaChevronLeft /></button>
                        {/* card */}
                        <div className="flex w-4/5 h-full mx-10 items-center justify-center relative" >
                            <Flashcard card={cards[activeCardIndex]}/>
                            <div className="flex absolute bottom-[4%] h-10 w-16 bg-white justify-center items-center rounded-full">
                                <p>{activeCardIndex + 1}/{cards.length}</p>
                            </div>
                        </div>
                        {/* next button */}
                        <button className={`${activeCardIndex == cards.length - 1 ? "invisible w-[3rem]" : "btn"}`} onClick={getNextCard}><FaChevronRight /></button>
                    </div>
                </div>
            </div>
            {/* Users panel */}
            <UsersPanel />
        </div>
    );
}

export default StudyPage;