// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { IconContext } from "@phosphor-icons/react";
import { useMemo } from 'react';
import { ToggleProvider } from './contexts/ToggleContext'

export function Providers({ children }: { children: React.ReactNode }) {
    const d = useMemo(() => ({ size: 20, weight: 'duotone' }), []);
    
    return (
        <ChakraProvider>
            <IconContext.Provider value={d as any}>
                <ToggleProvider> 
                    {children}
                </ToggleProvider>
            </IconContext.Provider>
        </ChakraProvider>
    );
}