import { Card, CardHeader, CardBody, CardFooter, Avatar, Input, Heading, Button } from "@chakra-ui/react";
import { Answer, ForumAnswerPostRequest } from "@/app/_types/main";
import moment from "moment";
import { useRef } from "react";
import { PaperPlaneTilt, PencilSimple } from "@phosphor-icons/react";

interface Input {
    answerer: Answer | null
    title: string
    postId: string
    addAnswer: (content: string, role: string, postId: string) => Promise<Response>
}

const AnswerCard = ({ answerer, title, addAnswer, postId }: Input) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const handlePostAnswer = () => {
        if (inputRef.current)
            addAnswer(inputRef.current.value, title === "Instructor Answer" ? "instructor" : "student", postId)
    }


    if (answerer)
        return <div className="shadow-md">
            <Card variant={"outline"}>
                <CardHeader className="bg-light-bg-subtle">
                    <span className="flex gap-2" >
                        <Avatar name="TEST" size={'sm'} />
                        <span>
                            <p>{answerer.author}</p>
                            <small className="capitalize">{answerer.role}</small>
                            <small className="text-light-fg-text"> · {moment(answerer.timestamp.toDate()).fromNow()}</small>
                        </span>
                    </span>
                </CardHeader>
                <CardBody className="bg-light-bg-subtle">
                    {answerer.content}
                </CardBody>
                <CardFooter className="bg-light-bg-subtle">
                    <Button leftIcon={<PencilSimple size={16} />} color={"#285ADE"}>
                        Edit
                    </Button>
                </CardFooter>
            </Card>
        </div>;
    else
        return <div className="shadow-md">
            <Card variant={"outline"}>
                <CardHeader className="bg-light-bg-subtle">
                    <Heading size={"md"}>{title}</Heading>
                </CardHeader>
                <CardBody className="bg-light-bg-subtle">
                    <Input placeholder="Add an answer..." ref={inputRef} />
                </CardBody>
                <CardFooter className="bg-light-bg-subtle">
                    <Button leftIcon={<PaperPlaneTilt size={16} />} color={"#285ADE"} onClick={handlePostAnswer}>
                        Post
                    </Button>
                </CardFooter>
            </Card>
        </div>;
}

export default AnswerCard;