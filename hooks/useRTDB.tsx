import { useListVals } from 'react-firebase-hooks/database';
import { database } from "@/app/_modules/firebase"
import { ref } from "firebase/database";
import { UserProfileSchema } from '@/app/_types/main';

// https://github.com/CSFrequency/react-firebase-hooks/blob/master/database/README.md
const useRTDB = ({ dbCollectionPath }: { dbCollectionPath: string }) => {
    return useListVals<UserProfileSchema>(ref(database, dbCollectionPath));
}

export default useRTDB;