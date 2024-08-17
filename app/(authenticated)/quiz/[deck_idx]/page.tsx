"use client"

import { PrivateDeck } from "@/app/_types/repo";
import useDecks from "@/hooks/useDecks";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Progress, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { CaretRight, Cpu } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CardsTab from "./CardsTab";
import DetailsTab from "./DetailsTab";

const DeckEditPage = () => {
    const { deck_idx } = useParams<{ deck_idx: string }>()
    const { decks, loading } = useDecks()
    const [selectedDeck, setSelectedDeck] = useState<PrivateDeck>({ name: "", cards: [] })
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        setSelectedDeck(decks[parseInt(deck_idx)])
    }, [deck_idx, decks])


    if (selectedDeck)
        return <div className="grid grid-rows-10 w-full h-screen p-4">
            <div className="row-span-1">
                <Breadcrumb spacing='8px' separator={<CaretRight />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/quiz'>Decks</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href={`/quiz/${deck_idx}`} className="capitalize">{selectedDeck.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Heading size="lg" className="flex items-center gap-4 my-4 capitalize">
                    <Cpu size={32} /> {selectedDeck.name}
                </Heading>
            </div>
            <div className="row-span-9 overflow-y-auto" >
                <Tabs index={activeIndex} onChange={(index) => setActiveIndex(index)} >
                    <TabList className="">
                        <Tab>Cards</Tab>
                        <Tab>Details</Tab>
                    </TabList>

                    <TabPanels >
                        <TabPanel>
                            {loading ? <Progress size='xs' isIndeterminate /> : <></>}
                            <CardsTab selectedDeck={selectedDeck} deckIndex={parseInt(deck_idx)} />
                        </TabPanel>
                        {/* Lady Loading, so that this is only rendered when user clicks on tab */}
                        {activeIndex == 1 ? <TabPanel >
                            <DetailsTab deck_index={parseInt(deck_idx)} />
                        </TabPanel> : <></>}
                    </TabPanels>
                </Tabs>
            </div>
        </div>;
}

export default DeckEditPage;