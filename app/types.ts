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

export interface GetRepoResponse {
    created: Date,
    deck_id: string,
    deck_name: string,
    description: string,
    modified: Date,
    upvotes: number,
    downvotes: number
}