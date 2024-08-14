'use client'
import { useEffect, useState } from 'react';
import { getToken } from 'firebase/messaging';
import { messaging } from "@/app/_modules/firebase"

const useFcmToken = () => {
    const [token, setToken] = useState('');
    const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');

    useEffect(() => {
        const retrieveToken = async () => {
            try {
                const msg = await messaging()
                if (msg)
                    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                        // Request notification permission
                        const permission = await Notification.requestPermission();
                        setNotificationPermissionStatus(permission);

                        if (permission === 'granted') {
                            const currentToken = await getToken(msg, {
                                vapidKey: 'BInCgeXep5OWmV3PeQrttYKnw2qCLy1NnM9MVwqQbeNqPRMlVJNwMjA7vdIffABaZGoeOgy26sOB1s0I_8LK_EE', // Replace with your Firebase project's VAPID key
                            });
                            if (currentToken) {
                                setToken(currentToken);
                            } else {
                                console.log('No registration token available. Request permission to generate one.');
                            }
                        }
                    }
            } catch (error) {
                console.log('Error retrieving token:', error);
            }
        };

        retrieveToken();
    }, []);

    return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;