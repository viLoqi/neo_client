"use client";
import { useState } from "react";
import CoursesCard from "../CoursesCard";
import Link from "next/link";

import { User, Auth } from "firebase/auth";
import { Button } from "../Button";
import UserCard from "../UserCard";
import Input from "./Input";
import Messages from "./Messages";
interface Props {
    user: User,
    auth: Auth
}

// Replace with courses from database
const COURSES = [
    "CSE 114",
    "CSE 301",
    "CSE 320",
    "CSE 312",
    "CSE 310",
    "AMS 310",
    "AMS 301",
    "LIN 200",
    "ATS 201",
    "CSE 101",
    "CSE 214",
    "Hello",
];

const ChatBox = ({ user, auth }: Props) => {
    const [activeCourse, setActiveCourse] = useState(COURSES[0]);
    const [chatMessages, setChatMessages] = useState([""])

    return (
        <div className="flex w-full h-screen ">
            {/* Left side panel for courses */}
            <div className="carousel carousel-vertical flex-col bg-[#003825] w-[400px] pt-10 overflow-y-scroll whitespace-nowrap">
                {COURSES.map((course) => {
                    return (
                        <div key={course}>
                            <CoursesCard
                                course={course}
                                onClick={() => setActiveCourse(course)}
                            />
                        </div>
                    );
                })}
                <h1>Welcome {user.displayName}!</h1>
                <Button size='sm' variant='outline' onClick={() => auth.signOut()}>
                    Sign Out
                </Button>
            </div>
            {/* middle component */}
            <div className="flex flex-col w-full bg-[#18593c]">
                <div className="flex w-full justify-between border-b-[1px] py-2 mb-1 border-black">
                    <h1 className="ml-6 text-white font-semibold">
                        {activeCourse}
                    </h1>
                    <Link href={`/deck/${activeCourse}`}>
                        <button className="text-[#18593c] px-4 mr-6 bg-[#c9dbd4] hover:bg-[#a3b2ac] rounded-full font-bold">
                            Open deck
                        </button>
                    </Link>
                </div>
                {/* Messages */}
                <Messages course={activeCourse} />
                {/* Input bar */}
                <Input course={activeCourse} />
            </div>
            {/* Users panel */}
            <div className="bg-[#003825] min-w-56">
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
                <UserCard
                    userName="user"
                    userHandle="user123"
                    userProfilePicture="/dummy-user-pic.jpg"
                />
            </div>


        </div>
    );
};

export default ChatBox;
