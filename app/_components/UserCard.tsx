import Image from "next/image";

interface Props {
    userName: string;
    userHandle: string;
    userProfilePicture: string;
}

const UserCard = ({ userName, userHandle, userProfilePicture }: Props) => {
    return (
        <div className="flex items-center w-full h-14 bg-green-700 rounded-lg shadow-md border-t-2 border-b-2 border-green-800 pl-6">
            <div className="relative aspect-square h-12 border border-gray-300 bg-white shadow rounded-md p-2">
                <Image
                    src={userProfilePicture}
                    alt="user profile picture"
                    layout="fill"
                    className="rounded-full object-cover"
                />
            </div>
            <div className="relative size-3 ml-[-12px] mb-[-30px] rounded-full bg-green-500 z-10">

            </div>
            <div className="flex flex-col ml-3">
                <p className="text-sm font-semibold text-white">{userName}</p>
                <p className="text-sm text-green-300 font-light">@{userHandle}</p>
            </div>
        </div>
    );
};

export default UserCard;
