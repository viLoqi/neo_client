"use client"
import useContacts from "@/hooks/useContacts";
import ContactList from "./ContactList";
import { useEffect, useState } from "react";
import { Contact } from "@/app/_types/main";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { contacts, loading } = useContacts()

    const [selectedContact, setSelectedContact] = useState<Contact>({ name: "", photoURL: "", uid: "test", email: "" })

    const path = usePathname()

    useEffect(() => {
        if (contacts.length > 0) {
            console.log(contacts)
            const uid = path.split("/")[2]
            if (uid) {
                setSelectedContact(contacts.filter(c => c.uid === uid)[0])
            }
        }

    }, [contacts, path])


    if (loading) {
        return
    }

    return <div className="grid grid-cols-10 w-full h-screen ">
        <div className="col-span-2 bg-light-bg-subtle border-light-bg-active border-x-2 ">
            <ContactList contacts={contacts} selectedContact={selectedContact} />
        </div>
        <div className="col-span-8 ">
            {children}
        </div>
    </div>
};

export default Layout