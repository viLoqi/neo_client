import { CardSchema } from "./deck"

export interface PublicRepositoryDecksSchema {
    created: Date,
    deck_id: string,
    deck_name: string,
    description: string,
    modified: Date,
    upvotes: number,
    downvotes: number
}

// This is returned by the GET call to repos
export interface GetPublicRepoResponse {
    _id: string
    decks: PublicRepositoryDecksSchema[]
}

export interface PrivateDeck {
    name: string
    cards: CardSchema[]
}

export interface GetPrivateRepoResponse {
    _id: string
    decks: PrivateDeck[]
}