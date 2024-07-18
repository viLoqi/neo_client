'use client'
import useUser from "@/hooks/useUser";
import { redirect } from 'next/navigation'
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [user, loading] = useUser()

    if (!user && !loading) {
        redirect("/login")
    }

    return children
};

export default Layout