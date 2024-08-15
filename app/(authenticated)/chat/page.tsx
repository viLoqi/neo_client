"use client"

import { Alert, AlertIcon, Center } from "@chakra-ui/react";

const ChatPage = () => {

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