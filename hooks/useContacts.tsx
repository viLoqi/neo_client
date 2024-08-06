import useFirestore from "./useFirestore";
import { Contact } from "@/app/(authenticated)/chat/ContactList";

const useContacts = ({ uid }: { uid: string }): Contact[] => {
    const [contacts] = useFirestore({ collectionPath: `users/${uid}/contacts/` })
    console.log(contacts)
    if (contacts) {
        return contacts as Contact[]
    }

    return [];
}

export default useContacts;