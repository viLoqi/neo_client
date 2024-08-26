'use client'
import { onMessage, isSupported } from 'firebase/messaging';
import { messaging } from "@/app/_modules/firebase"
import { useEffect, useState } from 'react';
import useFcmToken from '@/hooks/useFCMToken';
import { Badge } from '@chakra-ui/react';

export default function FcmTokenComp({ reset }: { reset: boolean }) {
    const { fcmToken, notificationPermissionStatus } = useFcmToken();
    const [recentMessages, setRecentMessages] = useState<string[]>([])
    useEffect(() => {

        const f = async () => {
            const msg = await messaging()
            if (msg)
                if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                    if (notificationPermissionStatus === 'granted') {
                        const unsubscribe = onMessage(msg, (payload) => {
                            console.log('Foreground push notification received:', payload)
                            setRecentMessages((prev) => [...prev, payload.messageId])

                        });
                        return () => {
                            unsubscribe(); // Unsubscribe from the onMessage event on cleanup
                        };
                    }
                }
        }

        f()

    }, [notificationPermissionStatus]);

    useEffect(() => {
        setRecentMessages([])
    }, [reset])


    return <Badge colorScheme={recentMessages.length ? 'green' : ""}>{recentMessages.length} New Messages</Badge>
}