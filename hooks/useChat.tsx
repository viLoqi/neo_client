import { PostChatMessageRequest } from "@/app/_types/main";
import { useMemo } from "react";
import useAuthToken from "./useAuthToken";
import { firestore } from '@/app/_modules/firebase'
import { query, collection, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const useChat = ({ uid, tuid }: { uid: string, tuid: string }) => {

    let hash = uid + tuid

    if (uid > tuid)
        hash = tuid + uid

    const collectionPath = `chats/${hash}/messages`
    const [chatMessages] = useCollectionData(query(collection(firestore, collectionPath), orderBy("firstCreated", "asc")))
    const baseURL = `https://us-east1-loqi-loqi.cloudfunctions.net/chat?uid=${uid}&tuid=${tuid}`
    const token = useAuthToken()

    const baseHeaders = useMemo(() => { return { "Content-Type": "application/json" } }, [])

    const addChatMessage = ({ body }: { body: PostChatMessageRequest }) => {
        return fetch(baseURL, { method: "PATCH", headers: { ...baseHeaders, "Authorization": `Bearer ${token}` }, body: JSON.stringify(body) })
    }

    return { chatMessages, addChatMessage };
}

export default useChat;