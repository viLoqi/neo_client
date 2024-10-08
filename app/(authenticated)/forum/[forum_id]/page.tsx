"use client"

import { Button, Select } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import ForumPostCard from "./ForumPostCard";
import useForumPosts from "@/hooks/useForumPosts";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import PostQuestionModal from "./PostQuestionModal";

const SectionForumPage = () => {
    const { forum_id } = useParams<{ forum_id: string }>()
    const { posts, upvote, delForumPost } = useForumPosts(forum_id)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filter, setFilter] = useState("RECENT")
    const [searchText, setSearchText] = useState("")

    const [orderedPosts, setOrderedPosts] = useState(posts)

    useEffect(() => {
        switch (filter) {
            case "HOT":
                setOrderedPosts(posts.toSorted(post => post.upvotes).toReversed())
                break
            case "UNANSWERED":
                setOrderedPosts(posts.filter(post => !post.instructorAnswer))
                break
            default: setOrderedPosts(posts)
        }

        if (searchText) {
            setOrderedPosts(prev => prev.filter(post => post.question.includes(searchText)))
        }
    }, [posts, filter, searchText])


    return <div className="grid grid-rows-10 w-full h-screen p-6 overflow-y-scroll">
        <div className="row-span-1">
            <div className="flex gap-4 w-full">
                <div className="grid grid-flow-col gap-4">
                    <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value='RECENT'>Most Recent</option>
                        <option value='HOT'>Most Popular</option>
                        <option value='UNANSWERED'>Unanswered</option>
                    </Select>
                    <Button variant='solid' color='#326AFD' bgColor={"#DDEAFF"} className="w-full" rounded={16} onClick={() => setIsModalOpen(true)} >
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
        <SearchBar placeholderT="Search..." changeHandler={(e: any) => { setSearchText(e.target.value) }} />

        <div className="row-span-7 mt-4 gap-4 flex flex-col">
            {orderedPosts ? orderedPosts.map((post, idx) => {
                return <ForumPostCard key={post._id} post={post} idx={idx} upvote={upvote} delForumPost={delForumPost} />
            }) : <></>}
        </div>
    </div>;
}

export default SectionForumPage;