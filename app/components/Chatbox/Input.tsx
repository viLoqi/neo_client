import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { FaArrowUp } from "react-icons/fa6";

const Input = ({ setter }: { setter: Dispatch<SetStateAction<string[]>> }) => {
    const [message, setMessage] = useState("");

    const inputRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(inputRef.current, message);

    const handleClick = () => {
        fetch("https://nle646esfd.execute-api.us-east-1.amazonaws.com/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ "question": message }) }).then(async (r) => {
            const d = await r.json()
            setter(prev => [...prev, d["Answer"]])
        })
    }

    return (
        <div className="flex bottom-0 w-full justify-center items-center">
            <div className="relative bg-[#10422d] text-base rounded-2xl w-[90%] pt-2 mb-4 border-token-border-heavy border-gray-400 border-[1px]">
                {/* <form className="flex"> */}
                <textarea
                    id="prompt-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    ref={inputRef}
                    placeholder="Message LoqiGPT..."
                    className="w-full resize-none focus:outline-none bg-transparent rounded-2xl py-[10px] placeholder-white/50 text-white pl-4 max-h-[200px] overflow-hidden"
                />
                <button className="flex items-center justify-center absolute bg-green-900 hover:bg-transparent border-[1px] border-gray-500 bottom-3 right-3 text-gray-400 rounded-lg size-8 transition-colors" onClick={handleClick}>
                    <FaArrowUp />
                </button>
                {/* </form> */}
            </div>
        </div>
    );
};

const useAutosizeTextArea = (
    inputRef: HTMLTextAreaElement | null,
    message: string
) => {
    useEffect(() => {
        if (inputRef) {
            inputRef.style.height = "0px";
            inputRef.style.height = inputRef.scrollHeight + "px";
        }
    }, [inputRef, message]);
};

export default Input;
