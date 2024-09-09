'use client';

import { useMemo, useState } from 'react';
import GenerateDeckModal from "./GenerateDeckModal";
import Deck from './Deck';
import { CardSchema } from '@/app/_types/deck';
import useDecks from '@/hooks/useDecks';
import { MagicWand, MagnifyingGlass } from '@phosphor-icons/react';
import { Input, Progress } from '@chakra-ui/react';

function parseToCardSchema(generatedQuestions: string): CardSchema[] {
    const questionsObj = JSON.parse(generatedQuestions);
    return Object.keys(questionsObj).map((key, index) => {
        const { question, answer, choices, hint, difficulty } = questionsObj[key];
        return { question, answer, choices, hint, order: index, difficulty };
    });
}

export default function BrowseDeckPage() {
    const { decks, loading, addDeckToPrivateRepo, delDeckfromPrivateRepo } = useDecks()

    const [filter, setFilter] = useState("")

    const filteredDecks = useMemo(
        () => decks.filter(d => d.name.toLowerCase().includes(filter.toLowerCase())),
        [decks, filter]
    );

    const [isGenerateDeckModalOpen, setIsGenerateDeckModalOpen] = useState(false);

    const handleGenerateDeck = async (numQuestions: string, questionType: string, difficulty: "EASY" | "MEDIUM" | "HARD") => {
        console.log(`Number of Questions: ${numQuestions}, Question Type: ${questionType}, Difficulty: ${difficulty}`);

        const payload = { numQuestions, questionType, difficulty };
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

            return addDeckToPrivateRepo({ deckContent: { name: questionType, cards: cardSchemas } });

        } catch (error) {
            console.error('Error generating questions:', error);
            throw new Error()
        }

    };

    if (filteredDecks)
        return (
            <div className="flex w-full h-screen p-6 overflow-hidden">
                <div className='flex flex-col items-center w-full h-full'>
                    {/* course name */}
                    <h1 className="flex w-full justify-center font-semibold border-b border-black py-2 mb-1">
                        Search Your Quizzes
                    </h1>
                    {/* main body */}
                    <div className='flex flex-col w-full h-full px-4 md:px-6 overflow-scroll no-scrollbar'>
                        <div className='flex flex-col md:flex-row justify-between items-center py-2 my-4 h-auto md:h-14 rounded-lg bg-light-bg-subtle'>
                            <div className="flex items-center w-full md:w-auto p-2 md:p-4">
                                <MagnifyingGlass />
                                <Input placeholder='Search by Subject or Keyword' className='ml-2 focus:outline-none w-full bg-inherit' onChange={(e) => { setFilter(e.target.value) }} variant='unstyled' />
                            </div>
                            <button onClick={() => {
                                setIsGenerateDeckModalOpen(true)
                            }} className="flex items-center justify-center w-[200px] h-full bg-light-primary hover:bg-[#2860F3] rounded-xl">
                                <div className='flex items-center gap-2 text-white font-bold text-lg'> <MagicWand /> <span>Generate Quiz</span></div>
                            </button>
                            {isGenerateDeckModalOpen && (
                                <GenerateDeckModal
                                    isOpen={isGenerateDeckModalOpen}
                                    onClose={() => setIsGenerateDeckModalOpen(false)}
                                    onGenerate={handleGenerateDeck}
                                />
                            )}
                        </div>
                        {loading ? <Progress size='xs' isIndeterminate /> : <></>}

                        <div className="pb-8 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-scroll no-scrollbar">
                            {filteredDecks.map((deck, idx) => (
                                <Deck key={deck.name + idx} deck={deck} idx={idx} delDeckfromPrivateRepo={delDeckfromPrivateRepo} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
};
