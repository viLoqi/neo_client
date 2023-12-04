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


    // TODO: maybe we can cache deck from the homepage so we don't need a network request to fetch basic deck info

    useEffect(() => {
        fetch(`/api/deck/deck/${params.deck_id}`).then(async r => {
            const data = await r.json()
            if (Array.isArray(data) && data.length)
                setFlashCards(data)
            else
                setFlashCards([])
        })
    }, [params.deck_id, refresh])

    return <div>
        <p>ID: {params.deck_id}</p>
        {flashCards.map(c => <FlashCard key={c.question} {...c} />)}

    </div>
}

export default DeckPage;