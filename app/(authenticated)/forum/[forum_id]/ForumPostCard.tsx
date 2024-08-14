import { ForumPostSchema } from "@/app/_types/main";
import useForumPosts from "@/hooks/useForumPosts";
import { Link } from "@chakra-ui/next-js";
import { Avatar, Card, CardBody, CardFooter, CardHeader, Button, LinkOverlay } from "@chakra-ui/react";
import { ChatCentered, DotsThreeOutlineVertical, ShareFat, ThumbsUp } from "@phosphor-icons/react";
import moment from "moment";
import { usePathname } from "next/navigation";
import { useClipboard } from '@chakra-ui/react'
import { useEffect } from "react";
import NextLink from "next/link"

const ForumPostCard = ({ post, idx, upvote }: { post: ForumPostSchema, idx: number, upvote: any }) => {
    const basePath = usePathname()
    const { onCopy, value, setValue, hasCopied } = useClipboard('')
    useEffect(() => {
        setValue(`https://loqi.jiechen.dev${basePath}/posts/${post._id}`)
    }, [])

    return (
        <div className="flex bg-light-bg-subtle shadow-md rounded-md">
            <div className="w-[5%] flex items-center text-center justify-center ">--</div>
            <Card className="w-full bg-light-bg-subtle" variant='outline'>
                <CardHeader className="bg-light-bg-subtle">
                    <div className="flex justify-between bg-light-bg-subtle">
                        <div>

                            <div className={`flex items-center w-full h-full `}>
                                <Avatar name={post.authorName} src={post.authorPhotoURL}>
                                </Avatar>
                                <div className="relative size-3 ml-[-12px] mb-[-30px] rounded-fullz-10">
                                </div>
                                <LinkOverlay as={NextLink} href={`${basePath}/posts/${post._id}`} className="bg-light-bg-subtle">
                                    <div className="flex flex-col ml-3">
                                        <p className="text-sm font-semibold">{post.authorName}</p>
                                        <small className="text-light-fg-text">{moment(post.firstCreated.toDate()).fromNow()}</small>
                                    </div>
                                </LinkOverlay>
                            </div>
                        </div>

                        <Button aria-label="More Action" leftIcon={<DotsThreeOutlineVertical />} bg={"none"}>
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="gap-4 flex flex-col bg-light-bg-subtle ">
                    <div className="border p-4 rounded-2xl border-light-bg-active">
                        {post.question}
                    </div>
                    <div className="border p-4 rounded-2xl border-light-bg-active text-light-fg-text">
                        {post.instructorAnswer ? post.instructorAnswer.content : "Unanswered"}
                    </div>
                </CardBody>
                <CardFooter className="flex justify-between text-light-fg-text bg-light-bg-subtle">
                    <div className="flex gap-2 text-center items-center">
                        <Button aria-label="Upvote" leftIcon={<ThumbsUp />} bg={"none"} onClick={() => upvote(post._id)}>
                            <span className="text-light-fg-text" >{post.upvotes}</span>
                        </Button>

                        {/* <Button aria-label="Downvote" leftIcon={<ThumbsDown />} bg={"none"}>
                            <span className="text-light-fg-text">{post.downvotes}</span>
                        </Button> */}

                        <Link href={`${basePath}/posts/${post._id}`}>
                            <Button aria-label="Comment" leftIcon={<ChatCentered />} bg={"none"}>

                                <span className="text-light-fg-text">{post.followups.length + (post.studentAnswer ? 1 : 0) + (post.instructorAnswer ? 1 : 0)}</span>
                            </Button>
                        </Link>
                    </div>
                    <div className="flex gap-2 text-center items-center">
                        <Button aria-label="Share Post" leftIcon={<ShareFat />} bg={"none"} onClick={onCopy} >
                            <span className="text-light-fg-text">Share</span>
                        </Button>
                    </div>
                </CardFooter>
            </Card>

        </div >);
}

export default ForumPostCard;