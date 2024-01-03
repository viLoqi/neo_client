"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { CardSchema, RepositorySchema, PostDeckResponse, RepositoryDecksSchema } from '../types'


const Deck = ({ deck_id, modified, upvotes, downvotes, description }: RepositoryDecksSchema) => {
    const router = useRouter()

    const handleOnView = () => {
        router.push(`/mock/deck/${deck_id}`)
    }
    return <div className='border border-white'>
        <p className='text-2xl'>{deck_id}</p>
        <p>{new Date(modified).toISOString()}</p>
        <p className='p-4'>Description: {description}</p>
        <p>Upvotes: {upvotes}</p>
        <p>Downvotes: {downvotes}</p>
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
    const [repositories, setRepositories] = useState<RepositorySchema[]>([])
    const [topic, setTopic] = useState("math")
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
            console.log(data)
            if (Array.isArray(data) && data.length)
                setRepositories(data)
            else
                setRepositories([])
        })
    }, [refresh])

    const handleCreateDeck = () => {
        const cards: CardSchema[] = [{ question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }]
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
                body: JSON.stringify({ topic, "deck_name": data.deck_name, "deck_id": data.deck_id, "description": `blah blah blah created at: ${new Date().toDateString()}` })
            }).then(() => { setRefresh(prev => !prev) })
            // ^ This here is a refresh flag for the UI to update
        })
    }

    // Note:
    // This is here during testing to easily wipe the DB
    // Alternatively, you can use mongosh to drop the db
    const handleWipeTopic = () => {
        fetch(`/api/repository/delete/${topic}`, {
            method: "DELETE"
        }).then(() => {
            setRefresh(prev => !prev)
        })
    }

    if (repositories)
        return (
            <main className="flex min-h-screen flex-col items-center p-24">
                <div>
                    <h1>All Decks Divided By Topic: </h1>
                    {repositories.map(repo => {
                        return (<div key={repo._id}>
                            <h1 className='uppercase text-3xl text-green-200'>{repo._id}</h1>
                            {repo.decks.map(deck => <Deck key={deck.deck_id} {...deck}></Deck>)}
                        </div>

                        )
                    })}
                </div>

                <div className='bg-green-800'>
                    <select className='bg-green-800' name="subject" id="cars" onChange={e => { setTopic(e.target.value) }} value={topic}>
                        <option value="math">Math</option>
                        <option value="english">English</option>
                        <option value="cse">Computer Science</option>
                        <option value="geo">Geo</option>
                    </select>
                    <br></br>
                    <button className="outline-lime-400" onClick={handleCreateDeck}>Create a deck for selected topic</button>
                    <br></br>
                    <button className="outline-lime-400" onClick={handleWipeTopic}>Wipe all decks in selected topic</button>
                </div>
            </main >
        )
    return null
}
