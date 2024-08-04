import { Card, Stack, Text, Heading, CardBody, CardFooter, Button, Center, SimpleGrid, Box } from "@chakra-ui/react";
import { BookBookmark, Student, Timer } from "@phosphor-icons/react";

const SemesterCard = () => {
    return <div>
        <Card
            overflow='hidden'
            variant='outline'
        >
            <Center>


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
                    <Button variant='solid' colorScheme='blue'>
                        Join Now
                    </Button>
                </CardFooter>
            </Center>

        </Card>
    </div>;
}

export default SemesterCard;