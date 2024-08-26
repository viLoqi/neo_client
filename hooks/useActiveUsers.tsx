import { useEffect, useState } from "react";
import { UserProfileSchema } from "@/app/_types/main";
import { database } from "@/app/_modules/firebase";
import { query, ref, limitToFirst } from "firebase/database";
import { useListVals } from "react-firebase-hooks/database";



const useActiveUsers = () => {
    const [users, setUsers] = useState<UserProfileSchema[]>([])
    const [snapshots, loading, error] = useListVals<UserProfileSchema>(query(ref(database, "/users"), limitToFirst(100)));

    useEffect(() => {
        const res = snapshots?.filter((v) => v.online) as UserProfileSchema[]
        setUsers(res)
    }, [snapshots])

    return users;
}

export default useActiveUsers;