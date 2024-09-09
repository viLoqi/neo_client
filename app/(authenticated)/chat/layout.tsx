"use client";
import useContacts from "@/hooks/useContacts";
import ContactList from "./ContactList";
import React, { useEffect, useState} from "react";
import { Contact } from "@/app/_types/main";
import { usePathname } from "next/navigation";
import { useToggle } from '../../contexts/ToggleContext';
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { contacts, loading } = useContacts();
  const { isContactListVisible, toggleContactList } = useToggle();
  const [selectedContact, setSelectedContact] = useState<Contact>({
    name: "",
    photoURL: "",
    uid: "test",
    email: "",
  });
  const path = usePathname();
  

  useEffect(() => {
    if (contacts.length > 0) {
      const uid = path.split("/")[2];
      if (uid) {
        const res = contacts.find((c) => c.uid === uid);
        if (res) setSelectedContact(res);
      } else {
        setSelectedContact({ name: "", photoURL: "", uid: "test", email: "" });
      }
    }

    if (path.split("/").length > 2) localStorage.setItem("lastChat", path);
    toggleContactList();
  }, [contacts, path]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-10 w-full h-screen">
      <div
        className={`col-span-10 md:col-span-2 bg-light-bg-subtle border-light-bg-active border-x-2 ${
          isContactListVisible ? 'block' : 'hidden'
        } md:block`}
      >
        <ContactList contacts={contacts} selectedContact={selectedContact} />
      </div>
      <div
        className={`col-span-10 md:col-span-8 ${
          isContactListVisible ? 'hidden' : 'block'
        } md:block`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
