import { Timestamp } from "firebase/firestore";

export interface MessageSchema {
    author: string
    authorPhotoURL: string
    content: string
    firstCreated: Timestamp
    lastUpdated: Timestamp
}

export interface PostChatMessageRequest {
    content: string
    author: string
    authorPhotoURL: string
}

// This is the user stored in RTDB
export interface UserProfileSchema {
    name: string
    online: boolean
    handle: string
    photoURL: string
    // tier: "FREE" | "BASIC" | "PREMIUM"
    // courses: string[]
    // quota: number
}

export interface PomodoroConfigSchema {
    length: number,
    break: number,
    rounds: number,
}

export interface Contact {
    uid: string
    name: string
    photoURL: string
    email: string
}

export interface Answer {
    author: string
    role: string
    content: string
    authorPhotoURL: string
    timestamp: number
}

export interface Comment {
    author: string
    authorPhotoURL: string
    content: string
    timestamp: number
    replies: Comment[]
}

export interface ForumPostSchema {
    postId: string
    pinned: boolean
    question: string,
    description: string,
    studentAnswer: Answer | null
    instructorAnswer: Answer | null
    followups: string[]
    upvotes: number
    downvotes: number
    authorName: string
    authorPhotoURL: string
    firstCreated: Timestamp
    comments: Comment[]
}

export interface ForumPostRequest {
    postId: string
    pinned: boolean
    question: string,
    description: string,
    studentAnswer: Answer | null
    instructorAnswer: Answer | null
    followups: string[]
    upvotes: number
    downvotes: number
    authorName: string
    authorPhotoURL: string
    comments: Comment[]
}