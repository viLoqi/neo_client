import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box } from "@chakra-ui/react";
import { Comment } from "@/app/_types/main";
import moment from "moment";

const CommentLine = ({ author, timestamp, authorPhotoURL, content, replies }: Comment) => {
    return <div className="flex gap-4 w-full">
        <Avatar name="TEST" size={'sm'} />
        <div className="flex flex-col gap-2 w-full" >
            <div className="flex  items-center text-center">
                <p>{author}</p>
                <p className="text-light-fg-text"> · {moment(timestamp.toDate()).fromNow()}</p>
            </div>
            <div className="text-light-fg-text">
                {content}
            </div>
            <div className="w-full">{replies?.length ?
                <Accordion allowToggle allowMultiple variant={'outline'} >
                    <AccordionItem  >
                        <h2 >
                            <AccordionButton>
                                <Box as='span' flex='1' textAlign='left'>
                                    View Replies {`(${replies?.length})`}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {replies.map(reply => <CommentLine key={crypto.randomUUID()} {...reply} />)}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion> : <></>}
            </div>
        </div>

    </div>
}

export default CommentLine;