'use client';

import { useEffect, useState } from 'react';
import { CiCircleChevLeft } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Link from 'next/link';
import { useParams } from 'next/navigation';

import './BrowseDeckPage.css';
import UserCard from "../../../_components/UserCard";
import GenerateDeckModal from "./components/GenerateDeckModal";
import UsersPanel from '@/app/_components/UsersPanel';
import { PostDeckResponse, CardSchema, DeckSchema, RepositorySchema, RepositoryDecksSchema } from '@/app/_types/main';


function parseToCardSchema(generatedQuestions: string): CardSchema[] {
    const questionsObj = JSON.parse(generatedQuestions);
    return Object.keys(questionsObj).map((key, index) => {
        const { question, answer, choices, hint } = questionsObj[key];
        return { question, answer, choices, hint, order: index };
    });
}

const Deck = ({ deck_name, deck_id }: RepositoryDecksSchema) => {

    const [cards, setCards] = useState<CardSchema[]>([])

    const placeholderDifficulty = 'high'

    useEffect(() => {
        fetch(`/api/deck/${deck_id}`).then(async r => {
            const data = await r.json() as CardSchema
            if (Array.isArray(data) && data.length)
                setCards(data)
            else
                setCards([])
        })
    }, [deck_id])

    return (
        <div className="deck">
            <div className='flex items-center'>
                <p className={`inline-block mr-2 px-4 py-1 font-bold text-[17px] rounded-xl ${placeholderDifficulty == 'high' ? 'bg-[#f3a4a4] text-[#f62020]' : ''}`}>{placeholderDifficulty}</p>
                <h3 className='inline-block'>{deck_name}</h3>
            </div>
            <ul>
                {cards.map(card => (
                    <li className="ml-20 gap-5 text-gray-500 font-semibold" key={crypto.randomUUID()}>
                        <div>{card.question}</div>
                    </li>
                ))}
            </ul>
            <Link className={"btn"} href={`/study/${deck_id}/select`}>STUDY THIS</Link>
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


    const handleGenerateDeck = async (numQuestions: string, questionType: string) => {
        console.log(`Number of Questions: ${numQuestions}, Question Type: ${questionType}`);

        const payload = { numQuestions, questionType };
        console.log("type of: ", typeof payload);

        try {
            const response = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const generatedQuestions = await response.json();
            console.log("type of2: ", typeof generatedQuestions);

            console.log("generatedQuestions:", generatedQuestions);
            const cardSchemas = parseToCardSchema(generatedQuestions);

            console.log('Generated Questions:', generatedQuestions);
            if (cardSchemas.length > 0) {
                console.log('First Generated CardSchema:', cardSchemas[0]);
            }

            addNewDeck(questionType, cardSchemas);

        } catch (error) {
            console.error('Error generating questions:', error);
        }

        setIsGenerateDeckModalOpen(false);
    };


    useEffect(() => {
        fetch(`/api/repository/get/${cid}`).then(async r => {
            const data = await r.json() as RepositorySchema
            if (Array.isArray(data) && data.length) {
                console.table("REPO: ", data)
                setDecks(data[0].decks)
            }
            else
                setDecks([])
        })
    }, [refresh, cid])

    const addNewDeck = (topic: string, cards: CardSchema[]) => {
        // first upload to deck
        fetch("/api/deck/", {
            method: "POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "cards": cards, "name": topic, class: cid })
        }).then(async (r) => {
            // then upload to repository
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
            <div className='flex flex-col items-center w-full h-full'>
                {/* course name */}
                <h1 className="flex w-full justify-center text-white font-semibold border-b-[1px] py-2 mb-1 border-black">
                    {(class_id as string).replace("%20", " ")}
                </h1>
                {/* main body */}
                <div className='flex flex-col w-full h-full px-6 overflow-scroll no-scrollbar'>
                    <Link href="/">
                        <CiCircleChevLeft size="50" color="white" />
                    </Link>
                    <div className='flex justify-between items-center py-2 my-2 h-[70px]'>
                        <div className="search-bar">
                            <FaMagnifyingGlass />
                            <input type='text' placeholder='Search decks' className=' ml-2 focus:outline-none w-full' />
                        </div>
                        <button onClick={() => addNewDeck("RANDOM", Array(3).fill({ question: "What is 9+10?", answer: "ANSWER", hint: "a dead meme :(", order: 0, choices: ["WRONG1", "WRONG2", "WRONG3", "ANSWER"] }))} className="flex items-center justify-center w-[200px] h-full bg-[#237451] hover:bg-[#1f6848] rounded-xl">
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
                    <div className="pb-[2rem] grid grid-cols-2 gap-4 overflow-scroll no-scrollbar">
                        {decks ? decks.map(deck => (
                            <Deck key={deck.deck_id} {...deck} />
                        )) : <></>}
                    </div>
                </div>
            </div>

            <UsersPanel />
        </div>
    );
};

export default BrowseDeckPage;
