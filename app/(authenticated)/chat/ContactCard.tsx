import useUserOnlineStatus from "@/hooks/useUserOnlineStatus";
import { Avatar, AvatarBadge } from "@chakra-ui/react";

interface Props {
    userName: string;
    userProfilePicture: string;
    selected: boolean
    uid: string
    onClick: () => void
}

const ContactCard = ({ uid, userName, userProfilePicture, selected, onClick }: Props) => {
    const online = useUserOnlineStatus(uid);
    return (
        <div className={`flex items-center w-full h-full p-4 ${selected ? "border-r-2 border-light-primary bg-light-primary-bg" : ""}`} onClick={onClick}>
            <Avatar name={userName} src={userProfilePicture}>
                {online ? <AvatarBadge borderColor='papayawhip' bg='green.500' boxSize='1em' /> : <AvatarBadge borderColor='papayawhip' bg='gray.500' boxSize='1em' />}
            </Avatar>
            <div className="relative size-3 ml-[-12px] mb-[-30px] rounded-fullz-10">
            </div>
            <div className="flex flex-col ml-3">
                <p className="text-sm font-semibold">{userName}</p>
            </div>
        </div>
    );
};

export default ContactCard;
