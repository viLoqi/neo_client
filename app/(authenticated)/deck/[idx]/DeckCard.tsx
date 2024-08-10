import { CardSchema } from "@/app/_types/deck";
import CardChoice from "./CardChoice";
import { Button, Card, CardBody, CardFooter, CardHeader, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, OrderedList, Select } from "@chakra-ui/react";
import { DotsThreeOutlineVertical, Lightbulb, PencilSimple, Star, ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import { useState } from "react";

const DeckCard = ({ card, idx }: { card: CardSchema, idx: number }) => {
    const [selected, setSelected] = useState(card.difficulty)

    const colorTable = {
        "EASY": "text-success",
        "MEDIUM": "text-warning",
        "HARD": "text-error"
    }

    return <Card className="shadow-md bg-light-bg-subtle">
        <CardHeader>
            <span className="flex justify-between">
                <div>
                    {card.question}
                </div>
                <div className="flex items-center">
                    <Select size="sm" value={selected} onChange={(e) => setSelected(e.target.value as "EASY" | "MEDIUM" | "HARD")} className={`${colorTable[selected]}`}>
                        <option className={`${colorTable["EASY"]}`} value='EASY'>Easy</option>
                        <option className={`${colorTable["MEDIUM"]}`} value='MEDIUM'>Medium</option>
                        <option className={`${colorTable["HARD"]}`} value='HARD'>Hard</option>
                    </Select>

                    <IconButton aria-label="Regenerate Question" icon={<Lightbulb />} bgColor={"transparent"} p={0} w={"fit-content"}>
                    </IconButton>

                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<DotsThreeOutlineVertical />}
                            variant={"ghost"}
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
                </div>
            </span>
        </CardHeader>
        <CardBody>

            <OrderedList styleType={"upper-alpha"}>
                {card.choices.map(choice => <CardChoice key={choice} choice={choice} />)}
            </OrderedList>
        </CardBody>
        <CardFooter className="flex">
            <IconButton aria-label="Upvote" icon={<ThumbsUp />} bgColor={"transparent"} p={0} w={"fit-content"}>
            </IconButton>
            <IconButton aria-label="Downvote" icon={<ThumbsDown />} bgColor={"transparent"} p={0} w={"fit-content"}>
            </IconButton>
            <IconButton aria-label="Edit Question" icon={<PencilSimple />} bgColor={"transparent"} p={0} w={"fit-content"}>
            </IconButton>
        </CardFooter>
    </Card>;
}

export default DeckCard;