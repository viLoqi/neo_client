import { firestore } from "@/app/_modules/firebase";
import { collection, doc, query } from "firebase/firestore";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

const useForumProperties = (forumId: string) => {
    return useDocumentDataOnce(doc(firestore, `forums/${forumId}`));
}

export default useForumProperties;