"use client";

import { useParams, useRouter } from "next/navigation";
import { CardSchema } from "@/app/_types/deck";
import { useEffect, useState } from "react";
import ProgressBarTimer from "./ProgressBarTimer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Flashcard from "./Flashcard";
import { AnimatePresence } from "framer-motion"
import useDecks from "@/hooks/useDecks";
import { CaretLeft } from "@phosphor-icons/react";
import { Box, Button, ScaleFade } from "@chakra-ui/react";
import moment from "moment";

const FreeModeMobile = () => {
    const router = useRouter();
    const [cards, setCards] = useState<CardSchema[]>([])
    const [activeCardIndex, setActiveCardIndex] = useState(0)
    const [questionAnswered, setQuestionAnswered] = useState(0)

    // These need not be states because it will not affect the rendering
    let timeTaken = 0
    let incorrectAttempts = 0


    const { deck_id } = useParams<{ deck_id: string }>()

    const { decks } = useDecks()

    // for the countdown timer
    const [timerKey, setTimerKey] = useState(0);

    const getPrevCard = () => {
        activeCardIndex == 0 ? setActiveCardIndex(deckLength - 1) : setActiveCardIndex(activeCardIndex - 1);
        setQuestionAnswered(prev => prev - 1)
        console.log("getting prev card...");
        setTimerKey(prevKey => prevKey + 1); // reset timer
        setIsOver(false)
    }

    const getNextCard = () => {

        // LOG STATS
        const store = localStorage.getItem(`report:${deck_id}`)

        const entry: { [key: string]: any } = {}
        entry["qid"] = activeCardIndex
        entry["timeTaken"] = timeTaken
        entry["attemptDate"] = moment().format("MMMM Do YYYY, h:mm:ss a")

        if (store) {
            const prev = JSON.parse(store)
            prev.push(entry)
            localStorage.setItem(`report:${deck_id}`, JSON.stringify(prev))
        } else {
            localStorage.setItem(`report:${deck_id}`, JSON.stringify([entry]))
        }


        // MOVE TO NEXT CARD
        console.log("getting next card...");
        setActiveCardIndex((prev) => prev + 1 < cards.length ? prev + 1 : prev);
        setQuestionAnswered((prev) => prev + 1 <= cards.length ? prev + 1 : prev)
        setTimerKey(prevKey => prevKey + 1); // reset timer

        setIsOver(false)
    }

    useEffect(() => {

        if (Array.isArray(decks) && decks.length) {
            setCards(decks[parseInt(deck_id)].cards)
            setActiveCardIndex(0)
        }
        else
            setCards([])
    }, [deck_id, decks])

    const duration = 4;
    const isOverDuration = 5;
    const [isOver, setIsOver] = useState(false)
    const handleTimerOver = () => {
        if (!isOver) {
            console.log("Timer over...")
            setIsOver(true)
            setTimerKey(prevTimerKey => prevTimerKey + 1)
        } else if (activeCardIndex != cards.length - 1) {
            getNextCard()
        }
    }

    const course = decks[parseInt(deck_id)] ? decks[parseInt(deck_id)].name : ""
    const deckLength = cards.length

    return (
        <div className="flex flex-col w-full h-screen">
            {/* Course title */}
            <h1 className="relative flex w-full justify-center items-center font-semibold border-b-[1px] py-4 border-black">
                <div className="absolute left-0">
                    <Button leftIcon={<CaretLeft size={24} />} onClick={() => router.back()} variant={"ghost"} />
                </div>
                {course}
            </h1>
            {/* main body */}
            <div className="flex flex-col h-full items-center justify-start relative">
                <ProgressBarTimer
                    key={timerKey}
                    duration={isOver ? activeCardIndex == cards.length - 1 ? 0 : isOverDuration : duration}
                    isOver={isOver}
                    activeCardIndex={activeCardIndex}
                    numCards={cards.length}
                    onComplete={handleTimerOver}
                />
                <div className={`flex w-full ${questionAnswered == cards.length ? "h-4/5" : "h-full"} items-center justify-evenly duration-500`}>
                    {/* prev button */}
                    <button className={`${activeCardIndex == 0 ? "invisible w-[3rem]" : "btn"}`} onClick={getPrevCard}><FaChevronLeft /></button>
                    {/* card */}
                    <div className={`flex w-3/5 h-full items-center justify-center relative`}>
                        <AnimatePresence>
                            {
                                cards.map((card, index) => {
                                    return (activeCardIndex == index &&
                                        <Flashcard key={card.answer + index} card={card} getNextCard={getNextCard} incorrectAttempts={incorrectAttempts} isTimerOver={isOver} />
                                    )
                                })
                            }
                        </AnimatePresence>
                        <div className="flex absolute bottom-[4%] h-10 w-16 bg-white justify-center items-center rounded-full">
                            <p>{activeCardIndex + 1}/{deckLength}</p>
                        </div>
                    </div>
                    {/* next button */}
                    <button className={`${activeCardIndex == deckLength - 1 ? "invisible w-[3rem]" : "btn"}`} onClick={getNextCard}><FaChevronRight /></button>
                </div>
                <ScaleFade initialScale={0} in={questionAnswered == cards.length}>
                    <Button 
                        
                        p='40px'
                        color='white'
                        mt='4'
                        bg='teal.500'
                        rounded='md'
                        _hover={{ bg: "teal.600" }}
                        shadow='md' onClick={() => { router.push(`${location.protocol}//${location.hostname}/quiz/${deck_id}`) }}>View Report</Button>
                </ScaleFade>
            </div>
        </div>
    );
}

export default FreeModeMobile;