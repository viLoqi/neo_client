import { useEffect, useMemo, useState } from "react";
import useUser from "./useUser";

const useAuthToken = () => {
    const [user] = useUser()
    const [token, setToken] = useState<string>()

    useEffect(() => {
        user?.getIdToken().then((tk) => setToken(tk))
    }, [user])

    return token;
}

export default useAuthToken;