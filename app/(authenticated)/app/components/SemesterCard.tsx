import { Link } from "@chakra-ui/next-js";
import { Card, Text, Heading, CardBody, CardFooter, Button, Center } from "@chakra-ui/react";
import { BookBookmark, Student, Timer } from "@phosphor-icons/react";

const SemesterCard = () => {
    return (
        <div className="my-4 max-w-lg">
            <Card
                overflow='hidden'
                variant='outline'
            >
                <Center className="bg-light-bg-subtle">

                    <BookBookmark size={80} />

                    <CardBody >
                        <Heading size='md'>Check out the forums tab!</Heading>
                        <div className="grid grid-cols-3 items-center gap-1">
                            <Text py='2' display={"flex"} alignItems={"center"} gap={1}>
                                <Student />  <span>∞</span>
                            </Text>
                            <Text py='2'>
                                Fall 2024
                            </Text>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <Link href="/forum" >
                            <Button variant='solid' color='#326AFD' bgColor={"#DDEAFF"}>
                                Go Now
                            </Button>
                        </Link>
                    </CardFooter>
                </Center>

            </Card>
        </div>
    )
}

export default SemesterCard;