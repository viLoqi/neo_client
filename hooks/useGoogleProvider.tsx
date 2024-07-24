import { GoogleAuthProvider } from 'firebase/auth';
import { useEffect, useState } from 'react';

const useGoogleProvider = () => {
    const [provider, setProvider] = useState<GoogleAuthProvider>()

    useEffect(() => {
        const googleProvider = new GoogleAuthProvider();

        googleProvider.setCustomParameters({
            hd: "stonybrook.edu"
        })

        setProvider(googleProvider)
    }, [])

    return provider!;
}

export default useGoogleProvider;