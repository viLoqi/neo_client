import { Card, CardHeader, CardBody, CardFooter, Avatar, Input, Heading, Button, Editable, EditableInput, EditablePreview, Textarea } from "@chakra-ui/react";
import { Answer, ForumPostSchema } from "@/app/_types/main";
import moment from "moment";
import { useRef, useState } from "react";
import { PaperPlaneTilt, PencilSimple } from "@phosphor-icons/react";
import EditableControls from "@/components/EditableControls";
import { usePathname } from "next/navigation";
import useNotifyEmail from "@/hooks/useNotifyEmail";
import useForumProperties from "@/hooks/useForumProperties";
import useUser from "@/hooks/useUser";

interface Input {
    answerer: Answer | null
    role: string
    post: ForumPostSchema
    addAnswer: any
}

const AnswerCard = ({ answerer, role, addAnswer, post }: Input) => {

    const path = usePathname()
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const [inputValue, setInputValue] = useState(answerer?.content)
    const { notify } = useNotifyEmail()
    const forumProperties = useForumProperties(path.split("/")[2])
    const [user] = useUser()


    const handlePostAnswer = () => {
        if (inputRef.current) {
            addAnswer(inputRef.current.value, role, post._id)
            setInputValue(inputRef.current.value)
            // notify({
            //     "to": post.authorEmail,
            //     "type": "NEW ANSWER ADDED",
            //     "cls": path.split("/")[2],
            //     "question": post.question,
            //     "description": inputRef.current.value,
            //     "post_link": location.href
            // })

            if (post.instructorAnswer) {
                // notify({
                //     "to": post.instructorAnswer.authorEmail,
                //     "type": "NEW ANSWER ADDED",
                //     "cls": path.split("/")[2],
                //     "question": post.question,
                //     "description": inputRef.current.value,
                //     "post_link": location.href
                // })
            }
        }
    }

    if (role === "instructor" && !forumProperties[0]?.instructors.includes(user?.email)) {
        return <div className="shadow-md">
            <Card variant={"outline"}>
                <CardHeader className="bg-light-bg-subtle">
                    {answerer ? <div className={`flex items-center w-full h-full `}>
                        <Avatar name={answerer?.author} src={answerer?.authorPhotoURL}>
                        </Avatar>
                        <div className="relative size-3 ml-[-12px] mb-[-30px] rounded-fullz-10">
                        </div>
                        <div className="flex flex-col ml-3">
                            <p className="text-sm font-semibold">{answerer?.author}</p>
                            <span className="flex gap-1">
                                <small className="text-light-fg-text capitalize" >{answerer?.role} ·</small>
                                <small className="text-light-fg-text">{moment(answerer?.timestamp.toDate()).fromNow()}</small>
                            </span>
                        </div>
                    </div> : <Heading size={'md'}>{role === "instructor" ? "Instructor Answer" : "Student Answer"}</Heading>}
                </CardHeader>
                <CardBody className="bg-light-bg-subtle">
                    <Editable
                        className="flex flex-col gap-2"
                        isPreviewFocusable={false} value={inputValue} onChange={(value) => {
                            setInputValue(value)
                        }} onSubmit={handlePostAnswer}>
                        <EditablePreview />
                    </Editable>
                </CardBody>
                <CardFooter className="bg-light-bg-subtle">

                </CardFooter>
            </Card >
        </div >;
    }

    return <div className="shadow-md">
        <Card variant={"outline"}>
            <CardHeader className="bg-light-bg-subtle">
                {answerer ? <div className={`flex items-center w-full h-full `}>
                    <Avatar name={answerer?.author} src={answerer?.authorPhotoURL}>
                    </Avatar>
                    <div className="relative size-3 ml-[-12px] mb-[-30px] rounded-fullz-10">
                    </div>
                    <div className="flex flex-col ml-3">
                        <p className="text-sm font-semibold">{answerer?.author}</p>
                        <span className="flex gap-1">
                            <small className="text-light-fg-text capitalize" >{answerer?.role} ·</small>
                            <small className="text-light-fg-text">{moment(answerer?.timestamp.toDate()).fromNow()}</small>
                        </span>
                    </div>
                </div> : <Heading size={'md'}>{role === "instructor" ? "Instructor Answer" : "Student Answer"}</Heading>}
            </CardHeader>
            <CardBody className="bg-light-bg-subtle">
                <Editable
                    className="flex flex-col gap-2"
                    isPreviewFocusable={false} value={inputValue} onChange={(value) => {
                        setInputValue(value)
                    }} onSubmit={handlePostAnswer}>
                    <EditablePreview />
                    {answerer?.content ? <>
                        <Textarea as={EditableInput} placeholder={"Add an answer..."} ref={inputRef} />
                        <EditableControls />
                    </> : <>
                        <Textarea placeholder={answerer?.content ?? "Add an answer..."} ref={inputRef} />
                        <Button leftIcon={answerer?.content ? <PencilSimple size={16} /> : <PaperPlaneTilt size={16} />} color={"#285ADE"} maxW={'xs'} onClick={handlePostAnswer}>
                            Post
                        </Button>
                    </>}

                </Editable>
            </CardBody>
            <CardFooter className="bg-light-bg-subtle">

            </CardFooter>
        </Card >
    </div >;
}

export default AnswerCard;