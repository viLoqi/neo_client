//TODO: impl
import { ForumPostSchema } from "@/app/_types/main";
import { time } from "console";
import { useEffect, useState } from "react";

const useForumPosts = () => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState<ForumPostSchema[]>([])

    useEffect(() => {

        if (loading) {
            setPosts(
                [{
                    postId: "0", description: "I tried xyz but it dont work :(", pinned: false, question: "WHat is 9 + 10",
                    studentAnswer: {
                        "author": "Jie Chen",
                        "authorPhotoURL": "", role: "student", content: "GG", timestamp: Date.now()
                    },
                    instructorAnswer: null,
                    comments: [{
                        "author": "Jie Chen",
                        "authorPhotoURL": "", content: "Good question", timestamp: Date.now(),
                        replies: [{
                            "author": "Jie Chen",
                            "authorPhotoURL": "", content: "Good question", timestamp: Date.now(),
                            replies: []
                        }, {
                            "author": "Jie Chen",
                            "authorPhotoURL": "", content: "Good questionssssssssssssssssssssssssssssssssssssssssssss", timestamp: Date.now(),
                            replies: []
                        }]
                    }],
                    followups: [], upvotes: 0, downvotes: 0, authorName: "Jie Chen", authorPhotoURL: "https://lh3.googleusercontent.com/a/ACg8ocKjfu_nP3HQYP4CPUMPvArMpFT04AX6b5OqGqAQfAxLPp7WB4ZR=s288-c-no", firstCreated: Date.now()
                }]
            )
            setLoading(false)
        }

    }, [loading])

    return { posts, loading }
}

export default useForumPosts;