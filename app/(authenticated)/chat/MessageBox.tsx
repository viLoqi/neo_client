import { Input, Progress } from "@chakra-ui/react";
import { ImageSquare, PaperPlaneRight, Smiley } from "@phosphor-icons/react";
import useUser from "@/hooks/useUser";
import useChat from "@/hooks/useChat";
import { MessageSchema, Contact } from "@/app/_types/main";
import Message from "./Message";
import MessageBoxHeader from "./MessageBoxHeader";
import { useEffect, useRef, useState } from "react";
import useUserFCMToken from "@/hooks/useUserFCMToken";
import { usePathname } from "next/navigation";

const MessageBox = ({ contact }: { contact: Contact }) => {
    const [user] = useUser()
    const path = usePathname()
    const { chatMessages, addChatMessage } = useChat({ uid: user?.email!, tuid: contact?.email })
    const isWhitespaceString = (str: String) => !str.replace(/\s/g, '').length
    const [loading, setLoading] = useState(false)
    const fcm = useUserFCMToken(contact?.uid)

    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current)
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;


    }, [chatMessages])


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            handleSubmit();
        }
    }

    const handleSubmit = () => {
        if (inputRef.current) {
            const message = inputRef.current.value
            if (!isWhitespaceString(message)) {
                const payload = { content: message, "author": user!.displayName!, "authorPhotoURL": user!.photoURL! }
                setLoading(true)
                addChatMessage({ body: payload }).then(() => {
                    setLoading(false)
                    if (inputRef.current)
                        inputRef.current.value = ""
                })

                if (fcm) {
                    fetch(`https://us-east1-loqi-loqi.cloudfunctions.net/notify?token=${fcm}`, {
                        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
                            title: `${user?.displayName} sent you a message`,
                            body: message,
                            link: `${path}`
                        })
                    })
                }

            }
        }
    }

    if (contact) {
        return <div className="grid grid-rows-10 w-full h-screen overflow-hidden">
            <div className="row-span-1 flex justify-between bg-light-bg-subtle shadow-md p-4">
                <MessageBoxHeader contact={contact} />
            </div>

            <div className="grid grid-rows-9 row-span-9 p-4 ">
                <div className="row-span-8 flex flex-col h-full w-full rounded-lg  overflow-y-auto" ref={scrollRef}>
                    {chatMessages?.map(e => {
                        const currMsg = e as MessageSchema
                        return <Message key={crypto.randomUUID()} {...currMsg} />
                    })}
                </div>
                <div className="row-span-1 flex w-full h-full rounded-lg  flex-col border-2 border-light-bg-active shadow-md p-4 gap-2">
                    <Input placeholder={`Message ${contact.name}`} border={0} px={0} onKeyDown={e => handleKeyDown(e)} ref={inputRef} variant={"unstyled"} />
                    <div className="flex justify-between ">
                        <div className="flex gap-2">
                            <Smiley size={32} />
                            <ImageSquare size={32} />
                        </div>
                        <PaperPlaneRight size={32} onClick={() => { handleSubmit() }} />
                    </div>

                    {loading ? <Progress size='xs' isIndeterminate /> : <></>}
                </div>
            </div>

        </div>;
    }
}

export default MessageBox;