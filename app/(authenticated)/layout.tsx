'use client'
import useUser from "@/hooks/useUser";
import { redirect } from 'next/navigation'
import React from "react";
import { database } from '@/app/_modules/firebase'
import { ref, onValue, onDisconnect, set } from "firebase/database";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [user, loading] = useUser()

    if (!user && !loading) {
        redirect("/login")
    }

    if (user) {
        const userRef = ref(database, `users/${user.uid}/`)
        const presenceRef = ref(database, `users/${user.uid}/online`);

        onValue(presenceRef, (snapshot) => {
            if (!snapshot.val()) {
                set(presenceRef, true)
            } else {
                set(userRef, { name: user.displayName, handle: user.displayName, online: true, photoURL: user.photoURL })
            }
            onDisconnect(presenceRef).set(false);
        });
    }

    return children
};

export default Layout