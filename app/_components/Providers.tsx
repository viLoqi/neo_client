"use client"
import { ReactNode, createContext, useState, useMemo } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
    children: ReactNode;
}

export const UserContext = createContext({ value: {}, setValue: (value: any) => { } })

const Providers = (props: Props) => {
    // const [user, setUser] = useState({ name: "Jie" })


    // const provided = useMemo(() => ({
    //     value: user,
    //     setValue: (value: any) => setUser(value)
    // }), [user]);

    return (
        // <UserContext.Provider value={provided} >
        <SessionProvider>{props.children}</SessionProvider>
        // </UserContext.Provider>
    )
}

export default Providers