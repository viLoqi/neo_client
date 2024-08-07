//TODO: impl
import { ForumPostSchema } from "@/app/_types/main";
import { useEffect, useState } from "react";

const useForumPosts = () => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState<ForumPostSchema[]>([])

    useEffect(() => {

        if (loading) {
            setPosts(
                [{ postId: "1", pinned: false, question: "WHat is 9 + 10", studentAnswer: "", instructorAnswer: "", followups: [], upvotes: 0, downvotes: 0, authorName: "Jie Chen", authorPhotoURL: "https://lh3.googleusercontent.com/a/ACg8ocKjfu_nP3HQYP4CPUMPvArMpFT04AX6b5OqGqAQfAxLPp7WB4ZR=s288-c-no", firstCreated: Date.now() }]
            )
            setLoading(false)
        }

    }, [loading])

    return { posts, loading }
}

export default useForumPosts;