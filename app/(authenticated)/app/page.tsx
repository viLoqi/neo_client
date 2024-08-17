"use client";
import UsersPanel from "@/components/UsersPanel";
import useUser from '@/hooks/useUser';
import { Heading } from '@chakra-ui/react';
import SemesterCard from './components/SemesterCard';
import moment from 'moment';
import { BookBookmark, BookOpenText, Books, Book} from "@phosphor-icons/react";

export default function App() {
    const [user, loading] = useUser();

    if (user) return (
        <div className="flex w-full h-screen overflow-hidden">
            {/* Middle component */}
            <div className="flex flex-col w-full p-4 overflow-auto">
                <div className="flex w-full border-b-[1px] py-2 mb-1 border-black">
                    <h1 className="font-semibold">
                        {moment().format('MMMM Do YYYY, h:mm:ss a')}
                    </h1>
                </div>
                <Heading size='md' mb={4}>Classes</Heading>

                {/* Semester Cards */}
                <div className="flex space-x-4 overflow-x-auto py-2 px-2 scrollbar-hide">
                <SemesterCard
                    title="Spring 2024"
                    students={42}
                    duration="30 min"
                    year="2024"
                    status="Pending"
                    icon={BookOpenText}
                />
                <SemesterCard
                    title="Fall 2023"
                    students={42}
                    duration="30 min"
                    year="2024"
                    status="Active"
                    icon={Books}
                />
                <SemesterCard
                    title="Spring 2023"
                    students={42}
                    duration="30 min"
                    year="2024"
                    status="Completed"
                    icon={BookBookmark}
                />
                <SemesterCard
                    title="Fall 2022"
                    students={42}
                    duration="30 min"
                    year="2024"
                    status="Completed"
                    icon={BookBookmark}
                />
                {/* <SemesterCard
                    title="Spring 2022"
                    students={42}
                    duration="30 min"
                    year="2024"
                    status="Completed"
                    icon={Book}
                />
                <SemesterCard
                    title="Fall 2021"
                    students={42}
                    duration="30 min"
                    year="2024"
                    status="Completed"
                    icon={BookBookmark}
                /> */}
                </div>

                <Heading size='md' mt={4}>Recent Activities</Heading>
            </div>

            {/* Users panel */}
            <UsersPanel />
        </div>
    );

    return <div>Loading...</div>;
}
