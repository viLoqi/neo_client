import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { VideoCamera, Phone, DotsThreeOutlineVertical } from "@phosphor-icons/react";
import { Contact } from "@/app/_types/main";
import useUserOnlineStatus from "@/hooks/useUserOnlineStatus";

const MessageBoxHeader = ({ contact }: { contact: Contact }) => {
    const online = useUserOnlineStatus(contact.uid);
    return (
        <>
            <div className="flex items-center gap-4">
                <Avatar name={contact.name} src={contact.photoURL}>
                    {online ? <AvatarBadge borderColor='papayawhip' bg='green.500' boxSize='1em' /> : <AvatarBadge borderColor='papayawhip' bg='gray.500' boxSize='1em' />}
                </Avatar>
                <p className="text-md font-semibold">{contact.name}</p>
            </div>
            <div className="flex items-center gap-4">
                <VideoCamera size={32} />
                <Phone size={32} />
                <DotsThreeOutlineVertical size={32} />
            </div></>
    )
}

export default MessageBoxHeader;