import { useEffect, useMemo, useState } from "react";
import useSchool from "./useSchool";
import { GetPrivateRepoResponse } from "@/app/_types/repo";
import { PostDeckRequest } from "@/app/_types/deck";
import useAuthToken from "./useAuthToken";
import useUser from "./useUser";

const useDeck = () => {
    const [user] = useUser()

    const [repo, setRepo] = useState<GetPrivateRepoResponse>()
    const [reload, setReload] = useState(false)
    const school = useSchool()
    const token = useAuthToken()

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

    const delDeckfromPrivateRepo = () => {
        setReload((prev) => !prev)
    }

    useEffect(() => {
        if (user && token)
            fetch(`${baseURL}&uid=${user.email}`, {
                headers: {
                    ...baseHeaders,
                    "Authorization": `Bearer ${token}`,
                }
            }).then(r => r.json().then(d => setRepo(d[0])))
    }, [reload, baseURL, baseHeaders, token, user])

    return { decks: repo?.decks, addDeckToPrivateRepo, delDeckfromPrivateRepo };
}

export default useDeck;