import { Timestamp } from "firebase/firestore";

export interface MessageSchema {
    author: string
    authorPhotoURL: string
    content: string
    firstCreated: Timestamp
    lastUpdated: Timestamp
}

export interface UserSchema {
    name: string
    online: boolean
    handle: string
    photoURL: string
}

export interface PomodoroConfigSchema {
    length: number,
    break: number,
    rounds: number,
}