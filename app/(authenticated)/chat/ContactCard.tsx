"use client";
import useUserOnlineStatus from "@/hooks/useUserOnlineStatus";
import { Link } from "@chakra-ui/next-js";
import { Avatar, AvatarBadge, Box, Flex, Text } from "@chakra-ui/react";
import { useToggle } from '../../contexts/ToggleContext';
interface Props {
  userName: string;
  userProfilePicture: string;
  selected: boolean;
  uid: string;
}

const ContactCard = ({ uid, userName, userProfilePicture, selected }: Props) => {
  const online = useUserOnlineStatus(uid);
  const { isContactListVisible, toggleContactList } = useToggle();
  const handleClick = () => {
    toggleContactList();
  };
  return (
    <Link href={`/chat/${uid}`} w="full" onClick={handleClick}>
      <Flex
        align="center"
        w="full"
        h="full"
        p={4}
        borderRight={selected ? "2px solid" : "none"}
        borderColor={selected ? "light-primary" : "transparent"}
        bg={selected ? "light-primary-bg" : "transparent"}
        _hover={{ bg: "gray.100" }} 
      >
        <Avatar name={userName} src={userProfilePicture} size="md">
          <AvatarBadge
            borderColor="papayawhip"
            bg={online ? "green.500" : "gray.500"}
            boxSize="1em"
          />
        </Avatar>
        <Flex direction="column" ml={3}>
          <Text fontSize="sm" fontWeight="semibold">
            {userName}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};

export default ContactCard;
