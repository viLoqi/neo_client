"use client";
import UsersPanel from "@/components/UsersPanel";
import useUser from '@/hooks/useUser';
import { Heading } from '@chakra-ui/react';
import SemesterCard from './components/SemesterCard';
import moment from 'moment';
import FcmTokenComp from "@/components/FirebaseForeground";

// TODO: replace with real data later
const COURSES = [
    { cid: 'CSE114', name: 'Introduction to Object Orientated Programming' },
    { cid: 'CSE215', name: 'Foundations of Computer Science' },
];

export default function App() {
    const [user, loading] = useUser()


    if (user) return (
        <div className="flex w-full h-screen ">
            {/* middle component */}
            <div className="flex flex-col w-full p-4">
                <div className="flex w-full border-b-[1px] py-2 mb-1 border-black">
                    <h1 className="font-semibold">
                        {moment().format('MMMM Do YYYY, h:mm:ss a')}
                    </h1>
                </div>
                <Heading size='md'>Classes</Heading>
                {/* Semester Cards */}
                <div className='grid gap-4'>
                    <SemesterCard />
                </div>

                <Heading size='md'>Recent Activities</Heading>
                {/* <FcmTokenComp /> */}
            </div>
            {/* Users panel */}
            <UsersPanel />
        </div>)
}