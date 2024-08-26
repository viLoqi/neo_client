"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/_modules/firebase"

import { Navbar } from "@/components/Navbar";

const PricingPage = () => {
    const [user, loading] = useAuthState(auth);
    const [tier, setTier] = useState("Free");

    useEffect(() => {
        if (!loading)
            fetch(`/api/payment/user?email=${user?.email}`).then((res) => res.json())
                .then((userData) => setTier(userData.tier)).catch((e) => console.log("User not found!"));
    }, [loading, user?.email])


    // =========== STYLING ===========
    const flexChildStyle = "m-7 py-6 flex flex-col justify-evenly items-center gap-y-2";
    const shoppingCartSVG = <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" id="cart"><path d="M14 36c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zM2 4v4h4l7.19 15.17-2.7 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4H14.85c-.28 0-.5-.22-.5-.5 0-.09.02-.17.06-.24L16.2 26h14.9c1.5 0 2.81-.83 3.5-2.06l7.15-12.98c.16-.28.25-.61.25-.96a2 2 0 0 0-2-2H10.43l-1.9-4H2zm32 32c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>

    return (
        <div>
            <Navbar />
            <div className="text-center">
                <h1 className="text-3xl m-5">Loqi Subscription</h1>
                <p className="text-gray-500 m-4">Logged in as {user?.displayName}</p>
                <p className="text-[#FFD700] m-4 font-bold">Current Tier: {tier}</p>

                <div className="w-full flex justify-evenly">
                    <div className={"w-1/4 h-screen " + (tier === "Free" ? "bg-[#FFD700]/[.50]" : "")}>
                        <div className={flexChildStyle + " bg-red-300"}>
                            <p className="text-2xl">Free</p>
                            <p className="text-1xl">$0 / month</p>
                        </div>
                    </div>

                    <div className={"w-1/4 h-screen " + (tier === "Basic" ? "bg-[#FFD700]/[.50]" : "")}>
                        <Link className={flexChildStyle + " bg-lime-300 cursor-pointer"} href="/checkout/basic">
                            <p className="text-2xl">Basic</p>
                            <p className="text-1xl">$5 / month</p>
                            {shoppingCartSVG}
                        </Link>
                    </div>

                    <div className={"w-1/4 h-screen " + (tier === "Premium" ? "bg-[#FFD700]/[.50]" : "")}>
                        <Link className={flexChildStyle + " bg-green-500 cursor-pointer"} href="/checkout/premium">
                            <p className="text-2xl">Premium</p>
                            <p className="text-1xl">$10 / month</p>
                            {shoppingCartSVG}
                        </Link>
                    </div>
                </div>

            </div>
        </div>)


}

export default PricingPage;