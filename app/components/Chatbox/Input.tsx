import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaArrowUp } from "react-icons/fa6";
import { auth } from '../../firebase';

interface Props {
    course: string
}

var isShiftPressed = false;
var isEnterPressed = false;

const Input = ({ course }: Props) => {
    const [message, setMessage] = useState("");

    const inputRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(inputRef.current, message);

    const isWhitespaceString = (str: String) => !str.replace(/\s/g, '').length

    const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        if (isEnterPressed && isShiftPressed) {
            console.log("shift + enter");
        }
        if (isEnterPressed && !isShiftPressed) {
            e.preventDefault()
            return;
        } else {
            setMessage(e.target.value);
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Shift') {
            isShiftPressed = true;
        } else if (e.key === 'Enter') {
            isEnterPressed = true;
            if (!isShiftPressed && !isWhitespaceString(message)) {
                console.log("only enter");
                handleClick()
            }
            else{
                e.preventDefault();
            }
        }
    }
    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Shift') {
            isShiftPressed = false;
        } else if (e.key === 'Enter') {
            isEnterPressed = false;
        }
    }

    const [user, loading] = useAuthState(auth);
    const payload = { collectionPath: `chats/${course}/messages`, content: message, "author": user?.displayName, "authorPhotoURL": user?.photoURL }

    const handleClick = () => {
        fetch("/api/messaging", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then(() => {
            setMessage("");
            (document.getElementById('prompt-textarea')! as HTMLTextAreaElement).value = "";
        })
    }

    return (
        <div className="flex bottom-0 w-full justify-center items-center">
            <div className="relative bg-[#10422d] text-base rounded-2xl w-[90%] py-3 mb-4 border-token-border-heavy border-gray-400 border-[1px]">
                {/* <form className="flex"> */}
                <textarea
                    id="prompt-textarea"
                    placeholder={`Message #${course}`}
                    ref={inputRef}
                    onChange={handleTyping}
                    onKeyDown={e => handleKeyDown(e)}
                    onKeyUp={e => handleKeyUp(e)}
                    rows={1}
                    className="w-full  resize-none focus:outline-none bg-transparent placeholder-white/50 text-white pl-4 pr-16 overflow-hidden max-h-[200px]"
                />
                <button className="flex items-center justify-center absolute bg-green-900 hover:bg-transparent border-[1px] border-gray-500 bottom-3 right-3 text-gray-400 rounded-lg size-8 transition-colors" onClick={(e) => {
                    if (!isWhitespaceString(message)) {
                        handleClick();
                    }
                }}>
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
