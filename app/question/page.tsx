"use client";
import questions from "./questions";
import ChoiceButton from "../components/ChoiceButton";
import { CiCircleChevLeft } from "react-icons/ci";
import UserCard from "../components/UserCard";
import Link from "next/link";
import { CountdownCircleTimer, type ColorFormat } from "react-countdown-circle-timer";

const Question = () => {
    const question = questions[0];
    const duration = 70;

    return (
        <div className="flex w-full h-screen ">
            <div className="flex flex-col items-center w-full bg-[#18593c]">
                {/* Course title */}
                <h1 className="flex w-full justify-center text-white font-semibold border-b-[1px] py-2 mb-1 border-black">
                    {question.course}
                </h1>
                {/* main body */}
                <div className="flex w-full ml-12">
                    {/* Left side */}
                    <div className="flex flex-col mr-8">
                        {/* Back button */}
                        <Link href="/">
                            <CiCircleChevLeft size="50" color="white" />
                        </Link>
                        {/* Dummy timer, will update soon */}
                        <div className="flex mt-[30vh] items-center justify-center text-white text-xl font-semibold size-36 justify-self-center">
                            <CountdownCircleTimer
                                isPlaying
                                size={150}
                                duration={duration}
                                colors={["#ffffff", "#F7B801", "#A30000"]}
                                colorsTime={[duration, duration/2, 0]}
                            >
                                {({ remainingTime }) => {
                                    const minutes = Math.floor(remainingTime/60)
                                    const seconds = (remainingTime % 60).toString().padStart(2, '0')
                                    return `${minutes}:${seconds}`;
                                }}
                            </CountdownCircleTimer>
                        </div>
                    </div>

                    {/* Card */}
                    <div className="flex flex-col w-[1000px] py-8 my-8 items-center justify-evenly rounded-[50px] bg-white">
                        {/* Deck title */}
                        <h1 className="font-bold text-3xl">
                            {question.deckName}
                        </h1>
                        {/* Question */}
                        <div className="w-4/5 mt-5">
                            <p className="whitespace-pre font-bold text-sm">
                                {question.question}
                            </p>
                        </div>
                        {/* Answer choices */}
                        <div className="grid grid-cols-2 gap-3 w-4/5">
                            {question.choices.map((choice, index) => {
                                return (
                                    <ChoiceButton
                                        key={choice}
                                        text={choice}
                                        isCorrect={
                                            question.correctChoiceIndex ===
                                            index
                                        }
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {/* Users panel */}
            <div className="bg-[#003825] w-56">
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

export default Question;
