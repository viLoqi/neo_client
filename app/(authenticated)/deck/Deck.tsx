import { PrivateDeck } from "@/app/_types/repo"
import { Card, Text, Heading, CardBody, Button, Center, Menu, IconButton, MenuButton, MenuList, MenuItem, CardFooter, useToast, LinkOverlay } from "@chakra-ui/react";
import { Cpu, DotsThreeOutlineVertical, SealQuestion, Timer } from "@phosphor-icons/react";
import { Link } from "@chakra-ui/next-js";

interface Input {
    deck: PrivateDeck
    idx: number
    delDeckfromPrivateRepo: any
}

export default function Deck({ deck, idx, delDeckfromPrivateRepo }: Input) {
    const toast = useToast()
    return (
        <div>
            <Card
                overflow='hidden'
                variant='outline'
            >
                <CardBody className="bg-light-bg-subtle" >
                    <LinkOverlay href={`/deck/${idx}`}>
                    </LinkOverlay>
                    <span className="flex justify-between">
                        <div className="flex items-center gap-2 text-center">
                            <Cpu size={24} />
                            <Heading size='md' className="capitalize">{deck.name}</Heading>
                        </div>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<DotsThreeOutlineVertical size={24} />}
                                variant={"ghost"}
                            />
                            <MenuList>
                                <MenuItem as={Link} href={`/deck/${idx}`}>
                                    Edit
                                </MenuItem>
                                <MenuItem onClick={() => {

                                    toast.promise(delDeckfromPrivateRepo(idx), {
                                        success: { title: 'Deck Deleted', description: 'Looks great' },
                                        error: { title: 'Deck Was Not Deleted', description: 'Something wrong' },
                                        loading: { title: 'Deleting Deck...', description: 'Please wait' },
                                    })
                                }}>
                                    Delete
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </span>


                </CardBody>
                <CardFooter className="bg-light-bg-subtle">
                    {/* <Button variant='solid' color='#326AFD' bgColor={"#DDEAFF"}>
                        Study Now
                    </Button> */}
                    <div className="grid grid-cols-3 items-center gap-1 w-full">
                        <Text py='2' display={"flex"} alignItems={"center"} gap={1}>
                            <SealQuestion />  <span>{deck.cards.length} Questions</span>
                        </Text>
                        {/* <Text py='2' display={"flex"} alignItems={"center"} gap={1}>
                            <Timer /> <span>30 min</span>
                        </Text> */}
                        {/* <Text py='2'>
                            Fall 2024
                        </Text> */}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
};