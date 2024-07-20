import { PostChatMessageRequest } from "@/app/_types/main";
import useFirestore from "./useFirestore";
import { useMemo } from "react";

const useChat = ({ room }: { room: string }) => {
    const [chatMessages] = useFirestore({ collectionPath: `chats/${room}/messages` })
    const baseURL = `https://us-east1-loqi-loqi.cloudfunctions.net/chat?room=${room}`

    const baseHeaders = useMemo(() => { return { "Content-Type": "application/json" } }, [])

    const addChatMessage = ({ body }: { body: PostChatMessageRequest }) => {
        return fetch(baseURL, { method: "POST", headers: { ...baseHeaders, "Content-Type": "application/json" }, body: JSON.stringify(body) })
    }

    return { chatMessages, addChatMessage };
}

export default useChat;