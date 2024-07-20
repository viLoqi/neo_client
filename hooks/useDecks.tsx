import { useEffect, useState, useMemo } from "react";
import useSchool from "./useSchool";
import { PostDeckRequest, DeckSchema } from "@/app/_types/deck";
import useUser from "./useUser";

interface useDecksInput {
    deck_id: string
}
//@ Dont use this hook yet, this will be for public repos which is not implemented yet
const useDecks = ({ deck_id }: useDecksInput) => {
    const [decks, setDecks] = useState<DeckSchema[]>([])
    const [reload, setReload] = useState(false)
    const school = useSchool()
    const [user] = useUser()

    const baseURL = `https://us-east1-loqi-loqi.cloudfunctions.net/deck?university=${school}`
    const baseHeaders = useMemo(() => { return { "Content-Type": "application/json" } }, [])

    const addNewDeck = ({ deckContent }: { deckContent: PostDeckRequest }) => {
        user?.getIdToken().then(token => {
            fetch(baseURL, {
                method: "POST",
                body: JSON.stringify(deckContent),
                headers: {
                    ...baseHeaders,
                    "Authorization": `Bearer ${token}`
                }
            })
        }
        )
        setReload((prev) => !prev)
    }

    const updateDeck = () => {
        setReload((prev) => !prev)
    }

    const deleteDeck = () => {
        setReload((prev) => !prev)
    }


    useEffect(() => {
        user?.getIdToken().then(token => {
            fetch(baseURL, {
                headers: {
                    ...baseHeaders,
                    "Authorization": `Bearer ${token}`
                }
            }).then(r => r.json().then(d => setDecks(d)))
        }
        )
    }, [deck_id, user, reload, baseURL, baseHeaders])

    return { decks, addNewDeck, updateDeck, deleteDeck };
}

export default useDecks;