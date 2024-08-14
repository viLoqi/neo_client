'use client'
import { onMessage, isSupported } from 'firebase/messaging';
import { messaging } from "@/app/_modules/firebase"
import { useEffect } from 'react';
import useFcmToken from '@/hooks/useFCMToken';

export default function FcmTokenComp() {
    const { fcmToken, notificationPermissionStatus } = useFcmToken();
    useEffect(() => {

        const f = async () => {
            const msg = await messaging()
            if (msg)
                if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                    if (notificationPermissionStatus === 'granted') {
                        const unsubscribe = onMessage(msg, (payload) => console.log('Foreground push notification received:', payload));
                        return () => {
                            unsubscribe(); // Unsubscribe from the onMessage event on cleanup
                        };
                    }
                }
        }

        f()
    }, [notificationPermissionStatus]);

    return null
}