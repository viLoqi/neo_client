"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { AnimatePresence } from "framer-motion"

import { CardSchema } from "@/app/_types/main";
import Flashcard from "./Flashcard";

interface FlashCardCarouselProps {
    cards: CardSchema[];
}

const FlashCardCarousel = ({ cards }: FlashCardCarouselProps) => {
    const [activeCardIndex, setActiveCardIndex] = useState(0)

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

    const duration = 70;
    const deckLength = cards.length

    console.log("current card index: " + activeCardIndex);
    return (
        <div className="flex w-full mx-20 items-center justify-between">
            {/* prev button */}
            <button className={`${activeCardIndex == 0 ? "invisible w-[3rem]" : "btn"}`} onClick={getPrevCard}><FaChevronLeft /></button>
            {/* card */}
            <div className="flex w-4/5 h-full mx-10 items-center justify-center relative" >
                <AnimatePresence>
                    {cards.map((card, i) => activeCardIndex == i && <Flashcard key={i} card={card} />)}
                </AnimatePresence>
                <div className="flex absolute bottom-[4%] h-10 w-16 bg-white justify-center items-center rounded-full">
                    <p>{activeCardIndex + 1}/{deckLength}</p>
                </div>
            </div>
            {/* next button */}
            <button className={`${activeCardIndex == deckLength - 1 ? "invisible w-[3rem]" : "btn"}`} onClick={getNextCard}><FaChevronRight /></button>
        </div>
    );
}

export default FlashCardCarousel;