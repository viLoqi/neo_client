// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { IconContext } from "@phosphor-icons/react";
import { useMemo } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    const d = useMemo(() => { return { "size": 20, "weight": "duotone" } }, [])
    return (<ChakraProvider>
        <IconContext.Provider value={d as any}>
            {children}
        </IconContext.Provider></ChakraProvider>)
}