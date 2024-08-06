import { Avatar, AvatarBadge, Input } from "@chakra-ui/react";
import { Contact } from "./ContactList";
import { ImageSquare, PaperPlaneRight, Phone, Smiley, VideoCamera } from "@phosphor-icons/react";
import { DotsThreeOutlineVertical } from "@phosphor-icons/react/dist/ssr";
import useUser from "@/hooks/useUser";
import useChat from "@/hooks/useChat";
import { MessageSchema } from "@/app/_types/main";
import Message from "./Message";
import MessageBoxHeader from "./MessageBoxHeader";
import { useEffect, useRef } from "react";

const MessageBox = ({ contact }: { contact: Contact }) => {
    const [user] = useUser()

    const { chatMessages, addChatMessage } = useChat({ uid: user?.uid!, tuid: contact?.uid })
    const isWhitespaceString = (str: String) => !str.replace(/\s/g, '').length

    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current)
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

        if (inputRef.current)
            inputRef.current.value = ""
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
                addChatMessage({ body: payload }).then(() => {

                })
            }
        }
    }

    if (contact) {
        return <div className="grid grid-rows-10 w-full h-screen overflow-hidden">
            <div className="row-span-1 flex justify-between bg-light-bg-subtle shadow-md p-4">
                <MessageBoxHeader contact={contact} />
            </div>

            <div className="grid grid-rows-9 row-span-9 p-4 ">
                <div className="row-span-8 flex flex-col h-full w-full rounded-lg  overflow-y-scroll" ref={scrollRef}>
                    {chatMessages?.map(e => {
                        const currMsg = e as MessageSchema
                        return <Message key={crypto.randomUUID()} {...currMsg} />
                    })}
                </div>
                {/* Adding p4 to this makes the container overflow :( */}
                <div className="row-span-1 flex w-full h-full rounded-lg  flex-col border-2 border-light-bg-active shadow-md p-4 gap-2">
                    <Input placeholder={`Message ${contact.name}`} border={0} px={0} onKeyDown={e => handleKeyDown(e)} ref={inputRef} variant={"unstyled"} />
                    <div className="flex justify-between ">
                        <div className="flex gap-2">
                            <Smiley size={32} weight="duotone" />
                            <ImageSquare size={32} weight="duotone" />
                        </div>
                        <PaperPlaneRight size={32} weight="duotone" onClick={() => { handleSubmit() }} />
                    </div>
                </div>
            </div>

        </div>;
    }
}

export default MessageBox;