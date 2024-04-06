"use client"
import { ReactNode, createContext, useState } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
    children: ReactNode;
}

export const UserContext = createContext({ name: 'Guest' });

const Providers = (props: Props) => {
    const [user, setUser] = useState({ name: "Jie" })

    return (
        <UserContext.Provider value={user} >
            <SessionProvider>{props.children}</SessionProvider>
        </UserContext.Provider>
    )
}

export default Providers