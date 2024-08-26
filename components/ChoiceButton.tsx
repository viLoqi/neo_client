"use client";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

const ChoiceButton = ({ text, isCorrect, getNextCard, incorrectAttempts }: { text: String, isCorrect: boolean, getNextCard: () => void, incorrectAttempts: number }) => {
    const [chosen, setChosen] = useState(false);

    const onChoiceClick = () => {
        setChosen(true)
        if (isCorrect)
            getNextCard()
        else {
            incorrectAttempts += 1
        }
    };

    return (
        <Button
            bgColor={chosen ? (isCorrect ? "#62c799" : "#ea8282") : "#d9d9d9 "}
            className={`flex justify-start  rounded-full font-bold text-sm py-1 px-4 `}
            _hover={{ bg: chosen ? "" : "#a6a6a6" }}
            onClick={onChoiceClick}
        >
            {text}
        </Button>
    );
};

export default ChoiceButton;
