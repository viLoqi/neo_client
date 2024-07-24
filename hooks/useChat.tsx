import { PostChatMessageRequest } from "@/app/_types/main";
import useFirestore from "./useFirestore";
import { useMemo } from "react";
import useAuthToken from "./useAuthToken";

const useChat = ({ room }: { room: string }) => {
    const [chatMessages] = useFirestore({ collectionPath: `chats/${room}/messages` })
    const baseURL = `https://us-east1-loqi-loqi.cloudfunctions.net/chat?room=${room}`
    const token = useAuthToken()

    const baseHeaders = useMemo(() => { return { "Content-Type": "application/json" } }, [])

    const addChatMessage = ({ body }: { body: PostChatMessageRequest }) => {
        return fetch(baseURL, { method: "POST", headers: { ...baseHeaders, "Authorization": `Bearer ${token}` }, body: JSON.stringify(body) })
    }

    return { chatMessages, addChatMessage };
}

export default useChat;