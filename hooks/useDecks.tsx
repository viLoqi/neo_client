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
            }).then(() => setLoading(true))
    }

    const delDeckfromPrivateRepo = (idx: number) => {
        if (user)
            fetch(`${baseURL}&uid=${user.email}&idx=${idx}`, {
                method: "DELETE",
                headers: {
                    ...baseHeaders,
                    "Authorization": `Bearer ${token}`,
                }
            }).then(() => setLoading(true))
    }

    useEffect(() => {
        if (user && token && loading) {
            fetch(`${baseURL}&uid=${user.email}`, {
                headers: {
                    ...baseHeaders,
                    "Authorization": `Bearer ${token}`,
                },
                // cache: 'force-cache'
            },).then(r => r.json().then(d => {
                setDecks(d?.decks ?? [])
                setLoading(false)
            }))
        }
    }, [loading, baseURL, baseHeaders, token, user])

    return { decks, loading, addDeckToPrivateRepo, delDeckfromPrivateRepo };
}

export default useDecks;