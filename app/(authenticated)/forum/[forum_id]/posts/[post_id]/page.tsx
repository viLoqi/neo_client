"use client"
import { ForumPostSchema } from "@/app/_types/main";
import { PrivateDeck } from "@/app/_types/repo";
import useForumPosts from "@/hooks/useForumPosts";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from "@chakra-ui/react";
import { CaretRight, Cpu } from "@phosphor-icons/react";
import { useParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import CommentCard from "./CommentCard";

const ForumPostDetailPage = () => {
    // This is actually the index...
    const { post_id } = useParams<{ post_id: string }>()
    const path = usePathname()
    const { posts, addAnswer, addComment, editPostDescription } = useForumPosts(path.split("/")[2])


    const [selectedPost, setSelectedPost] = useState<ForumPostSchema>()

    useEffect(() => {
        if (posts)
            setSelectedPost(posts.filter(post => post._id === post_id)[0])
    }, [post_id, posts])


    if (selectedPost)
        return <div className="flex flex-col w-full h-screen p-4 gap-4 ">
            <div className="">
                <Breadcrumb spacing='8px' separator={<CaretRight />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`${path.split("/").slice(0, 3).join("/")}`}>Posts</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href={`${path}`}>{selectedPost.question}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <QuestionCard {...selectedPost} editPost={editPostDescription} post_id={post_id} />
            <AnswerCard answerer={selectedPost["instructorAnswer"]} role="instructor" addAnswer={addAnswer} post={selectedPost} />
            <AnswerCard answerer={selectedPost["studentAnswer"]} role="student" addAnswer={addAnswer} post={selectedPost} />
            <CommentCard comments={selectedPost["comments"]} addComment={addComment} post={selectedPost} />
        </div>;
}

export default ForumPostDetailPage;