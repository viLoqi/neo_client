import { Card, CardBody, CardFooter, CardHeader, Heading, Input } from "@chakra-ui/react";
import CommentLine from "./CommentLine";
import { Comment } from "@/app/_types/main";

const CommentCard = ({ comments }: { comments: Comment[] }) => {
    return <div className="shadow-md">
        <Card variant={"outline"} >
            <CardHeader className="bg-light-bg-subtle">
                <Heading size={"md"}>{comments.length} Comments</Heading>
            </CardHeader>
            <CardBody className="bg-light-bg-subtle">
                {comments.map(comment =>
                    <CommentLine key={crypto.randomUUID()} {...comment} />
                )}
            </CardBody>
            <CardFooter className="bg-light-bg-subtle">
                <Input placeholder="Add a comment..." />
            </CardFooter>
        </Card>
    </div>;
}

export default CommentCard;