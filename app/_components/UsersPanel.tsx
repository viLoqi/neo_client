import { useEffect, useState } from 'react'

import UserCard from './UserCard'

export default function UsersPanel() {
    const sampleCard = (<UserCard
        userName="user"
        userHandle="user123"
        userProfilePicture="/dummy-user-pic.jpg"
    />);

    return (
        <div className="bg-[#003825] min-w-56">
            {/* Creates 4 user cards */}
            {([...Array(4)].map(() => sampleCard))}
        </div>
    )
}