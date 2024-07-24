import { useEffect, useMemo, useState } from "react";
import useSchool from "./useSchool";
import { GetPrivateRepoResponse } from "@/app/_types/repo";
import { PostDeckRequest } from "@/app/_types/deck";
import useAuthToken from "./useAuthToken";

interface UseRepoInput {
    repo_id: string
}

// A repo is a container for decks; this is usually the user's email

const useRepo = ({ repo_id }: UseRepoInput) => {
    const [repo, setRepo] = useState<GetPrivateRepoResponse>()
    const [reload, setReload] = useState(false)
    const school = useSchool()
    const token = useAuthToken()

    const baseURL = `https://us-east1-loqi-loqi.cloudfunctions.net/repo?university=${school}`
    const baseHeaders = useMemo(() => { return { "Content-Type": "application/json" } }, [])

    const addDeckToPrivateRepo = async ({ deckContent }: { deckContent: PostDeckRequest }) => {
        fetch(`${baseURL}&uid=${repo_id}`, {
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
        if (repo_id && token)
            fetch(`${baseURL}&uid=${repo_id}`, {
                headers: {
                    ...baseHeaders,
                    "Authorization": `Bearer ${token}`,
                }
            }).then(r => r.json().then(d => setRepo(d[0])))
    }, [repo_id, reload, baseURL, baseHeaders, token])

    return { repo, addDeckToPrivateRepo, delDeckfromPrivateRepo };
}

export default useRepo;