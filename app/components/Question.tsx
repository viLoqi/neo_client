"use client";
import ChoiceButton from "../components/ChoiceButton";
import { CiCircleChevLeft } from "react-icons/ci";
import UserCard from "../components/UserCard";
import Link from "next/link";
import { CountdownCircleTimer, type ColorFormat } from "react-countdown-circle-timer";
import { CardSchema } from "../types";
import { Dispatch } from "react";
import UsersPanel from "./UsersPanel";

interface Props {
    card: CardSchema,
    setNextCard: Dispatch<CardSchema>,
    cards: CardSchema[]
}
const Question = ({ card, cards, setNextCard }: Props) => {

    if (card === undefined)
        return <>NO CARD</>



    const duration = 70;

    const course = "TBD"
    const deckName = "DECK NAME"

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

                    {/* Card */}
                    <div className="flex w-full h-full mx-20 items-center">
                        <div className="flex flex-col w-full h-4/5 py-8 items-center justify-evenly rounded-[50px] bg-white">
                            {/* Deck title */}
                            <h1 className="font-bold text-3xl">
                                {deckName}
                            </h1>
                            {/* Question */}
                            <div className="w-4/5 mt-5">
                                <p className="whitespace-pre font-bold text-sm">
                                    {card.question}
                                </p>
                            </div>
                            {/* Answer choices */}
                            <div className="grid grid-cols-2 gap-3 w-4/5">
                                {["WRONG", "WRONG", "WRONG", card.answer].map((choice) => {
                                    return (
                                        <ChoiceButton
                                            key={choice}
                                            text={choice}
                                            isCorrect={choice === card.answer}
                                        />
                                    );
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Users panel */}
            <UsersPanel />
        </div>
    );
};

export default Question;
