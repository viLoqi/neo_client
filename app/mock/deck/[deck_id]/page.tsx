"use client"

import { CardSchema } from '@/app/types';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const FlashCard = ({ question, answer, hint, order }: CardSchema) => {
    return <div className='border border-white'>
        <dl>
            <dt>{question}</dt>
            <dd>{answer}</dd>
        </dl>
    </div>
}

const DeckPage = ({ params }: { params: { deck_id: string } }) => {
    const [flashCards, setFlashCards] = useState<CardSchema[]>([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        fetch(`/api/deck/deck/${params.deck_id}`).then(async r => {
            const data = await r.json()
            console.log(data)
            if (Array.isArray(data) && data.length)
                setFlashCards(data)
            else
                setFlashCards([])
        })
    }, [params.deck_id, refresh])

    return <div>ID: {params.deck_id}
        {flashCards.map(c => <FlashCard key={c.question} {...c} />)}

    </div>
}

export default DeckPage;