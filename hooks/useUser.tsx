import { auth } from '@/app/_modules/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// https://github.com/CSFrequency/react-firebase-hooks/blob/master/auth/README.md
const useUser = () => {
    return useAuthState(auth)
}

export default useUser