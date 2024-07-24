import { firestore } from '@/app/_modules/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy } from 'firebase/firestore'

interface UseFirestoreInput {
    collectionPath: string
}

// https://github.com/CSFrequency/react-firebase-hooks/blob/master/firestore/README.md
const useFirestore = ({ collectionPath }: UseFirestoreInput) => {
    return useCollectionData(query(collection(firestore, collectionPath), orderBy('firstCreated', 'asc')));
}

export default useFirestore;