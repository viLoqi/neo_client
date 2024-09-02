"use client";

import ChoiceButton from "@/app/_components/ChoiceButton";
import { CardSchema } from "@/app/_types/deck";

const Flashcard = ({ card }: { card: CardSchema }) => {
    if (card === undefined)
        return <>NO CARD</>

    return (
        <div className="flashcard flex flex-col w-full h-4/5 py-8 items-center justify-evenly rounded-[50px] bg-white"
        >
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
    );
};

export default Flashcard;
