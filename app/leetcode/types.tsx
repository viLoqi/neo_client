export interface Problem {
    id: number,
    name: string,
    url: string,
    difficulty: string,
    date_added: number
    checked_by: CheckObj[]
}

export interface CheckObj {
    who: string
    when: number
    email: string
}