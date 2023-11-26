"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { CardSchema, GetRepoResponse, PostDeckResponse } from '../types'


const Deck = ({ deck_id, modified }: GetRepoResponse) => {
    const router = useRouter()

    const handleOnView = () => {
        router.push(`/mock/deck/${deck_id}`)
    }
    return <div className='border border-white'>
        <p>{deck_id}</p>
        <p>{new Date(modified).toISOString()}</p>
        <button className='text-sky-400' onClick={handleOnView}>View</button>
    </div>
}

const InputField = ({ name }: { name: string }) => {
    return <div>
        <label htmlFor={name}>{name}</label>
        <input name={name}></input>
    </div>
}

export default function Home() {
    const [decks, setDecks] = useState<GetRepoResponse[]>([])
    const [refresh, setRefresh] = useState(false)

    const questionRef = useRef<HTMLInputElement>(null)
    const answerRef = useRef<HTMLInputElement>(null)
    const hintRef = useRef<HTMLInputElement>(null)
    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)
    const tagRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        fetch("/api/repository/").then(async r => {
            const data = await r.json()
            if (Array.isArray(data) && data.length)
                setDecks(data[0].decks)
            else
                setDecks([])
        })
    }, [refresh])

    const handleCreateDeck = () => {
        const cards: CardSchema[] = [{ question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }]
        // Jie: These fetch requests can lowkey be helper functions
        fetch("/api/deck/deck", {
            // First make the request to create the deck
            method: "POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "cards": cards, "name": "Random Deck Name lol" })
        }).then(async (r) => {
            // After the deck is created, it'll be added to the respective repository
            let data: PostDeckResponse = await r.json();
            fetch("/api/repository/upload", {
                method: "POST", headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "topic": "general", "deck_name": data.deck_name, "deck_id": data.deck_id, "description": `blah blah blah created at: ${new Date().toISOString()}` })
            }).then(() => { setRefresh(prev => !prev) })
            // ^ This here is a refresh flag for the UI to update
        })
    }

    // Note:
    // This is here during testing to easily wipe the DB
    // Alternatively, you can use mongosh to drop the db
    const handleWipeTopic = () => {
        fetch("/api/repository/delete/general", {
            method: "DELETE"
        }).then(() => {
            setRefresh(prev => !prev)
        })
    }

    if (decks)
        return (
            <main className="flex min-h-screen flex-col items-center p-24">
                <div>
                    <h1>All Decks Under the Tag: General</h1>
                    {decks.map((d) => <Deck key={d.deck_id} {...d} />)}
                </div>

                <div>
                    <button className="outline-lime-400" onClick={handleCreateDeck}>Create</button>
                    <br></br>
                    <button className="outline-lime-400" onClick={handleWipeTopic}>Wipe</button>
                </div>
            </main >
        )
    return null
}
