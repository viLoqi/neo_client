import useFirestore from "./useFirestore";
import { Contact } from "@/app/(authenticated)/chat/ContactList";

const useContacts = ({ uid }: { uid: string }): Contact[] => {
    const [contacts] = useFirestore({ collectionPath: `chats/${uid}/contacts/` })

    if (contacts) {
        return contacts as Contact[]
    }

    return [];
}

export default useContacts;