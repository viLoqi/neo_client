import { ForumPostSchema } from "@/app/_types/main";
import { Link } from "@chakra-ui/next-js";
import { Avatar, Card, CardBody, CardFooter, CardHeader, Button, LinkOverlay, IconButton, Menu, MenuButton, MenuItem, MenuList, useClipboard, useToast } from "@chakra-ui/react";
import { ChatCentered, DotsThreeOutlineVertical, ShareFat, ThumbsUp } from "@phosphor-icons/react";
import moment from "moment";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NextLink from "next/link"
import useUser from "@/hooks/useUser";

const ForumPostCard = ({ post, idx, upvote, delForumPost }: { post: ForumPostSchema, idx: number, upvote: any, delForumPost: any }) => {
    const basePath = usePathname()
    const { onCopy, value, setValue, hasCopied } = useClipboard('')
    const [user] = useUser()
    useEffect(() => {
        setValue(`https://loqi.jiechen.dev${basePath}/posts/${post._id}`)
    }, [])
    const toast = useToast()
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

                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<DotsThreeOutlineVertical size={24} />}
                                variant={"ghost"}
                            />
                            <MenuList>
                                <MenuItem as={Link} href={`${basePath}/posts/${post._id}`}>
                                    Edit
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    if (post.authorName === user?.displayName) {
                                        toast.promise(delForumPost(post._id), {
                                            success: { title: 'Post Deleted', description: 'Looks great' },
                                            error: { title: 'Post Was Not Deleted', description: 'Something wrong' },
                                            loading: { title: 'Deleting Post...', description: 'Please wait' },
                                        })
                                    } else {
                                        toast({
                                            title: 'Post Was Not Deleted',
                                            description: "You did not create this post.",
                                            status: 'error',
                                            duration: 9000,
                                            isClosable: true,
                                        })
                                    }
                                }}>
                                    Delete
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </CardHeader>
                <CardBody className="gap-4 flex flex-col bg-light-bg-subtle ">
                    <div className="border p-4 rounded-2xl border-light-bg-active">
                        {post.question}
                    </div>
                    <div className="border p-4 rounded-2xl border-light-bg-active text-light-fg-text">
                        {post.instructorAnswer ? post.instructorAnswer.content : "--"}
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