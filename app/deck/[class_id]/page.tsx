'use client';

import { useEffect, useState } from 'react';
import './BrowseDeckPage.css';
import Link from 'next/link';
import { CiCircleChevLeft } from "react-icons/ci";
import UserCard from "../../components/UserCard";
import GenerateDeckModal from "../../components/GenerateDeckModal";
import { useParams } from 'next/navigation';
import { PostDeckResponse, CardSchema, DeckSchema, RepositorySchema, RepositoryDecksSchema } from '@/app/types';
import { FaMagnifyingGlass } from "react-icons/fa6";


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
            <ol>
                {cards.map(card => (
                    // <li key={card.id} className={card.completed ? 'completed' : 'not-completed'}>
                    //     {card.question}
                    // </li>
                    <li className="flex flex-col gap-5 text-green-600" key={crypto.randomUUID()}>
                        <div>Q: {card.question}</div>
                        <div>A: {card.answer}</div>
                    </li>
                ))}
            </ol>
            <Link className={"btn"} href={`/study/${deck_id}`}>STUDY THIS</Link>
        </div >
    );
};

const BrowseDeckPage = () => {
    const { class_id } = useParams()

    const [refresh, setRefresh] = useState(false)

    const [cid, setCid] = useState(decodeURI(class_id as string))

    const [decks, setDecks] = useState<RepositoryDecksSchema[]>([]);

    const [numQuestions, setNumQuestions] = useState('5');

    const [questionType, setQuestionType] = useState('');

    const [isGenerateDeckModalOpen, setIsGenerateDeckModalOpen] = useState(false);


    const handleGenerateDeck = (numQuestions: string, questionType: string) => {

        console.log(`Number of Questions: ${numQuestions}, Question Type: ${questionType}`);

        const payload = { "question": `Give me ${numQuestions} question and answer about ${questionType} in JSON array format` }
        fetch("https://nle646esfd.execute-api.us-east-1.amazonaws.com/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then(async (r) => {
            const d = await r.json()
            const reply = JSON.parse(d["Answer"])
            const deck = reply.map((r: any) => { return { question: r["Question"], answer: r["Answer"], hint: "", order: 0 } })
            addNewDeck(questionType, deck)
        }).catch(() => { addNewDeck(questionType, Array(1).fill({ question: "AWS Bedrock Timeout", answer: "AWS Bedrock Timeout", hint: "", order: 0 })) })

        setIsGenerateDeckModalOpen(false);

    }

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

    const addNewDeck = (topic: string, cards: CardSchema[]) => {
        fetch("/api/deck/deck", {
            method: "POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "cards": cards, "name": topic })
        }).then(async (r) => {
            let data: PostDeckResponse = await r.json();
            fetch("/api/repository/upload", {
                method: "POST", headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // topic refers to class now
                // NEED TO REWORK Existing API
                body: JSON.stringify({ topic: cid, "deck_name": data.deck_name, "deck_id": data.deck_id, "description": `blah blah blah created at: ${new Date().toDateString()}` })
            }).then(() => { setRefresh((prev) => !prev) })
        })
    }

    return (
        <div className="flex w-full h-screen bg-[#18593c]">
            <div className='flex flex-col items-center w-full'>
                {/* course name */}
                <h1 className="flex w-full justify-center text-white font-semibold border-b-[1px] py-2 mb-1 border-black">
                    {(class_id as string).replace("%20", " ")}
                </h1>
                {/* main body */}
                <div className='flex flex-col w-full px-6'>
                    <Link href="/">
                        <CiCircleChevLeft size="50" color="white" />
                    </Link>
                    <div className='flex justify-between items-center py-2 my-2 h-[70px]'>
                        <div className="search-bar">
                            <FaMagnifyingGlass />
                            <input type='text' placeholder='Search decks' className=' ml-2 focus:outline-none w-full' />
                        </div>
                        <button onClick={() => addNewDeck("RANDOM", Array(3).fill({ question: "What is 9+10?", answer: (Math.round(Math.random() * 21)).toString(), hint: "a dead meme :(", order: 0 }))} className="flex items-center justify-center w-[200px] h-full bg-[#237451] hover:bg-[#1f6848] rounded-xl">
                            <p className='text-white font-bold text-lg'>Add new deck</p>
                        </button>
                        <button onClick={() => {
                            setIsGenerateDeckModalOpen(true)
                        }} className="flex items-center justify-center w-[200px] h-full bg-[#237451] hover:bg-[#1f6848] rounded-xl">
                            <p className='text-white font-bold text-lg'>Generate Deck</p>
                        </button>
                        {isGenerateDeckModalOpen && (
                            <GenerateDeckModal
                                isOpen={isGenerateDeckModalOpen}
                                onClose={() => setIsGenerateDeckModalOpen(false)}
                                onGenerate={handleGenerateDeck}
                            />
                        )}

                    </div>
                    <div>
                        <div className="grid grid-cols-2 gap-4">
                            {decks ? decks.map(deck => (
                                <Deck key={deck.deck_id} {...deck} />
                            )) : <></>}
                        </div>
                    </div>
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
