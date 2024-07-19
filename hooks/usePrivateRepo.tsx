import { useEffect, useMemo, useState } from "react";
import useSchool from "./useSchool";
import { GetPrivateRepoResponse } from "@/app/_types/repo";
import { PostDeckRequest } from "@/app/_types/deck";
import useUser from "./useUser";

interface UseRepoInput {
    repo_id: string
}

const usePrivateRepo = ({ repo_id }: UseRepoInput) => {
    const [repo, setRepo] = useState<GetPrivateRepoResponse>()
    const [reload, setReload] = useState(false)
    const school = useSchool()
    const [user] = useUser()

    const baseURL = `https://us-east1-loqi-loqi.cloudfunctions.net/repo?university=${school}`

    const baseHeaders = useMemo(() => { return { "Content-Type": "application/json" } }, [])

    const addDeckToPrivateRepo = ({ deckContent }: { deckContent: PostDeckRequest }) => {
        user?.getIdToken().then(token => {
            fetch(`${baseURL}&uid=${repo_id}`, {
                method: "PATCH",
                body: JSON.stringify(deckContent),
                headers: {
                    ...baseHeaders,
                    "Authorization": `Bearer ${token}`,
                }
            })
        })
        setReload((prev) => !prev)
    }


    const delDeckfromPrivateRepo = () => {
        setReload((prev) => !prev)
    }

    useEffect(() => {
        user?.getIdToken().then(token => {
            fetch(`${baseURL}&uid=${repo_id}`, {
                headers: {
                    ...baseHeaders,
                    "Authorization": `Bearer ${token}`,
                }
            }).then(r => r.json().then(d => setRepo(d[0])))
        }
        )
    }, [repo_id, school, user, reload, baseURL, baseHeaders])

    return { repo, addDeckToPrivateRepo, delDeckfromPrivateRepo };
}

export default usePrivateRepo;