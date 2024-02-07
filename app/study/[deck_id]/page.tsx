"use client";

import Question from "./Question";
import { useParams } from "next/navigation";
import { CardSchema } from "@/app/types";
import { useEffect, useState } from "react";

import ChoiceButton from "../../components/ChoiceButton";
import { CiCircleChevLeft } from "react-icons/ci";
import UserCard from "../../components/UserCard";
import Link from "next/link";
import { CountdownCircleTimer, type ColorFormat } from "react-countdown-circle-timer";
import { Dispatch } from "react";
import UsersPanel from "../../components/UsersPanel";

// Carolsuole
const StudyPage = () => {
    const [cards, setCards] = useState<CardSchema[]>([])
    const [activeCardIndex, setActiveCardIndex] = useState(0)
    // const [activeCard, setActiveCard] = useState<CardSchema>()
    const { deck_id } = useParams()

    

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
    const deckName = "DECK NAME"

    // return <Question card={activeCard!} cards={cards} setNextCard={setActiveCard} />;
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

                    {/* card */}
                    <Question cardIndex={activeCardIndex} cards={cards} setActiveCardIndex={setActiveCardIndex}/>
                </div>
            </div>
            {/* Users panel */}
            <UsersPanel />
        </div>
    );
}

export default StudyPage;