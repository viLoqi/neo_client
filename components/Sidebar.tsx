"use client";
import { useState } from 'react';
import { auth } from '@/app/_modules/firebase';
import CoursesCard from '@/app/(authenticated)/app/components/CoursesCard';
import useUser from '@/hooks/useUser';
import { Avatar, Link, Button, Divider, Heading } from '@chakra-ui/react';
import Logo from '@/components/Logo';
import { BookOpenText, ChartLineUp, Chat, Club, House } from "@phosphor-icons/react";

const COURSES = [
    { cid: 'CSE114', name: 'Introduction to Object Orientated Programming' },
    { cid: 'CSE215', name: 'Foundations of Computer Science' },
];

const NavItems = [
    { dest: "/app", title: "Home", icon: <House /> },
    { dest: "/forum", title: "Forum", icon: <BookOpenText /> },
    { dest: "/dashboard", title: "Dashboard", icon: <ChartLineUp /> },
    { dest: "/deck", title: "Flashcards", icon: <Club /> },
    { dest: "/chat", title: "Chat Rooms", icon: <Chat /> }
]

const SideBar = () => {
    const [user, loading] = useUser()
    const [activeCourse, setActiveCourse] = useState(COURSES[0]);

    if (user)
        return (
            <div className="carousel carousel-vertical flex-col w-[400px] p-4 overflow-y-scroll whitespace-nowrap">
                {/* Logo */}
                <Logo />
                {/* Nav Items */}
                {NavItems.map(item =>
                    <Link key={item.title} href={item.dest} className='py-2 pr-2' >
                        <span className='flex items-center gap-2 text-xl'>
                            {item.icon} {item.title}
                        </span>
                    </Link>)}
                <Divider />
                {/* Courses */}
                <Heading size='md' fontWeight={"normal"} py={4}>Courses</Heading>
                {COURSES.map((course) => {
                    return (
                        <div key={course.cid}>
                            <CoursesCard
                                course={course.cid}
                                onClick={() => setActiveCourse(course)}
                            />
                        </div>
                    );
                })}
                {/* Sign Out */}
                <div className='grid grid-flow-col p-4 items-center mt-auto'>
                    <span className='flex gap-2 items-center'>
                        <Avatar name={user.displayName!} src={user.photoURL!} width={38} height={38} />
                        <span className='items-center'>{user.displayName}</span>
                    </span>
                    <Button size='sm' variant='outline' onClick={() => auth.signOut()}>
                        Sign Out
                    </Button>
                </div>
            </div>
        );
}

export default SideBar;