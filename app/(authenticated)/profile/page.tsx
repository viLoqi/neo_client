"use client";
import { Avatar, Button, Flex, Box } from '@chakra-ui/react';
import useUser from "@/hooks/useUser";
import { auth } from '@/app/_modules/firebase';

const ProfilePage = () => {
  const [user] = useUser();

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      width="100vw"
      bg="gray.50"
      p={4}
    >
    <span className='items-center py-2'>{user?.displayName}</span>
      <Avatar
        name={user?.displayName!}
        src={user?.photoURL!}
        size="xl"
        mb={4}
      />
      
      <Button size='sm' variant='outline' px={12} onClick={() => auth.signOut()}>
        Sign Out
    </Button>
    </Flex>
  );
}

export default ProfilePage;
