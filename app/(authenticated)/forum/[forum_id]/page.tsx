"use client"

import { Button, Heading, Select } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import ForumPostCard from "./ForumPostCard";
import useForumPosts from "@/hooks/useForumPosts";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import PostQuestionModal from "./PostQuestionModal";

const SectionForumPage = () => {
    const { forum_id } = useParams<{ forum_id: string }>()
    const { posts, upvote } = useForumPosts(forum_id)
    const [isModalOpen, setIsModalOpen] = useState(false)
    console.log(forum_id, isModalOpen)

    return <div className="grid grid-rows-10 w-full h-screen p-6 overflow-y-scroll">
        <div className="row-span-1">
            <div className="flex justify-between w-full">
                <Heading className="col-span-2" size={"lg"}>{forum_id}</Heading>
                <div className="grid grid-flow-col gap-4">
                    <Select >
                        <option value='RECENT'>Most Recent</option>
                        <option value='HOT'>Most Popular</option>
                        <option value='UNANSWERED'>Unanswered</option>
                    </Select>
                    <Button key={crypto.randomUUID()} variant='solid' color='#326AFD' bgColor={"#DDEAFF"} className="w-full" rounded={16} onClick={() => setIsModalOpen(true)} >
                        Post Question
                    </Button>
                    <PostQuestionModal
                        isOpen={isModalOpen}
                        forumId={forum_id}
                        onClose={() => setIsModalOpen(false)}
                    />
                </div>
            </div>
        </div>
        <SearchBar />

        <div className="row-span-7 mt-4 gap-4 flex flex-col">
            {posts ? posts.map((post, idx) => {
                return <ForumPostCard key={post._id} post={post} idx={idx} upvote={upvote} />
            }) : <></>}
        </div>
    </div>;
}

export default SectionForumPage;