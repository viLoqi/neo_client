import { CardSchema } from "@/app/_types/deck";
import CardChoice from "./CardChoice";
import { Button, Card, CardBody, CardFooter, CardHeader, Editable, EditablePreview, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, OrderedList, Select } from "@chakra-ui/react";
import { DotsThreeOutlineVertical, FloppyDisk, Lightbulb, PencilSimple, SquareSplitVertical, Star, ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import useDecks from "@/hooks/useDecks";

const DeckCard = ({ card, cardIndex, deckIndex }: { card: CardSchema, cardIndex: number, deckIndex: number }) => {

    // Intermediate representation of the card when it changes
    const [varCard, setVarCard] = useState<CardSchema>(card)
    const [selected, setSelected] = useState(varCard.difficulty)

    const { decks, editCardInDeck } = useDecks()

    const colorTable = {
        "EASY": "text-success",
        "MEDIUM": "text-warning",
        "HARD": "text-error"
    }

    useEffect(() => {
        if (decks.length > 0)
            setVarCard(decks[deckIndex].cards[cardIndex])
    }, [decks])

    const handleRegenerate = () => {

        // TODO: @Benny replace this with AI regenerated response
        editCardInDeck(deckIndex, cardIndex, {
            "question": "GG",
            "answer": "int x;",
            "choices": [
                "GG",
                "GG",
                "variable x",
                "int = x;"
            ],
            "hint": "The correct syntax starts with the data type followed by the variable name.",
            "order": 0,
            "difficulty": "EASY"
        })
    }

    return <Card className="shadow-md bg-light-bg-subtle">
        <CardHeader>
            <span className="flex justify-between">
                <div>
                    {varCard.question}
                </div>
                <div className="flex items-center">
                    <Select size="sm" value={selected} onChange={(e) => setSelected(e.target.value as "EASY" | "MEDIUM" | "HARD")} className={`${colorTable[selected]}`}>
                        <option className={`${colorTable["EASY"]}`} value='EASY'>Easy</option>
                        <option className={`${colorTable["MEDIUM"]}`} value='MEDIUM'>Medium</option>
                        <option className={`${colorTable["HARD"]}`} value='HARD'>Hard</option>
                    </Select>

                    <IconButton aria-label="Regenerate Question" icon={<Lightbulb />} bgColor={"transparent"} p={0} w={"fit-content"} onClick={handleRegenerate}>
                    </IconButton>

                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<DotsThreeOutlineVertical />}
                            variant={"ghost"}
                        />
                        <MenuList>
                            <MenuItem >
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </span>
        </CardHeader>
        <CardBody>

            <OrderedList styleType={"upper-alpha"} className="flex flex-col gap-2">

                {varCard.choices.map(choice => <CardChoice key={choice} choice={choice} />)}
            </OrderedList>
        </CardBody>
        <CardFooter className="flex">
            {/* <IconButton aria-label="Upvote" icon={<ThumbsUp />} bgColor={"transparent"} p={0} w={"fit-content"}>
            </IconButton>
            <IconButton aria-label="Downvote" icon={<ThumbsDown />} bgColor={"transparent"} p={0} w={"fit-content"}>
            </IconButton>

            <Button aria-label="Share Post" leftIcon={<FloppyDisk />} bg={"none"} onClick={handleEdit} >
                <span className="text-light-fg-text">Save Changes</span>
            </Button> */}
        </CardFooter>
    </Card>;
}

export default DeckCard;