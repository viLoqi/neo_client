import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Input } from "@chakra-ui/react";
import CommentLine from "./CommentLine";
import { Comment, ForumPostSchema } from "@/app/_types/main";
import { useRef } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import useNotifyEmail from "@/hooks/useNotifyEmail";
import useUser from "@/hooks/useUser";

interface CommentCardProps {
    comments: Comment[]
    addComment: (content: string, postId: string) => Promise<Response>
    post: ForumPostSchema
}
const CommentCard = ({ comments, addComment, post }: CommentCardProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const path = usePathname()
    const { notify } = useNotifyEmail()
    const [user] = useUser()

    const handlePostComment = () => {
        if (inputRef.current) {
            addComment(inputRef.current.value, post._id)
            if (post.instructorAnswer && post.instructorAnswer.authorEmail !== user?.email) {
                notify({
                    "to": post.instructorAnswer.authorEmail,
                    "type": "NEW COMMENT ADDED",
                    "cls": path.split("/")[2],
                    "question": post.question,
                    "description": inputRef.current.value,
                    "post_link": location.href
                })
            }
            inputRef.current.value = ""
        }
    }

    return <div className="shadow-md ">
        <Card variant={"outline"} >
            <CardHeader className="bg-light-bg-subtle">
                <Heading size={"md"}>{comments.length} Comments</Heading>
            </CardHeader>
            <CardBody className="bg-light-bg-subtle">
                <div className="sm:h-[12rem] overflow-y-auto">
                    {comments.toReversed().map(comment =>
                        <CommentLine key={crypto.randomUUID()} {...comment} />
                    )}
                </div>
                <Input placeholder="Add a comment..." ref={inputRef} />
            </CardBody>
            <CardFooter className="bg-light-bg-subtle">
                <Button leftIcon={<PaperPlaneTilt size={16} />} color={"#285ADE"} onClick={handlePostComment}>
                    Post
                </Button>
            </CardFooter>
        </Card>
    </div>;
}

export default CommentCard;