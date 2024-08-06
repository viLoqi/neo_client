import { CardSchema } from "@/app/_types/deck";
import CardChoice from "./CardChoice";
import { Card, CardBody, CardFooter, CardHeader, OrderedList, Select } from "@chakra-ui/react";
import { DotsThreeOutlineVertical, Lightbulb, PencilSimple, ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
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
                <div className="flex items-center gap-2">
                    <Select size="sm" value={selected} onChange={(e) => setSelected(e.target.value as "EASY" | "MEDIUM" | "HARD")} className={`${colorTable[selected]}`}>
                        <option className={`${colorTable["EASY"]}`} value='EASY'>Easy</option>
                        <option className={`${colorTable["MEDIUM"]}`} value='MEDIUM'>Medium</option>
                        <option className={`${colorTable["HARD"]}`} value='HARD'>Hard</option>
                    </Select>
                    <Lightbulb size={20} weight="duotone" />
                    <DotsThreeOutlineVertical size={20} weight="duotone" />
                </div>
            </span>
        </CardHeader>
        <CardBody>

            <OrderedList styleType={"upper-alpha"}>
                {card.choices.map(choice => <CardChoice key={choice} choice={choice} />)}
            </OrderedList>
        </CardBody>
        <CardFooter className="flex gap-1">
            <ThumbsUp size={20} weight="duotone" />
            <ThumbsDown size={20} weight="duotone" />
            <PencilSimple size={20} weight="duotone" />
        </CardFooter>
    </Card>;
}

export default DeckCard;