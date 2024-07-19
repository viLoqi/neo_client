import UserCard from './UserCard'
import useActiveUsers from '@/hooks/useActiveUsers';


export default function UsersPanel() {

    const activeUsers = useActiveUsers()


    if (activeUsers)
        return (
            <div className="bg-green-900 min-w-[14rem] p-4 m-2 border border-green-700 rounded-lg shadow-lg">
                {/* Creates 4 user cards */}
                {activeUsers.map(user => <UserCard
                    key={user.photoURL}
                    userName={user.name}
                    userHandle={user.handle}
                    userProfilePicture={user.photoURL}
                />)}
            </div>
        )
}