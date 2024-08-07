"use client"
import { useParams } from "next/navigation";

const ForumPostDetailPage = () => {
    const { post_id } = useParams()
    return <div className="flex w-full h-screen p-6">
        {post_id}
    </div>;
}

export default ForumPostDetailPage;