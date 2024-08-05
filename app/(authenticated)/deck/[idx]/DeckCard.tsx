import { CardSchema } from "@/app/_types/deck";

const DeckCard = ({ card }: { card: CardSchema }) => {
    return <div>{card.answer}</div>;
}

export default DeckCard;