import { useListVals } from 'react-firebase-hooks/database';
import { database } from "@/app/_modules/firebase"
import { ref } from "firebase/database";
import { UserProfileSchema } from '@/app/_types/main'
import { limitToFirst, query } from 'firebase/database';

// https://github.com/CSFrequency/react-firebase-hooks/blob/master/database/README.md
const useRTDB = ({ dbCollectionPath }: { dbCollectionPath: string }) => {
    return useListVals<UserProfileSchema>(query(ref(database, dbCollectionPath), limitToFirst(50)));
}

export default useRTDB;