import { PrivateDeck } from "@/app/_types/repo"
import { Card, Text, Heading, CardBody, CardFooter, Button, Center } from "@chakra-ui/react";
import { Cpu, DotsThreeOutlineVertical, Question, SealQuestion, Student, Timer } from "@phosphor-icons/react";
import { Menu, IconButton, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

interface Input {
    deck: PrivateDeck
    idx: number
}
export default function Deck({ deck, idx }: Input) {
    return (
        <Card
            overflow='hidden'
            variant='outline'
        >
            <Center className="bg-light-bg-subtle">
                <CardBody >
                    <span className="flex justify-between">
                        <div className="flex items-center gap-2 text-center">
                            <Cpu size={24} />
                            <Heading size='md'>{deck.name}</Heading>
                        </div>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<DotsThreeOutlineVertical size={24} />}
                                variant='outline'
                            />
                            <MenuList>
                                <MenuItem>
                                    Edit
                                </MenuItem>
                                <MenuItem >
                                    Delete
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </span>
                    <div className="grid grid-cols-3 items-center gap-1">
                        <Text py='2' display={"flex"} alignItems={"center"} gap={1}>
                            <SealQuestion />  <span>{deck.cards.length} Questions</span>
                        </Text>
                        <Text py='2' display={"flex"} alignItems={"center"} gap={1}>
                            <Timer /> <span>30 min</span>
                        </Text>
                        <Text py='2'>
                            Fall 2024
                        </Text>
                    </div>
                    <Button variant='solid' colorScheme='blue'>
                        Study Now
                    </Button>
                </CardBody>
            </Center>

        </Card>)
};