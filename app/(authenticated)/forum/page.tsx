'use client';

import { useEffect, useMemo, useState } from 'react';
import { MagicWand, MagnifyingGlass } from '@phosphor-icons/react';
import { Input } from '@chakra-ui/react';
import ForumCard from './ForumCard';
import useForums from '@/hooks/useForums';
import SearchBar from '@/components/SearchBar';

export default function ForumPage() {
    const { forums } = useForums()

    if (forums)
        return (
            <div className="flex w-full h-screen p-6">
                <div className='flex flex-col items-center w-full h-full'>
                    {/* course name */}
                    <h1 className="flex w-full justify-center  font-semibold border-b-[1px] py-2 mb-1 border-black">
                        Find Your Classes
                    </h1>
                    {/* main body */}
                    <div className='flex flex-col w-full h-full px-6 overflow-scroll no-scrollbar'>
                        <SearchBar />
                        <div className="pb-[2rem] flex flex-col gap-4 overflow-scroll no-scrollbar">
                            {Object.keys(forums).map((key, idx) => {
                                const sections = Object.keys(forums[key as keyof typeof forums])
                                return <ForumCard key={crypto.randomUUID()} name={key} members={0} sections={sections} sectionData={forums[key as keyof typeof forums]} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
};
