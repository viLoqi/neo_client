import { useEffect, useMemo, useState } from "react";
import useSchool from "./useSchool";
import { PrivateDeck } from "@/app/_types/repo";
import { PostDeckRequest } from "@/app/_types/deck";
import useAuthToken from "./useAuthToken";
import useUser from "./useUser";

const useDecks = () => {
    // Remember that states cannot be shared between components
    // State and helpers created in componentA is not shared with componentB
    const [user] = useUser()

    const [decks, setDecks] = useState<PrivateDeck[]>([])
    const [reload, setReload] = useState(false)
    const school = useSchool()
    const token = useAuthToken()
    const [loading, setLoading] = useState(true)

    const baseURL = `https://us-east1-loqi-loqi.cloudfunctions.net/repo?university=${school}`
    const baseHeaders = useMemo(() => { return { "Content-Type": "application/json" } }, [])

    const addDeckToPrivateRepo = async ({ deckContent }: { deckContent: PostDeckRequest }) => {
        if (user)
            fetch(`${baseURL}&uid=${user.email}`, {
                method: "PATCH",
                body: JSON.stringify(deckContent),
                headers: {
                    ...baseHeaders,
                    "Authorization": `Bearer ${token}`,
                }
            }).then(() => setReload((prev) => !prev))
    }

    const delDeckfromPrivateRepo = (idx: number) => {
        if (user)
            fetch(`${baseURL}&uid=${user.email}&idx=${idx}`, {
                method: "DELETE",
                headers: {
                    ...baseHeaders,
                    "Authorization": `Bearer ${token}`,
                }
            }).then(() => setReload((prev) => !prev))
    }

    useEffect(() => {
        if (user && token) {
            setLoading(true)
            fetch(`${baseURL}&uid=${user.email}`, {
                headers: {
                    ...baseHeaders,
                    "Authorization": `Bearer ${token}`,
                }
            }).then(r => r.json().then(d => {
                setDecks(d[0]?.decks ?? [])
                setLoading(false)
            }))
        }
    }, [reload, baseURL, baseHeaders, token, user])

    return { decks, loading, addDeckToPrivateRepo, delDeckfromPrivateRepo };
}

export default useDecks;