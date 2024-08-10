"use client"

import { Button, Heading, Select } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import ForumPostCard from "./ForumPostCard";
import useForumPosts from "@/hooks/useForumPosts";
import SearchBar from "@/components/SearchBar";

const SectionForumPage = () => {
    const { idx } = useParams()

    const { posts, loading } = useForumPosts()

    return <div className="grid grid-rows-10 w-full h-screen p-6 overflow-y-scroll">
        <div className="row-span-1">
            <div className="flex justify-between w-full">
                <Heading className="col-span-2" size={"lg"}>{idx}</Heading>
                <div className="grid grid-flow-col gap-4">
                    <Select >
                        <option value='RECENT'>Most Recent</option>
                        <option value='HOT'>Most Popular</option>
                        <option value='UNANSWERED'>Unanswered</option>
                    </Select>
                    <Button key={crypto.randomUUID()} variant='solid' color='#326AFD' bgColor={"#DDEAFF"} className="w-full" rounded={16} >
                        Post Question
                    </Button>
                </div>
            </div>
        </div>
        <SearchBar />

        <div className="row-span-7 mt-4">
            {posts.map((post, idx) => {
                return <ForumPostCard key={crypto.randomUUID()} post={post} idx={idx} />
            })}
        </div>
    </div>;
}

export default SectionForumPage;