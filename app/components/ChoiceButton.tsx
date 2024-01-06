"use client";
import { useState } from "react";

const ChoiceButton = ({ text, isCorrect}: { text: String, isCorrect: boolean }) => {
    const [chosen, setChosen] = useState(false);

    const onChoiceClick = () => setChosen(true);

    return (
        <button
            className={`flex justify-start  rounded-full font-bold text-sm py-1 px-4
                        ${chosen ? (isCorrect ?  "bg-[#62c799]" : "bg-[#ea8282]" ) : "bg-[#d9d9d9] hover:bg-[#a6a6a6]"}`}
            onClick={onChoiceClick}
        >
            {text}
        </button>
    );
};

export default ChoiceButton;
