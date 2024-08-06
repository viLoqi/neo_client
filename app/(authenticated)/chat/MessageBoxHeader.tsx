import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { VideoCamera, Phone, DotsThreeOutlineVertical } from "@phosphor-icons/react";
import { Contact } from "./ContactList";

const MessageBoxHeader = ({ contact }: { contact: Contact }) => {
    return (
        <>
            <div className="flex items-center gap-4">
                <Avatar name={contact.name} src={contact.photoURL}>
                    <AvatarBadge borderColor='papayawhip' bg='green.500' boxSize='1em' />
                </Avatar>
                <p className="text-md font-semibold">{contact.name}</p>
            </div>
            <div className="flex items-center gap-4">
                <VideoCamera size={32} weight="duotone" />
                <Phone size={32} weight="duotone" />
                <DotsThreeOutlineVertical size={32} weight="duotone" />
            </div></>
    )
}

export default MessageBoxHeader;