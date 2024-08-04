'use client'
import useUser from "@/hooks/useUser";
import { redirect } from 'next/navigation'
import React from "react";
import { database } from '@/app/_modules/firebase'
import { ref, onValue, onDisconnect, set } from "firebase/database";
import SideBar from '@/components/Sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [user, loading] = useUser()

    if (!user && !loading) {
        redirect("/login")
    }

    if (user) {
        const userRef = ref(database, `users/${user.uid}/`)
        const presenceRef = ref(database, `users/${user.uid}/online`);

        onValue(presenceRef, (snapshot) => {
            if (snapshot.val() != null) {
                set(presenceRef, true)
            } else {
                // Note: Arrays dont "exist" in RTDB, they need to be formatted like such: courses: { 0: "CSE320-01" }
                set(userRef, { name: user.displayName, handle: user.displayName, online: true, photoURL: user.photoURL, tier: "FREE", courses: {}, quota: 0 })
            }
            onDisconnect(presenceRef).set(false);
        });
    }

    return <div className="flex w-full h-screen">
        <SideBar />
        {children}
    </div>
};

export default Layout