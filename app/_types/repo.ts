export interface RepositoryDecksSchema {
    created: Date,
    deck_id: string,
    deck_name: string,
    description: string,
    modified: Date,
    upvotes: number,
    downvotes: number
}

// This is returned by the API call to repos
export interface RepositorySchema {
    _id: string
    decks: RepositoryDecksSchema[]
}