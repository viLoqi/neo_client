import { useEffect, useState } from "react"
import Link from "next/link"

import { CardSchema, RepositoryDecksSchema } from "@/app/_types/main"


export default function Deck({ deck_name, deck_id }: RepositoryDecksSchema) {
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