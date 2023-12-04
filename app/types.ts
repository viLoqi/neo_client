export interface CardSchema {
    question: string,
    answer: string,
    hint: string,
    order: number;
}

export interface DeckSchema {
    _id: string,
    cards: CardSchema[]
}


export interface PostDeckResponse {
    deck_id: string,
    deck_name: string
}
export interface RepositoryDecksSchema {
    created: Date,
    deck_id: string,
    deck_name: string,
    description: string,
    modified: Date,
    upvotes: number,
    downvotes: number
}
export interface RepositorySchema {
    _id: string
    decks: RepositoryDecksSchema[]
}