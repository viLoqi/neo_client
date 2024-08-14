import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Input } from "@chakra-ui/react";
import CommentLine from "./CommentLine";
import { Comment } from "@/app/_types/main";
import { useRef } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";

interface CommentCardProps {
    comments: Comment[]
    addComment: (content: string, postId: string) => Promise<Response>
    postId: string
}
const CommentCard = ({ comments, addComment, postId }: CommentCardProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handlePostComment = () => {
        if (inputRef.current)
            addComment(inputRef.current.value, postId)
    }

    return <div className="shadow-md">
        <Card variant={"outline"} >
            <CardHeader className="bg-light-bg-subtle">
                <Heading size={"md"}>{comments.length} Comments</Heading>
            </CardHeader>
            <CardBody className="bg-light-bg-subtle">
                {comments.map(comment =>
                    <CommentLine key={crypto.randomUUID()} {...comment} />
                )}
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