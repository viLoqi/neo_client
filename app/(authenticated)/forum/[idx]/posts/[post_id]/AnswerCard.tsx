import { Card, CardHeader, CardBody, CardFooter, Avatar, Input, Heading } from "@chakra-ui/react";
import { Answer } from "@/app/_types/main";
import moment from "moment";

interface Input {
    answerer: Answer | null
    title: string
}

const AnswerCard = ({ answerer, title }: Input) => {

    if (answerer)
        return <div className="shadow-md">
            <Card variant={"outline"}>
                <CardHeader className="bg-light-bg-subtle">
                    <span className="flex gap-2" >
                        <Avatar name="TEST" size={'sm'} />
                        <span>
                            <p>{answerer.author}</p>
                            <small className="capitalize">{answerer.role}</small>
                            <small className="text-light-fg-text"> · {moment(answerer.timestamp).fromNow()}</small>
                        </span>
                    </span>
                </CardHeader>
                <CardBody className="bg-light-bg-subtle">
                    {answerer.content}
                </CardBody>
                <CardFooter className="bg-light-bg-subtle">
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
                    <Input placeholder="Add an answer..." />
                </CardBody>
                <CardFooter className="bg-light-bg-subtle">
                </CardFooter>
            </Card>
        </div>;
}

export default AnswerCard;