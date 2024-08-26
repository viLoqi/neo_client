import { database } from "@/app/_modules/firebase";
import { UserProfileSchema } from "@/app/_types/main";
import { query, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { useObject } from "react-firebase-hooks/database";

const useUserFCMToken = (uid: string) => {
    const [fcm, setFCM] = useState("")
    const [snapshots, loading, error] = useObject(query(ref(database, `/users/${uid}`)));

    useEffect(() => {
        const res = snapshots?.toJSON() as UserProfileSchema
        if (res !== undefined && res != null) {
            setFCM(res["fcm"])
        } else
            setFCM("")
    }, [snapshots])

    return fcm;
}

export default useUserFCMToken;