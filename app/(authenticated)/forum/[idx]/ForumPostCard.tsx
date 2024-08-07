import { ForumPostSchema } from "@/app/_types/main";
import { Avatar, Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";
import { ChatCentered, DotsThreeOutlineVertical, ShareFat, ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import moment from "moment";

const ForumPostCard = ({ post, idx }: { post: ForumPostSchema, idx: number }) => {


    return (
        <div className=" bg-light-bg-subtle shadow-md">
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex justify-between">
                        <div>
                            <div className={`flex items-center w-full h-full `}>
                                <Avatar name={post.authorName} src={post.authorPhotoURL}>
                                </Avatar>
                                <div className="relative size-3 ml-[-12px] mb-[-30px] rounded-fullz-10">
                                </div>
                                <div className="flex flex-col ml-3">
                                    <p className="text-sm font-semibold">{post.authorName}</p>
                                    <small className="text-light-fg-text">{moment(post.firstCreated).fromNow()}</small>
                                </div>

                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <DotsThreeOutlineVertical size={20} weight="duotone" />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="gap-4 flex flex-col">
                    <div className="border p-4 rounded-2xl border-light-bg-active">
                        {post.question}
                    </div>
                    <div className="border p-4 rounded-2xl border-light-bg-active text-light-fg-text">
                        {post.instructorAnswer ? post.instructorAnswer : "Unanswered"}
                    </div>
                </CardBody>
                <CardFooter className="flex justify-between text-light-fg-text">
                    <div className="flex gap-2 text-center">
                        <div>
                            <ThumbsUp size={20} weight="duotone" />
                            <span>{post.upvotes}</span>
                        </div>
                        <div>
                            <ThumbsDown size={20} weight="duotone" />
                            <span>{post.downvotes}</span>
                        </div>
                        <div>
                            <ChatCentered size={20} weight="duotone" />
                            <span>{post.followups.length + (post.studentAnswer ? 1 : 0) + (post.instructorAnswer ? 1 : 0)}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <ShareFat size={20} weight="duotone" />
                        <span className="text-light-fg-text">Share</span>
                    </div>
                </CardFooter>
            </Card>
        </div>);
}

export default ForumPostCard;