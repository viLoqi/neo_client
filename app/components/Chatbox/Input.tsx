import React, { useState, useRef, useEffect } from "react";
import { IoIosSend } from "react-icons/io";

const Input = () => {
    const [message, setMessage] = useState("");

    const inputRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(inputRef.current, message);

    return (
        <div className="flex bottom-0 w-full justify-center items-center">
            <div className="bg-[#10422d] text-base rounded-2xl w-[90%] pt-2 mb-4 border-token-border-heavy border-gray-400 border-[1px]">
                {/* <form className="flex"> */}
                    <textarea
                        id="prompt-textarea"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        ref={inputRef}
                        placeholder="Message LoqiGPT..."
                        className="w-full resize-none focus:outline-none bg-transparent rounded-2xl py-[10px] placeholder-white/50 text-white pl-4 max-h-[200px] overflow-hidden"
                    />
                {/* </form> */}
            </div>
        </div>
    );
};

const useAutosizeTextArea = (inputRef: HTMLTextAreaElement | null, message: string) => {
    useEffect(() => {
        if(inputRef) {
            inputRef.style.height = "0px";
            inputRef.style.height = inputRef.scrollHeight + "px";
        }
    }, [inputRef, message]);
}

export default Input;
