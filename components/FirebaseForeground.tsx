'use client'
import { onMessage } from 'firebase/messaging';
import { messaging } from "@/app/_modules/firebase"
import { useEffect } from 'react';
import useFcmToken from '@/hooks/useFCMToken';

export default function FcmTokenComp() {
    const { fcmToken, notificationPermissionStatus } = useFcmToken();
    // console.log(fcmToken)
    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            if (notificationPermissionStatus === 'granted') {
                const unsubscribe = onMessage(messaging, (payload) => console.log('Foreground push notification received:', payload));
                return () => {
                    unsubscribe(); // Unsubscribe from the onMessage event on cleanup
                };
            }
        }
    }, [notificationPermissionStatus]);

    return null
}