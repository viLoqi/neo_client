import { Heading } from '@chakra-ui/react';
import UserCard from './UserCard'
import useActiveUsers from '@/hooks/useActiveUsers';


export default function UsersPanel() {
    const activeUsers = useActiveUsers()

    if (activeUsers)
        return (
            <div className="min-w-[14rem] max-w-[14rem]  px-6 py-4 bg-light-bg-subtle hidden md:block">
                <Heading size="sm" py={2}>Active Students</Heading>
                {activeUsers.map(user => <UserCard
                    key={user.photoURL}
                    userName={"longggggggggggggggggggggggggggggggggs"}
                    userHandle={user.handle}
                    userProfilePicture={user.photoURL}
                />)}
            </div>
        )
}