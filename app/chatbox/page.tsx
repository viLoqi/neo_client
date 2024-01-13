"use client";
import { useState } from "react";
import CoursesCard from "../components/CoursesCard";
import UserCard from "../components/UserCard";
import Link from "next/link";
import Input from "../components/Chatbox/Input";
import Messages from "../components/Chatbox/Messages";

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

const ChatBox = () => {
    const [activeCourse, setActiveCourse] = useState(COURSES[0]);

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
            </div>
            {/* middle component */}
            <div className="flex flex-col w-full bg-[#18593c]">
                <div className="flex w-full justify-between border-b-[1px] py-2 mb-1 border-black">
                    <h1 className="ml-6 text-white font-semibold">
                        {activeCourse}
                    </h1>
                    <Link href="/deck">
                        <button className="text-[#18593c] px-4 mr-6 bg-[#c9dbd4] hover:bg-[#a3b2ac] rounded-full font-bold">
                            Open deck
                        </button>
                    </Link>
                </div>
                {/* Messages */}
                <Messages/>
                {/* Input bar */}
                <Input/>
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
