export interface CardSchema {
    question: string,
    answer: string,
    choices: string[],
    hint: string,
    order: number;
}

// This is returned by the GET call to decks
export interface DeckSchema {
    _id: string,
    name: string,
    class: string,
    cards: CardSchema[]
}

// This is returned by POST call to decks
export interface PostDeckResponse {
    deck_id: string,
    deck_name: string
}