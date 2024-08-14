//TODO: impl
import { ForumPostSchema, ForumPostRequest, ForumAnswerPostRequest } from "@/app/_types/main";
import { useEffect, useMemo, useState } from "react";
import useAuthToken from "./useAuthToken";
import useSchool from "./useSchool";
import { firestore } from "@/app/_modules/firebase";
import { query, collection, orderBy, doc } from "firebase/firestore";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import useUser from "./useUser";

const useForumPosts = (forum: string, filter: string | null = null) => {
    const collectionPath = `forums/${forum}/posts`
    const [posts] = useCollection(query(collection(firestore, collectionPath), orderBy("firstCreated", "desc")))
    const [filteredPosts, setFilteredPosts] = useState<ForumPostSchema[]>([])
    const school = useSchool()
    const token = useAuthToken()
    const [user] = useUser()

    const baseURL = `https://us-east1-loqi-loqi.cloudfunctions.net/forum?university=${school}&uid=${forum}`
    const baseHeaders = useMemo(() => { return { "Content-Type": "application/json" } }, [])

    const addForumPost = ({ body }: { body: ForumPostRequest }) => {
        return fetch(baseURL, { method: "POST", headers: { ...baseHeaders, "Authorization": `Bearer ${token}` }, body: JSON.stringify(body) })
    }

    const addAnswer = (content: string, role: string, postId: string) => {
        return fetch(`${baseURL}&post=${postId}`, {
            method: "PATCH", headers: { ...baseHeaders, "Authorization": `Bearer ${token}` }, body: JSON.stringify({
                "author": user?.displayName,
                role, content,
                "authorPhotoURL": user?.photoURL
            })
        })
    }

    const upvote = (postId: string) => {

        const cache = `upvote:${postId}`

        if (localStorage.getItem(cache)) {
            return null

        } else {
            localStorage.setItem(`upvote:${postId}`, "1")
            return fetch(`${baseURL}&post=${postId}`, {
                method: "PATCH", headers: { ...baseHeaders, "Authorization": `Bearer ${token}` }
            })
        }
    }

    const addComment = (content: string, postId: string) => {
        return fetch(`${baseURL}&post=${postId}`, {
            method: "PATCH", headers: { ...baseHeaders, "Authorization": `Bearer ${token}` }, body: JSON.stringify({
                "author": user?.displayName,
                role: "comment", content,
                "authorPhotoURL": user?.photoURL
            })
        })
    }

    useEffect(() => {
        const d = posts?.docs.map((d) => {
            const dt = d.data()
            dt["_id"] = d.id
            return dt
        })

        if (d)
            setFilteredPosts(d as any)
    }, [posts])


    return { posts: filteredPosts, addForumPost, addAnswer, addComment, upvote }
}

export default useForumPosts;