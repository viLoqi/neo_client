import { PrivateDeck } from "@/app/_types/repo";
import DeckCard from "./DeckCard";

const CardsTab = ({ selectedDeck }: { selectedDeck: PrivateDeck }) => {
    return (
        <div className="flex gap-1 flex-col">
            {selectedDeck.cards.map(((card, idx) => <DeckCard key={crypto.randomUUID()} card={card} idx={idx} />))}
        </div>
    );
}

export default CardsTab;