import useFirestore from "./useFirestore";
import { Contact } from "@/app/_types/main";
import useUser from "./useUser";

const useContacts = (): { contacts: Contact[], loading: boolean } => {
    const [user] = useUser()
    const [contacts, loading] = useFirestore({ collectionPath: `users/${user?.email}/contacts/` })

    if (contacts) {
        return { contacts: contacts as Contact[], loading }
    }

    return { contacts: [], loading };
}

export default useContacts;