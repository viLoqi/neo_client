import { Course } from "@/components/Sidebar";
import { Link } from "@chakra-ui/next-js";
import { Card, Text, Heading, CardBody, CardFooter, Button, Center, Tooltip } from "@chakra-ui/react";
import { BookBookmark, NavigationArrow, Student } from "@phosphor-icons/react";

interface Input {
    name: string
    members: number
    sections: string[]
    sectionData: any
}

const ForumCard = ({ name, members, sections, sectionData }: Input) => {

    console.log(name, sectionData)


    const handleUpdateRecent = (forumLink: string) => {
        const item = localStorage.getItem("recent")

        if (item) {
            const obj = JSON.parse(item) as Course[]

            if (!obj.filter(c => c.cid === name).length && obj.length <= 5)
                localStorage.setItem("recent", JSON.stringify([...JSON.parse(item), { cid: name, link: forumLink }]))
        } else
            localStorage.setItem("recent", JSON.stringify([{ cid: name, link: forumLink }]))

    }

    return (
        <div className="max-w-lg">
            <Card
                overflow='hidden'
                variant='outline'
            >
                <Center className="bg-light-bg-subtle">

                    <BookBookmark size={80} />

                    <CardBody >
                        <Heading size='md'>{name}</Heading>
                        <div className="flex items-center gap-2">

                            <Text py='2'>
                                Fall 2024
                            </Text>
                        </div>
                    </CardBody>

                    <CardFooter className="flex gap-4">
                        {sections.map(section => {
                            const { instructor, classNumber } = sectionData[section]
                            const forumLink = `/forum/${name.split(" ").join("")}-${section}(${classNumber})`

                            return (
                                <Tooltip key={crypto.randomUUID()} label={instructor}>
                                    <Link href={forumLink} onClick={() => handleUpdateRecent(forumLink)}>
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