"use client";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

const ChoiceButton = ({ text, isCorrect, getNextCard, incorrectAttempts, isTimerOver }: { text: String, isCorrect: boolean, getNextCard: () => void, incorrectAttempts: number, isTimerOver: boolean }) => {
    const [chosen, setChosen] = useState(false);

    const [buttonColor, setButtonColor] = useState("#d9d9d9")


    const onChoiceClick = () => {
        setChosen(true)
        if (isCorrect) {
            getNextCard()
            setButtonColor("#62c799")
        }
        else {
            incorrectAttempts += 1
            setButtonColor("#ea8282")
        }
    };

    return (
        <Button
            bgColor={isTimerOver && isCorrect ? "#62c799" : buttonColor}
            className={`flex justify-start  rounded-full font-bold text-sm py-1 px-4 duration-300`}
            _hover={{ bg: chosen ? "" : "#a6a6a6" }}
            onClick={onChoiceClick}
        >
            {text}
        </Button>
    );
};

export default ChoiceButton;
