"use client"

import { Alert, AlertIcon, Center } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ChatPage = () => {

    const router = useRouter()

    useEffect(() => {
        const item = localStorage.getItem("lastChat")
        console.log(item)
        if (item) {
            router.push(item)
        }
    }, [])

    return <div className="flex justify-center items-center p-4 h-full">
        <Center>
            <Alert status='info' className="">
                <AlertIcon />
                Start a converstation by looking up their school email
            </Alert>
        </Center>
    </div >;
}

export default ChatPage;