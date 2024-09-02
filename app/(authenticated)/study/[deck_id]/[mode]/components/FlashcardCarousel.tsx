import { CardSchema } from '@/app/_types/deck'
import useDecks from '@/hooks/useDecks'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Flashcard from './Flashcard'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const FlashcardCarousel = () => {
    const [cards, setCards] = useState<CardSchema[]>([])

    const [activeCardIndex, setActiveCardIndex] = useState(0)

    const deckLength = cards.length


    const getPrevCard = () => {
        activeCardIndex == 0 ? setActiveCardIndex(deckLength - 1) : setActiveCardIndex(activeCardIndex - 1);
        console.log("getting prev card...");
    }

    const getNextCard = () => {
        setActiveCardIndex((activeCardIndex + 1) % deckLength);
        console.log("getting next card...");
    }

    const { deck_id = 0 } = useParams()

    const { decks } = useDecks()

    useEffect(() => {
        if (Array.isArray(decks) && decks.length) {
            setCards(decks[deck_id as number].cards)
            setActiveCardIndex(0)
        }
        else
            setCards([])
    }, [deck_id, decks])

    return (
        
        <div className='carousel carousel-center flex items-center mx-20 bg-neutral rounded-box space-x-4 w-3/5'>
            <button className={`${activeCardIndex == 0 ? "invisible w-[3rem]" : "btn"}`} onClick={getPrevCard}><FaChevronLeft /></button>
            {
                cards.map((card, index) => {
                    return (
                        <div key={index} className='carousel-item flex w-4/5 h-full items-center'>
                            <Flashcard card={card} />
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default FlashcardCarousel


// <div className="flex relative w-4/5 mx-20 items-center overflow-x-scroll">
//             <button className={`${activeCardIndex == 0 ? "invisible w-[3rem]" : "btn"}`} onClick={getPrevCard}><FaChevronLeft /></button>
//             <div className='flashcard-slider-container flex items-center w-full h-full '>
//                 <div className='flex overflow-x-scroll  transition ease-out w-full h-full duration-300'>
//                     {
//                         cards.map((card, index) => {
//                             return (
//                                 <Flashcard key={index} card={card} />
//                                 // <div key={index} className='absolute   bg-white hidden duration-700 ease-in-out'></div>
//                             )
//                         })
//                     }
//                 </div>
//             </div>
//             <div className="flex absolute bottom-[4%] left-1/2 -translate-x-1/2 h-10 w-16 bg-gray-700 py-8 px-10 justify-center items-center rounded-lg">
//                 <p className='px-2 py-1 rounded-full bg-white'>{activeCardIndex + 1}/{deckLength}</p>
//             </div>
//             <button className={`${activeCardIndex == deckLength - 1 ? "invisible w-[3rem]" : "btn"}`} onClick={getNextCard}><FaChevronRight /></button>
//         </div>