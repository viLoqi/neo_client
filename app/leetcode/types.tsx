export interface Problem {
    id: number,
    name: string,
    url: string,
    difficulty: string,
    date_added: Date
    checked_by: CheckObj[]
}

export interface CheckObj {
    who: string
    when: Date
    email: string
}