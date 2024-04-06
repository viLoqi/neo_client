import React from 'react'

import UserCard from './UserCard'

const UsersPanel = () => {
    return (
        <div className="bg-[#003825] min-w-56">
            <UserCard
                userName="user"
                userHandle="user123"
                userProfilePicture="/dummy-user-pic.jpg"
            />
            <UserCard
                userName="user"
                userHandle="user123"
                userProfilePicture="/dummy-user-pic.jpg"
            />
            <UserCard
                userName="user"
                userHandle="user123"
                userProfilePicture="/dummy-user-pic.jpg"
            />
            <UserCard
                userName="user"
                userHandle="user123"
                userProfilePicture="/dummy-user-pic.jpg"
            />
            <UserCard
                userName="user"
                userHandle="user123"
                userProfilePicture="/dummy-user-pic.jpg"
            />
        </div>
    )
}

export default UsersPanel