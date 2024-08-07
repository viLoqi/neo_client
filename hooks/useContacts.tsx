import useFirestore from "./useFirestore";
import { Contact } from "@/app/_types/main";
import useUser from "./useUser";

const useContacts = (): Contact[] => {
    const [user] = useUser()
    const [contacts] = useFirestore({ collectionPath: `users/${user?.email}/contacts/` })

    if (contacts) {
        return contacts as Contact[]
    }

    return [];
}

export default useContacts;