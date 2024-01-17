'use client';

import { useEffect, useState } from 'react';
import './BrowseDeckPage.css';
import Link from 'next/link';
import { CiCircleChevLeft } from "react-icons/ci";
import UserCard from "../../components/UserCard";
import { useParams } from 'next/navigation';
import { PostDeckResponse, CardSchema, DeckSchema, RepositorySchema, RepositoryDecksSchema } from '@/app/types';

const Deck = ({ deck_name, deck_id }: RepositoryDecksSchema) => {
    const [cards, setCards] = useState<CardSchema[]>([])

    useEffect(() => {
        fetch(`/api/deck/deck/${deck_id}`).then(async r => {
            const data = await r.json() as CardSchema
            if (Array.isArray(data) && data.length)
                setCards(data)
            else
                setCards([])
        })
    }, [deck_id])


    return (
        <div className="deck">
            <h3>{deck_name}</h3>
            <ul>
                {cards.map(card => (
                    <li key={card.id} className={card.completed ? 'completed' : 'not-completed'}>
                        {card.question}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const BrowseDeckPage = () => {
    const { class_id } = useParams()

    const [refresh, setRefresh] = useState(false)

    const [cid, setCid] = useState(decodeURI(class_id as string))

    const [decks, setDecks] = useState<RepositoryDecksSchema[]>([]);

    useEffect(() => {
        fetch(`/api/repository/get/${cid}`).then(async r => {
            const data = await r.json() as RepositorySchema
            if (Array.isArray(data) && data.length) {
                console.log(data)
                setDecks(data[0].decks)
            }
            else
                setDecks([])
        })
    }, [refresh])

    const addNewDeck = () => {
        const cards: CardSchema[] = [{ question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }, { question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }]
        fetch("/api/deck/deck", {
            method: "POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "cards": cards, "name": "Random Deck Name lol" })
        }).then(async (r) => {
            let data: PostDeckResponse = await r.json();
            fetch("/api/repository/upload", {
                method: "POST", headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic: cid, "deck_name": data.deck_name, "deck_id": data.deck_id, "description": `blah blah blah created at: ${new Date().toDateString()}` })
            }).then(() => { setRefresh((prev) => !prev) })
        })
    }

    return (
        <div className="flex w-full h-screen bg-green-900">
            <div className="back-link">
                <Link href="/">
                    <CiCircleChevLeft size="50" color="white" />
                </Link>
            </div>
            <div className="flex-grow p-4">
                <div className="add-deck-button-container">
                    <button onClick={addNewDeck}>Add new deck</button>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search decks"
                    />
                </div>
                <div className="deck-list">
                    {decks ? decks.map(deck => (
                        <Deck key={deck.deck_id} {...deck} />
                    )) : <></>}
                </div>
            </div>

            <div className="bg-[#003825] w-56 order-last"> {/* Use "order-first" to move it to the right */}
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
            </div>
        </div>
    );
};

export default BrowseDeckPage;
