import { ForumPostSchema } from "@/app/_types/main";
import EditableControls from "@/components/EditableControls";
import useForumPosts from "@/hooks/useForumPosts";
import { Button, Card, CardBody, CardFooter, CardHeader, Editable, EditableInput, EditablePreview, Heading, Input } from "@chakra-ui/react";
import { PaperPlaneTilt, PencilSimple, SealQuestion, Star } from "@phosphor-icons/react";
import { useRef } from "react";

interface Input extends ForumPostSchema {
    post_id: string
    editPost: any
}
const QuestionCard = ({ question, description, editPost, post_id }: Input) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleEditDescription = () => {
        if (inputRef.current) {
            editPost(inputRef.current.value, post_id)
        }
    }
    return <div className="shadow-md">
        <Card className="rounded-md">
            <CardHeader className="bg-light-bg-subtle">
                <span className="flex items-center gap-1 text-light-primary py-2"><SealQuestion /> Question</span>
                <Heading size={"md"}>{question}</Heading>
            </CardHeader>
            <CardBody className="bg-light-bg-subtle text-light-fg-text">
                <Editable
                    className="flex flex-col gap-2"
                    isPreviewFocusable={false} defaultValue={description} onSubmit={handleEditDescription}>
                    <EditablePreview />
                    <Input as={EditableInput} placeholder={"Add an answer..."} ref={inputRef} />
                    <EditableControls />
                </Editable>
            </CardBody>
            <CardFooter className="bg-light-bg-subtle flex justify-between">
            </CardFooter>
        </Card>
    </div>;
}

export default QuestionCard;