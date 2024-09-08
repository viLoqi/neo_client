"use client";

import { useParams, useRouter } from "next/navigation";
import { CardSchema } from "@/app/_types/deck";
import { useEffect, useMemo, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import UsersPanel from "@/components/UsersPanel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Flashcard from "./Flashcard";
import { AnimatePresence } from "framer-motion"
import useDecks from "@/hooks/useDecks";
import { ArrowLeft, CaretLeft } from "@phosphor-icons/react";
import { Box, Button, ScaleFade } from "@chakra-ui/react";
import moment from "moment";

const FreeMode = () => {
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

    // Flashcard Carousel functionalities
    // const stackVariants = {
    //     onTop: {
    //         x: "0",
    //         opacity: 1,
    //         transition: {
    //             duration: 1,
    //         },
    //     },
    //     onBottom: {
    //         x: "0",
    //         scale: 0.8,
    //         transition: {
    //             duration: 1,
    //         },
    //     },
    //     exit: {
    //         x: "-100%",
    //         transition: {
    //             duration: 0.5,
    //         }
    //     }
    // }

    const duration = 60;
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
        <div className="flex w-full h-screen">
            <div className="flex flex-col w-full h-full ">
                {/* Course title */}
                <h1 className="flex w-full justify-center font-semibold border-b-[1px] py-2 mb-1 border-black">
                    {course}
                </h1>
                {/* main body */}
                <div className="flex h-full pl-12">
                    {/* Left side */}
                    <div className="flex flex-col items-center">
                        {/* Back button */}
                        {/* <Link href='/'> */}
                        <Button leftIcon={<CaretLeft size={24} />} onClick={() => router.back()} variant={"ghost"}>
                            Back
                        </Button>
                        {/* </Link> */}
                        <div className="flex mt-[30vh] items-center justify-center text-xl font-semibold size-36 justify-self-center">
                            <CountdownCircleTimer
                                isPlaying
                                key={timerKey}
                                size={150}
                                duration={isOver ? activeCardIndex == cards.length - 1 ? 0 : isOverDuration : duration}
                                colors={["#29A383", "#F5D90A", "#CA244D"]}
                                onUpdate={(remainingTime) => { timeTaken = (duration - remainingTime) }}
                                onComplete={handleTimerOver}
                                colorsTime={[duration, duration / 2, 0]}
                            >
                                {({ remainingTime }) => {
                                    const minutes = Math.floor(remainingTime / 60)
                                    const seconds = (remainingTime % 60).toString().padStart(2, '0')

                                    if (isOver) {
                                        return (
                                            <div className="flex flex-col items-center">
                                                <h1 className="animate-bounce">Times up!</h1>
                                                <h1 className="text-sm">{activeCardIndex == cards.length - 1 ? "Session over!" : `Next card in ${remainingTime}`}</h1>
                                            </div>
                                        )
                                    }

                                    return `${minutes}:${seconds}`
                                }}
                            </CountdownCircleTimer>
                        </div>
                    </div>

                    {/* Carousel */}
                    <div className="flex w-full mx-20 items-center justify-between">
                        {/* prev button */}
                        <button className={`${activeCardIndex == 0 ? "invisible w-[3rem]" : "btn"}`} onClick={getPrevCard}><FaChevronLeft /></button>
                        {/* card */}
                        <div className="flex w-4/5 h-full mx-10 items-center justify-center relative " >
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
                        <ScaleFade initialScale={0} in={questionAnswered == cards.length}>
                            <Button p='40px'
                                color='white'
                                mt='4'
                                bg='teal.500'
                                rounded='md'
                                _hover={{ bg: "teal.600" }}
                                shadow='md' onClick={() => { router.push(`${location.protocol}//${location.hostname}/quiz/${deck_id}`) }}>View Report</Button>
                        </ScaleFade>
                        <button className={`${activeCardIndex == deckLength - 1 ? "invisible w-[3rem]" : "btn"}`} onClick={getNextCard}><FaChevronRight /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FreeMode;