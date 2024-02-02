import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaArrowUp } from "react-icons/fa6";
import { auth } from '../../firebase';

interface Props {
    course: string
}
const Input = ({ course }: Props) => {
    const [message, setMessage] = useState("");

    const inputRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(inputRef.current, message);

    const [user, loading] = useAuthState(auth);
    const payload = { collectionPath: `chats/${course}/messages`, content: message, "author": user?.displayName, "authorPhotoURL": user?.photoURL }

    const handleClick = () => {
        fetch("/api/messaging", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then(() => {
            setMessage("")
        })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        console.log(e.key)
        if (e.key === "Enter") {
            handleClick()
        }
    }

    return (
        <div className="flex bottom-0 w-full justify-center items-center">
            <div className="relative bg-[#10422d] text-base rounded-2xl w-[90%] pt-2 mb-4 border-token-border-heavy border-gray-400 border-[1px]">
                {/* <form className="flex"> */}
                <textarea
                    id="prompt-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={(e) => handleKeyDown(e)}
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
