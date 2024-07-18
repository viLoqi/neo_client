import { useEffect, useState } from "react";
import useSchool from "./useSchool";

interface useDecksInput {
    repo: string
}

const useDecks = ({ repo }: useDecksInput) => {
    const [decks, setDecks] = useState()
    const [refresh, setRefresh] = useState(false)
    const school = useSchool()

    const reload = () => {
        setRefresh(prev => !prev)
    }

    useEffect(() => {
        fetch(`https://loqi-7xzpbr8t.ue.gateway.dev/decks?university${school}=&uid=${repo}`).then()
    }, [refresh])

    return [decks, reload];
}

export default useDecks;