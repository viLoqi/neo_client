"use client";
import { Dispatch, SetStateAction } from "react";
import ChoiceButton from "../../components/ChoiceButton";
import { CardSchema } from "../../types";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";


interface Props {
    cardIndex: number,
    setActiveCardIndex: Dispatch<SetStateAction<number>>,
    cards: CardSchema[]
}
const Question = ({ cardIndex, cards, setActiveCardIndex }: Props) => {
    const card = cards[cardIndex]
    console.log("current card index: " + cardIndex);

    const getPrevCard = () => {
        cardIndex == 0 ? setActiveCardIndex(cards.length - 1) : setActiveCardIndex(cardIndex - 1);
        // console.log("getPrevCard, card index: " + cardIndex);
        console.log("getting prev card...")
    }

    const getNextCard = () => {
        setActiveCardIndex((cardIndex + 1) % cards.length);
        // console.log("getNextCard, card index: " + cardIndex);
        console.log("getting next card...")
    }

    if (card === undefined)
        return <>NO CARD</>

    

    return (
        <div className="flex w-full mx-20 items-center">
            {/* next button */}
            <button className="btn" onClick={getPrevCard}><FaChevronLeft/></button>
            {/* Card */}
            <div className="flex w-full h-full mx-10 items-center">
                <div className="flex flex-col w-full h-4/5 py-8 items-center justify-evenly rounded-[50px] bg-white">
                    {/* Deck title */}
                    <h1 className="font-bold text-3xl">
                        deckName
                    </h1>
                    {/* Question */}
                    <div className="w-4/5 mt-5">
                        <p className="whitespace-pre font-bold text-sm">
                            {card.question}
                        </p>
                    </div>
                    {/* Answer choices */}
                    <div className="grid grid-cols-2 gap-3 w-4/5">
                        {card.choices.map((choice) => {
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
            {/* next button */}
            <button className="btn" onClick={getNextCard}><FaChevronRight/></button>
        </div>
    );
};

export default Question;
