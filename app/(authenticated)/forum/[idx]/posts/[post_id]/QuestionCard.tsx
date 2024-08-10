import { ForumPostSchema } from "@/app/_types/main";
import { Button, Card, CardBody, CardFooter, CardHeader, Heading } from "@chakra-ui/react";
import { PencilSimple, SealQuestion, Star } from "@phosphor-icons/react";

const QuestionCard = ({ postId, question, description }: ForumPostSchema) => {
    return <div className="shadow-md">
        <Card className="rounded-md">
            <CardHeader className="bg-light-bg-subtle">
                <span className="flex items-center gap-1 text-light-primary py-2"><SealQuestion /> Question / {parseInt(postId) + 1}</span>
                <Heading size={"md"}>{question}</Heading>
            </CardHeader>
            <CardBody className="bg-light-bg-subtle text-light-fg-text">
                {description}
            </CardBody>
            <CardFooter className="bg-light-bg-subtle flex justify-between">
                <Button leftIcon={<PencilSimple size={16} />} color={"#285ADE"}>
                    Edit
                </Button>
                <Button leftIcon={<Star size={16} />} bgColor={"transparent"}>
                </Button>
            </CardFooter>
        </Card>
    </div>;
}

export default QuestionCard;