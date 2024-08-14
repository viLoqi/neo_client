//TODO: impl
import { ForumPostSchema, ForumPostRequest } from "@/app/_types/main";
import { useEffect, useMemo, useState } from "react";
import useAuthToken from "./useAuthToken";
import useSchool from "./useSchool";
import { firestore } from "@/app/_modules/firebase";
import { query, collection, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const useForumPosts = (forum: string) => {
    const collectionPath = `forums/${forum}/posts`
    const [posts] = useCollectionData(query(collection(firestore, collectionPath), orderBy("firstCreated", "desc")))
    const school = useSchool()
    const token = useAuthToken()

    const baseURL = `https://us-east1-loqi-loqi.cloudfunctions.net/forum?university=${school}&uid=${forum}`
    const baseHeaders = useMemo(() => { return { "Content-Type": "application/json" } }, [])

    const addForumPost = ({ body }: { body: ForumPostRequest }) => {
        return fetch(baseURL, { method: "POST", headers: { ...baseHeaders, "Authorization": `Bearer ${token}` }, body: JSON.stringify(body) })
    }

    return { posts: posts as ForumPostSchema[], addForumPost }
}

export default useForumPosts;