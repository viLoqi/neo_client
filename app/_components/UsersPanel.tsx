import UserCard from './UserCard'

export default function UsersPanel() {
    const sampleCard = (<UserCard
        userName="user"
        userHandle="user123"
        userProfilePicture="/dummy-user-pic.jpg"
    />);

    return (
        <div className="bg-green-900 min-w-[14rem] p-4 m-2 border border-green-700 rounded-lg shadow-lg">
            {/* Creates 4 user cards */}
            {([...Array(4)].map(() => sampleCard))}
        </div>
    )
}