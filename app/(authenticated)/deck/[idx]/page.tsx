"use client"

import { PrivateDeck } from "@/app/_types/repo";
import useDecks from "@/hooks/useDecks";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from "@chakra-ui/react";
import { CaretRight, Cpu } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DeckCard from "./DeckCard";

const DeckEditPage = () => {
    const { idx } = useParams<{ idx: string }>()
    const { decks } = useDecks()
    const [selectedDeck, setSelectedDeck] = useState<PrivateDeck>({ name: "", cards: [] })

    useEffect(() => {
        setSelectedDeck(decks[parseInt(idx)])
    }, [idx, decks])

    if (selectedDeck)
        return <div className="grid grid-rows-10 w-full h-screen p-4">
            <div className="row-span-1">
                <Breadcrumb spacing='8px' separator={<CaretRight />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/deck'>Flashcards</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href={`/deck/${idx}`}>{selectedDeck.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Heading size="xl" className="flex items-center gap-4 mt-4">
                    <Cpu size={32} /> {selectedDeck.name}
                </Heading>
            </div>
            <div className="row-span-9">
                {selectedDeck.cards.map((card => <DeckCard key={crypto.randomUUID()} card={card} />))}
            </div>
        </div>;
}

export default DeckEditPage;