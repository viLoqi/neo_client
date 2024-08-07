"use client"

import { Button, Heading, Input, Select } from "@chakra-ui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import ForumPostCard from "./ForumPostCard";
import { ForumPostSchema } from "@/app/_types/main";

const SectionForumPage = () => {
    const { idx } = useParams()

    const posts: ForumPostSchema[] = [{ postId: "1", pinned: false, question: "WHat is 9 + 10", studentAnswer: "", instructorAnswer: "", followups: [], upvotes: 0, downvotes: 0, authorName: "Jie Chen", authorPhotoURL: "https://lh3.googleusercontent.com/a/ACg8ocKjfu_nP3HQYP4CPUMPvArMpFT04AX6b5OqGqAQfAxLPp7WB4ZR=s288-c-no", firstCreated: Date.now() }]

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
            <div className="flex items-center w-full p-4 my-4 bg-light-bg-subtle">
                <MagnifyingGlass weight="duotone" />
                <Input placeholder='Search by Subject or Keyword' className='ml-2 focus:outline-none w-full bg-inherit' onChange={(e) => { }} variant='unstyled' />
            </div>
        </div>

        <div className="row-span-8 mt-4">
            {posts.map((post, idx) => {
                return <ForumPostCard key={crypto.randomUUID()} post={post} idx={idx} />
            })}
        </div>
    </div>;
}

export default SectionForumPage;