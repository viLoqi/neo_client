"use client";
import { motion } from "framer-motion"

import ChoiceButton from "@/components/ChoiceButton";
import { CardSchema } from "@/app/_types/deck";

const Flashcard = ({ card, getNextCard }: { card: CardSchema, getNextCard: () => void }) => {
    const stackVariants = {
        onTop: {
            x: "0",
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                delay: 0.1,
                duration: 1,
            },
        },
        onBottom: {
            scale: 0.8,
        },
        exit: {
            x: "-50%",
            opacity: "25%",
            rotate: -200,
            scale: 0.5,
            transition: {
                duration: 0.5,
            }
        }
    }


    if (card === undefined)
        return <>NO CARD</>

    return (
        <motion.div className="absolute flex flex-col w-full h-4/5 py-8 items-center justify-evenly rounded-[50px] bg-light-bg-subtle border-2 border-bg-light-bg-active"
            initial={"onBottom"}
            animate={"onTop"}
            exit={"exit"}
            variants={stackVariants}
        >
            {/* Question */}
            <h1 className="font-bold text-3xl">

                {card.question}
            </h1>
            {/* Answer choices */}
            <div className="grid grid-cols-2 gap-3 w-4/5">
                {card.choices.map((choice) => {
                    return (
                        <ChoiceButton
                            key={choice}
                            text={choice}
                            isCorrect={choice === card.answer}
                            getNextCard={getNextCard}
                        />
                    );
                })}
            </div>
        </motion.div>
    );
};

export default Flashcard;
