"use client";

import Question from "@/app/components/Question";
import { useParams } from "next/navigation";
import { CardSchema } from "@/app/types";
import { useEffect, useState } from "react";

// Carolsuole
const StudyPage = () => {
    const [cards, setCards] = useState<CardSchema[]>([])
    const [activeCard, setActiveCard] = useState<CardSchema>()
    const { deck_id } = useParams()

    useEffect(() => {
        fetch(`/api/deck/deck/${deck_id}`).then(async r => {
            const data = await r.json() as CardSchema
            if (Array.isArray(data) && data.length) {
                setCards(data)
                setActiveCard(data[0])
            }
            else
                setCards([])
        })
    }, [deck_id])

    return <Question card={activeCard!} cards={cards} setNextCard={setActiveCard} />;
}

export default StudyPage;