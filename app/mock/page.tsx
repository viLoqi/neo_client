"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CardSchema, GetRepoResponse, PostDeckResponse } from './types'


const Deck = ({ deck_id, modified }: GetRepoResponse) => {

    return <div className='border border-white'>
        <p>{deck_id}</p>
        <p>{new Date(modified).toISOString()}</p>
    </div>
}

export default function Home() {
    const [decks, setDecks] = useState<GetRepoResponse[]>([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        fetch("/api/repository/get/general").then(async (r) => {
            const data = await r.json()
            if (data !== undefined && data.length != 0)
                setDecks(data[0].decks)
            else
                setDecks([])
        })
    }, [refresh])

    const handleCreateRandomDeck = () => {
        const cards: CardSchema[] = [{ question: "What is 9+10?", answer: "21", hint: "a dead meme :(", order: 0 }]

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
                    <button className="outline-lime-400" onClick={handleCreateRandomDeck}>Create Random</button>
                    <button className="outline-lime-400" onClick={handleWipeTopic}>Wipe All</button>
                </div>
            </main >
        )
    return null
}
