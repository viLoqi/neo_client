import { database } from "@/app/_modules/firebase";
import { UserProfileSchema } from "@/app/_types/main";
import { query, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { useObject } from "react-firebase-hooks/database";

const useUserOnlineStatus = (uid: string) => {
    const [online, setOnline] = useState(false)
    const [snapshots, loading, error] = useObject(query(ref(database, `/users/${uid}`)));

    useEffect(() => {
        const res = snapshots?.toJSON() as UserProfileSchema
        if (res !== undefined && res != null) {
            setOnline(res["online"])
        } else
            setOnline(false)
    }, [snapshots])

    return online;
}

export default useUserOnlineStatus;