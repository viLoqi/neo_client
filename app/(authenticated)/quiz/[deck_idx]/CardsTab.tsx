import { PrivateDeck } from "@/app/_types/repo";
import DeckCard from "./DeckCard";

const CardsTab = ({ selectedDeck, deckIndex }: { selectedDeck: PrivateDeck, deckIndex: number }) => {

    return (
        <div className="flex gap-2 flex-col">
            {selectedDeck.cards.map(((card, idx) => <DeckCard key={card.question} card={card} cardIndex={idx} deckIndex={deckIndex} />))}
        </div>
    );
}

export default CardsTab;