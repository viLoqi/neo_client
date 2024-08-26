"use client";
import { useEffect, useState } from 'react';
import { auth } from '@/app/_modules/firebase';
import CoursesCard from '@/app/(authenticated)/app/components/CoursesCard';
import useUser from '@/hooks/useUser';
import { Avatar, Badge, Button, Divider, Heading } from '@chakra-ui/react';
import Logo from '@/components/Logo';
import { Chat, Club, House, PlusCircle, Question, Table } from "@phosphor-icons/react";
import { usePathname } from 'next/navigation'
import { Link } from '@chakra-ui/next-js'
import FcmTokenComp from './FirebaseForeground';

// TODO: pull live data
// const COURSES = [
//     { cid: 'CSE114', link: "http://localhost/forum/91340" },
//     { cid: 'CSE215', link: "http://localhost/forum/91340" },
// ];

export interface Course {
    cid: string
    link: string
}

const NavItems = [
    { dest: "/app", title: "Home", icon: <House weight='duotone' /> },
    { dest: "/forum", title: "Forum", icon: <Table weight='duotone' /> },
    // { dest: "/dashboard", title: "Dashboard", icon: <ChartLineUp /> },
    { dest: "/quiz", title: "Quizzes", icon: <Question weight='duotone' /> },
    {
        dest: "/chat", title: "Chat Rooms", icon: <Chat weight='duotone' />
    },
    // { dest: "/profile", title: "Add Courses", icon: <PlusCircle weight='duotone' /> }
]

const SideBar = () => {
    const [user, loading] = useUser()
    const pathname = usePathname()

    const [courses, setCourses] = useState<Course[]>([])
    const [reset, setReset] = useState(false)

    useEffect(() => {
        const local = localStorage.getItem("recent")
        if (local)
            setCourses(JSON.parse(local))

        if (pathname.includes("chat"))
            setReset((prev) => !prev)
    }, [pathname])

    if (user)
        return (
            <div className=" bg-light-bg-subtle carousel carousel-vertical flex-col w-[400px] p-4 overflow-y-scroll whitespace-nowrap">
                {/* Logo */}
                <span className='flex items-center gap-4'>
                    <Logo />
                    <Badge colorScheme='purple'>BETA</Badge>
                </span>

                {/* Nav Items */}
                {NavItems.map(item =>
                    <Link key={item.title} href={item.dest} className={`py-2 pr-2 ${pathname === item.dest ? "border-r-4 border-r-light-primary" : ""}`} >
                        <span className={`flex items-center gap-2 text-xl ${pathname === item.dest ? "text-light-primary-text" : ""}`}>
                            {item.icon} {item.title}  {item.title === "Quizzes" ? <Badge colorScheme='purple'>BETA</Badge> : <></>}
                        </span>
                    </Link>)
                }
                <Divider />
                <FcmTokenComp reset={reset} />

                {/* Your Courses */}
                {/* <Heading size='md' fontWeight={"normal"} py={4}>Your Courses</Heading>
                {COURSES.map((course) => {
                    return (
                        <div key={course.cid}>
                            <CoursesCard
                                course={course.cid}
                                onClick={() => setActiveCourse(course)}
                            />
                        </div>
                    );
                })} */}
                {/* Recent Courses */}
                <Heading size='md' fontWeight={"normal"} py={4}>Recent Forums</Heading>
                {
                    courses.toReversed().map((course) => {
                        return (
                            <div key={course.cid}>
                                <CoursesCard
                                    course={course.cid}
                                    link={course.link}
                                />
                            </div>
                        );
                    })
                }
                {/* Sign Out */}
                <div className='grid grid-flow-col p-4 items-center mt-auto display-hidden'>
                    <span className='flex gap-2 items-center'>
                        <Avatar name={user.displayName!} src={user.photoURL!} width={38} height={38} />
                        <span className='items-center'>{user.displayName}</span>
                    </span>
                    <Button size='sm' variant='outline' onClick={() => auth.signOut()}>
                        Sign Out
                    </Button>
                </div>
            </div >
        );
}

export default SideBar;