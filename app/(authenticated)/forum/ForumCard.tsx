import { Link } from "@chakra-ui/next-js";
import { Card, Text, Heading, CardBody, CardFooter, Button, Center, Tooltip } from "@chakra-ui/react";
import { BookBookmark, Student } from "@phosphor-icons/react";

interface Input {
    name: string
    members: number
    sections: string[]
    sectionData: any
}

const ForumCard = ({ name, members, sections, sectionData }: Input) => {
    return (
        <div>
            <Card
                overflow='hidden'
                variant='outline'
            >
                <Center className="bg-light-bg-subtle">

                    <BookBookmark size={80} />

                    <CardBody >
                        <Heading size='md'>{name}</Heading>
                        <div className="flex items-center gap-2">
                            <Text py='2' display={"flex"} alignItems={"center"} gap={1}>
                                <Student /><span>{members} members</span>
                            </Text>
                            <Text py='2'>
                                Fall 2024
                            </Text>
                        </div>
                    </CardBody>

                    <CardFooter className="flex gap-4">
                        {sections.map(section => {
                            const { instructor, classNumber } = sectionData[section]

                            return (
                                <Tooltip key={crypto.randomUUID()} label={instructor}>
                                    <Link href={`/forum/${classNumber}`}>
                                        <Button key={crypto.randomUUID()} variant='solid' color='#326AFD' bgColor={"#DDEAFF"}>
                                            {section}
                                        </Button>
                                    </Link>
                                </Tooltip>
                            )
                        })}
                    </CardFooter>
                </Center>
            </Card>
        </div>
    )
}

export default ForumCard;