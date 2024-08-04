'use client';

import { useState } from 'react';
import { CiCircleChevLeft } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Link from 'next/link';
import './BrowseDeckPage.css';
import UsersPanel from '@/components/UsersPanel';
import GenerateDeckModal from "./components/GenerateDeckModal";
import Deck from './components/Deck';
import { CardSchema } from '@/app/_types/deck';
import useDecks from '@/hooks/useDecks';

function parseToCardSchema(generatedQuestions: string): CardSchema[] {
    const questionsObj = JSON.parse(generatedQuestions);
    return Object.keys(questionsObj).map((key, index) => {
        const { question, answer, choices, hint } = questionsObj[key];
        return { question, answer, choices, hint, order: index };
    });
}

export default function BrowseDeckPage() {

    const [refresh, setRefresh] = useState(false)

    // a repo is a container for decks
    const { decks, addDeckToPrivateRepo } = useDecks()

    const [numQuestions, setNumQuestions] = useState('5');

    const [questionType, setQuestionType] = useState('');

    const [isGenerateDeckModalOpen, setIsGenerateDeckModalOpen] = useState(false);


    const handleGenerateDeck = async (numQuestions: string, questionType: string) => {
        console.log(`Number of Questions: ${numQuestions}, Question Type: ${questionType}`);

        const payload = { numQuestions, questionType };
        console.log("type of: ", typeof payload);

        try {
            const response = await fetch('https://us-east1-loqi-loqi.cloudfunctions.net/ai', {
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

            console.log(questionType, cardSchemas)

            addDeckToPrivateRepo({ deckContent: { name: questionType, cards: cardSchemas } });

        } catch (error) {
            console.error('Error generating questions:', error);
        }

        setIsGenerateDeckModalOpen(false);
    };


    return (
        <div className="flex w-full h-screen p-6 overflow-hidden">
            <div className='flex flex-col items-center w-full h-full'>
                {/* course name */}
                <h1 className="flex w-full justify-center  font-semibold border-b-[1px] py-2 mb-1 border-black">
                    {/* {(class_id as string).replace("%20", " ")} */}
                    Search Your Decks
                </h1>
                {/* main body */}
                <div className='flex flex-col w-full h-full px-6 overflow-scroll no-scrollbar'>
                    <Link href="/app">
                        <CiCircleChevLeft size="50" />
                    </Link>
                    <div className='flex justify-between items-center py-2 my-2 h-[70px]'>
                        <div className="search-bar">
                            <FaMagnifyingGlass />
                            <input type='text' placeholder='Search decks' className=' ml-2 focus:outline-none w-full' />
                        </div>
                        {/* <button onClick={() => addNewDeck("RANDOM", Array(3).fill({ question: "What is 9+10?", answer: "ANSWER", hint: "a dead meme :(", order: 0, choices: ["WRONG1", "WRONG2", "WRONG3", "ANSWER"] }))} className="flex items-center justify-center w-[200px] h-full bg-[#237451] hover:bg-[#1f6848] rounded-xl">
                            <p className='text-white font-bold text-lg'>Add new deck</p>
                        </button> */}
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
                        {decks ? decks.map((deck, idx) => (
                            <Deck key={crypto.randomUUID()} deck={deck} idx={idx} />
                        )) : <></>}
                    </div>
                </div>
            </div>
            <UsersPanel />
        </div>
    );
};
