import { CardSchema } from "@/app/_types/deck";
import CardChoice from "./CardChoice";
import { Button, Card, CardBody, CardFooter, CardHeader, Editable, EditablePreview, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, OrderedList, Select, useToast } from "@chakra-ui/react";
import { DotsThreeOutlineVertical, FloppyDisk, Lightbulb } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import useDecks from "@/hooks/useDecks";

function parseToCardSchema(generatedQuestions: string): CardSchema[] {
    const questionsObj = JSON.parse(generatedQuestions);
    return Object.keys(questionsObj).map((key, index) => {
        const { question, answer, choices, hint, difficulty } = questionsObj[key];
        return { question, answer, choices, hint, order: index, difficulty };
    });
}

const DeckCard = ({ card, cardIndex, deckIndex }: { card: CardSchema, cardIndex: number, deckIndex: number }) => {
    const toast = useToast()
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

        const handleGenerateDeck = async (numQuestions: string, questionType: string, difficulty: "EASY" | "MEDIUM" | "HARD") => {
            console.log(`Number of Questions: ${numQuestions}, Question Type: ${questionType}, Difficulty: ${difficulty}`);

            const payload = { numQuestions, questionType, difficulty };
            console.log("type of: ", typeof payload);

            try {
                const response = await fetch('https://us-east1-loqi-loqi.cloudfunctions.net/ai', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const generatedQuestions = await response.json();
                console.log("type of2: ", typeof generatedQuestions);

                console.log("generatedQuestions:", generatedQuestions);
                const cardSchemas = parseToCardSchema(generatedQuestions);

                console.log('Generated Questions:', generatedQuestions);
                if (cardSchemas.length > 0) {
                    console.log('First Generated CardSchema:', cardSchemas[0]);
                }

                console.log(questionType, cardSchemas)

                editCardInDeck(deckIndex, cardIndex, cardSchemas[0])
                // editCardInDeck(deckIndex, cardIndex, {
                //     "question": "GG",
                //     "answer": "int x;",
                //     "choices": [
                //         "GG",
                //         "GG",
                //         "variable x",
                //         "int = x;"
                //     ],
                //     "hint": "The correct syntax starts with the data type followed by the variable name.",
                //     "order": 0,
                //     "difficulty": "EASY"
                // })

                return "done"

            } catch (error) {
                console.error('Error generating questions:', error);
                throw new Error()
            }

        };

        toast.promise(handleGenerateDeck("1", decks[deckIndex].name, selected), {
            success: { title: 'Card Regenerated', description: 'Looks great' },
            error: { title: 'Card Was Not Generated', description: 'Something wrong, please try again' },
            loading: { title: 'Regenerating Card...', description: 'Please wait' },
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
                {varCard.choices.map((choice, idx) => <CardChoice key={choice + idx} choice={choice} />)}
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