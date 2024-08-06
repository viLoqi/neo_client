import { Avatar, AvatarBadge } from "@chakra-ui/react";

interface Props {
    userName: string;
    userHandle: string;
    userProfilePicture: string;
}

const UserCard = ({ userName, userHandle, userProfilePicture }: Props) => {
    return (
        <div className="flex items-center w-full h-14 rounded-lg">
            <Avatar name={userName} src={userProfilePicture}>
                <AvatarBadge borderColor='papayawhip' bg='green.500' boxSize='1em' />
            </Avatar>
            <div className="relative size-3 ml-[-12px] mb-[-30px] rounded-fullz-10">
            </div>
            <div className="flex flex-col ml-3">
                <p className="text-sm font-semibold">{userName}</p>
                <p className="text-sm  font-light">@{userHandle}</p>
            </div>
        </div>
    );
};

export default UserCard;
