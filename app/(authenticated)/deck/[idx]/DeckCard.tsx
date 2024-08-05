import { CardSchema } from "@/app/_types/deck";
import CardChoice from "./CardChoice";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";

const DeckCard = ({ card }: { card: CardSchema }) => {
    return <Card>
        <CardHeader>
            Q/1 {card.question}
        </CardHeader>
        <CardBody>
            {card.choices.map(choice => <CardChoice key={choice} choice={choice} />)}
        </CardBody>
        <CardFooter>
            {card.hint}
        </CardFooter>
    </Card>;
}

export default DeckCard;