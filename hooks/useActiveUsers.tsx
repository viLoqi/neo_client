import { useEffect, useState } from "react";
import useRTDB from "./useRTDB";
import { UserSchema } from "@/app/_types/main";



const useActiveUsers = () => {
    const [users, setUsers] = useState<UserSchema[]>([])
    const [snapshots, loading, error] = useRTDB({ dbCollectionPath: "/users" })

    useEffect(() => {
        const res = snapshots?.filter((v) => v.online) as UserSchema[]
        setUsers(res)
    }, [snapshots])

    console.log(users)
    return users;
}

export default useActiveUsers;