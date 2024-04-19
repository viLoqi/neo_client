"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/_modules/firebase"

import { Navbar } from "@/app/_components/Navbar";

interface tierCard {
    tier: string;
    text: string;
    cost: number;
    requests: number;
    grad_bg_color: string; // gradiant color (starts at the top)
    accent_bg_color: string; // the bg-color of the top bar and (optionally) the get started button
    isMostPopular: boolean;
}

interface testimonialCard {
    image_url: string;
    text: string;
    text_bubble_color: string;
    isFacingRight?: boolean;
}

const PricingPage = () => {
    const [user, loading] = useAuthState(auth);
    const [userTier, setUserTier] = useState("");

    useEffect(() => {
        if (!loading)
            fetch(`/api/payment/user?email=${user?.email}`).then((res) => res.json())
                .then((userData) => setUserTier(userData.tier)).catch((e) => console.log("User not found!"));
    }, [loading, user?.email])


    const tierCard = ({ tier, text, cost, requests, grad_bg_color, accent_bg_color, isMostPopular }: tierCard) => {
        const isCurrentTier: boolean = tier === userTier;
        const displayTopBar: boolean = isCurrentTier || isMostPopular;

        return (
            <div className="text-left max-w-[17rem]">
                {/* (Optional) Most Popular / Your Current Tier */}
                <div className={`p-1 rounded-t-3xl border-app-black border-[1px] ${displayTopBar ? '' : 'opacity-0'} ${accent_bg_color}`}>
                    <h1 className="text-xl font-bold text-center">{isCurrentTier ? "YOUR CURRENT TIER" : "Most Popular"}</h1>
                </div>

                <div className={`py-6 px-8 ${displayTopBar ? "rounded-b-3xl" : "rounded-3xl"} flex flex-col gap-y-7 bg-gradient-to-b ${grad_bg_color} to-app-white`}>
                    <h1 className="block text-4xl font-bold">{tier}</h1>
                    <h2 className="">{text}</h2>

                    <div className="flex justify-between items-center font-bold">
                        <h1 className="text-4xl">${cost}</h1>
                        <p className="text-sm text-right">per month</p>
                    </div>

                    <div className="flex justify-between items-center font-bold">
                        <h1 className="text-4xl">{requests}</h1>
                        <p className="text-sm text-right">requests<br />per month</p>
                    </div>

                    <Link className={`py-1 px-5 place-self-center rounded-2xl border-app-black border-[1px] font-bold bg-app-white`} href={"#"}>Get Started</Link>
                </div>
            </div>
        );
    }

    const tiers: tierCard[] = [
        {
            tier: "Free",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            cost: 0,
            requests: 300,
            grad_bg_color: "from-purple-300",
            accent_bg_color: "bg-purple-400",
            isMostPopular: false,
        },
        {
            tier: "Basic",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            cost: 5,
            requests: 1000,
            grad_bg_color: "from-yellow-200",
            accent_bg_color: "bg-yellow-300",
            isMostPopular: true,
        },
        {
            tier: "Premium",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            cost: 10,
            requests: 5000,
            grad_bg_color: "from-green-300",
            accent_bg_color: "bg-green-400",
            isMostPopular: false,
        },
    ]

    const testimonialCard = ({ image_url, text, text_bubble_color, isFacingRight = true }: testimonialCard) => {
        return (
            <div className={`flex ${isFacingRight ? "flex-row-reverse" : "flex-row"} justify-start gap-6`}>
                {/* Profile Picture */}
                <div className="w-[8rem] h-[8rem] relative flex-none bg-red-300 rounded-full border-app-accent border-4">
                    <Image
                        src={image_url}
                        alt="User Testimonial Picture"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full absolute"
                    />
                </div>

                {/* Speech Bubble */}
                <div className={`h-[8rem] flex ${isFacingRight ? "flex-row-reverse justify-start" : "flex-row justify-end"} items-center`}>
                    <div className="w-3 overflow-hidden">
                        <div className={`h-4 ${text_bubble_color} rotate-45 transform ${isFacingRight ? "origin-top-left" : "origin-bottom-right"} rounded-sm`}></div>
                    </div>
                    <div className={`h-[8rem] max-h-[8rem] ${text_bubble_color} p-4 rounded-lg flex-1 ${isFacingRight ? "justify-end text-right" : "justify-start text-left"} flex items-center`}>{text}</div>
                </div>
            </div>
        );
    }

    const testimonials: testimonialCard[] = [
        {
            image_url: "/dummy-user-pic.jpg",
            text: "Crazy? I was crazy once! I was stuck in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once! I was stuck in a room. A rubber room. A rubber room filled with rats. And rats make me crazy.",
            text_bubble_color: "bg-green-400"
        },
        {
            image_url: "/google-logo.png",
            text: "Loqi is legit the greatest app to have existed of all time!",
            text_bubble_color: "bg-green-400"
        },
        {
            image_url: "/google-logo.png",
            text: "Loqi is legit the greatest app to have existed of all time!",
            text_bubble_color: "bg-green-400"
        },
        {
            image_url: "/dummy-user-pic.jpg",
            text: "Crazy? I was crazy once! I was stuck in a room. A rubber room. A rubber room filled with rats. And rats make me crazy. Crazy? I was crazy once! I was stuck in a room. A rubber room. A rubber room filled with rats. And rats make me crazy.",
            text_bubble_color: "bg-green-400"
        },
    ]


    return (
        <div className="min-h-screen pb-[4rem] bg-app-primary">
            <Navbar />
            <div className="text-center mt-8">
                <div className="flex flex-col place-items-center gap-7">
                    <h1 className="text-5xl font-bold text-app-white">Pricing Plans</h1>
                    <p className="text-xl font-bold text-app-white">Choose the plan that best suits your needs</p>

                    {/* Displays all current tiers */}
                    <div className="w-[80%] py-8 px-10 bg-app-gray rounded-[4rem] flex gap-10 justify-center">
                        {tiers.map(t => tierCard(t))}
                    </div>

                    <h1 className="mt-2 text-5xl font-bold text-app-white">Testimonials</h1>
                    <p className="text-xl font-bold text-app-white">Hear from users who have succeeded</p>

                    {/* Displays all testimonials */}
                    <div className="w-[80%] py-10 px-[5rem] bg-app-gray rounded-[4rem] flex flex-col gap-10 justify-center">
                        {testimonials.map((t, i) => [
                            testimonialCard({ ...t, isFacingRight: !!(i % 2) }),
                            i < testimonials.length - 1 && <div className="w-100 h-[0.125rem] bg-app-accent" /> // this i the divider
                        ])}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingPage;