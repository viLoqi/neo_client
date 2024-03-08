"use client";
import ChoiceButton from "../../components/ChoiceButton";
import { CardSchema } from "../../types";
import { motion } from "framer-motion"

const Flashcard = ({ card }: { card: CardSchema }) => {
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
        <motion.div className="absolute flex flex-col w-full h-4/5 py-8 items-center justify-evenly rounded-[50px] bg-white"
            initial={"onBottom"}
            animate={"onTop"}
            exit={"exit"}
            variants={stackVariants}
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
        </motion.div>
    );
};

export default Flashcard;
