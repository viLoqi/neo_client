"use client"
import useContacts from "@/hooks/useContacts";
import ContactList from "./ContactList";
import { useEffect, useState } from "react";
import MessageBox from "./MessageBox"
import { Contact } from "@/app/_types/main";
import { Progress } from "@chakra-ui/react";

const ChatPage = () => {

    const { contacts, loading } = useContacts()

    const [selectedContact, setSelectedContact] = useState<Contact>({ name: "", photoURL: "", uid: "test", email: "" })

    useEffect(() => {
        setSelectedContact(contacts[0])
    }, [contacts])




    return <div className="grid grid-cols-10 w-full h-screen ">
        <div className="col-span-2 bg-light-bg-subtle border-light-bg-active border-x-2 ">
            <ContactList contacts={contacts} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
        </div>

        <div className="col-span-8 ">
            <MessageBox contact={selectedContact} />
        </div>
    </div >;
}

export default ChatPage;