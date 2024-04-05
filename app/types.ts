import { Timestamp } from "firebase/firestore";

export interface CardSchema {
    question: string,
    answer: string,
    choices: string[],
    hint: string,
    order: number;
}

// This is used by the actual deck instance
export interface DeckSchema {
    _id: string,
    name: string,
    class: string,
    cards: CardSchema[]
}


export interface PostDeckResponse {
    deck_id: string,
    deck_name: string
}

// This is apart of the repository information
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

export interface MessageSchema {
    author: string
    authorPhotoURL: string
    content: string
    firstCreated: Timestamp
    lastUpdated: Timestamp
}

export interface PomodoroConfigSchema {
    length: number,
    break: number,
    rounds: number,
}