'use client'
import useUser from "@/hooks/useUser";
import { redirect } from 'next/navigation'
import { database } from '@/app/_modules/firebase'
import { ref, onValue, onDisconnect, set } from "firebase/database";
import SideBar from '@/components/Sidebar'
import FcmTokenComp from "@/components/FirebaseForeground";
import useFcmToken from "@/hooks/useFCMToken";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [user, loading] = useUser()
    const { fcmToken } = useFcmToken()

    if (!user && !loading) {
        redirect("/login")
    }

    if (user) {
        const userRef = ref(database, `users/${user.uid}/`)
        const presenceRef = ref(database, `users/${user.uid}/online`);
        const fcmRef = ref(database, `users/${user.uid}/fcm`);

        onValue(presenceRef, (snapshot) => {
            if (snapshot.val() != null) {
                set(presenceRef, true)
                set(fcmRef, fcmToken)
            } else {
                // Note: Arrays dont "exist" in RTDB, they need to be formatted like such: courses: { 0: "CSE320-01" }
                set(userRef, { name: user.displayName, handle: user.displayName, online: true, photoURL: user.photoURL, fcm: fcmToken })
            }
            onDisconnect(presenceRef).set(false);
        });
    }

    return <div className="flex w-full h-screen">
        <FcmTokenComp />
        <SideBar />
        {children}
    </div>
};

export default Layout