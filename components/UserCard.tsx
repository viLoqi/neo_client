import { Avatar, AvatarBadge } from "@chakra-ui/react";

interface Props {
    userName: string;
    userHandle: string;
    userProfilePicture: string;
}

const UserCard = ({ userName, userHandle, userProfilePicture }: Props) => {
    return (
        <div className="flex items-center w-full h-14 rounded-lg gap-1 text-ellipsis overflow-hidden whitespace-nowrap ">
            <Avatar name={userName} src={userProfilePicture}>
                <AvatarBadge borderColor='papayawhip' bg='green.500' boxSize='1em' />
            </Avatar>

            <div className="flex flex-col">
                <p className="text-sm font-semibold">{userName}</p>
                <p className="text-sm font-semibold">@ {userHandle}</p>
            </div>
        </div>
    );
};

export default UserCard;
