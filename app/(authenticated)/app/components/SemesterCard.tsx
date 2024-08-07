import { Card, Text, Heading, CardBody, CardFooter, Button, Center } from "@chakra-ui/react";
import { BookBookmark, Student, Timer } from "@phosphor-icons/react";

const SemesterCard = () => {
    return (
        <Card
            overflow='hidden'
            variant='outline'
        >
            <Center className="bg-light-bg-subtle">

                <BookBookmark size={80} />

                <CardBody >
                    <Heading size='md'>1st Semester</Heading>
                    <div className="grid grid-cols-3 items-center gap-1">
                        <Text py='2' display={"flex"} alignItems={"center"} gap={1}>
                            <Student />  <span>42</span>
                        </Text>
                        <Text py='2' display={"flex"} alignItems={"center"} gap={1}>
                            <Timer /> <span>30 min</span>
                        </Text>
                        <Text py='2'>
                            Fall 2024
                        </Text>
                    </div>
                </CardBody>

                <CardFooter>
                    <Button variant='solid' color='#326AFD' bgColor={"#DDEAFF"}>
                        Join Now
                    </Button>
                </CardFooter>
            </Center>

        </Card>)
}

export default SemesterCard;