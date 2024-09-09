import { PrivateDeck } from "@/app/_types/repo"
import { Card, Text, Heading, CardBody, Button, Center, Menu, IconButton, MenuButton, MenuList, MenuItem, CardFooter, useToast, LinkOverlay, Flex, Portal } from "@chakra-ui/react";
import { Cpu, DotsThreeOutlineVertical, SealQuestion, Timer } from "@phosphor-icons/react";
import { Link } from "@chakra-ui/next-js";

interface Input {
  deck: PrivateDeck
  idx: number
  delDeckfromPrivateRepo: any
}

export default function Deck({ deck, idx, delDeckfromPrivateRepo }: Input) {
  const toast = useToast();

  return (
    <Card overflow="" variant="outline" className="m-2">
      <CardBody className="bg-light-bg-subtle p-4">
        <LinkOverlay href={`/study/${idx}/free`}>
          {/* This empty block helps maintain the overlay effect */}
        </LinkOverlay>
        <Flex justify="space-between" align="center">
          {/* Deck Name and Icon */}
          <Flex align="center" gap={2}>
            <Cpu size={24} />
            <Heading size={{ base: "sm", md: "md" }} className="capitalize">
              {deck.name}
            </Heading>
          </Flex>

          {/* Menu Button */}
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<DotsThreeOutlineVertical size={24} />}
              variant="ghost"
              onClick={(e) => e.stopPropagation()} // Stop propagation to avoid issues
            />
            <Portal>
              {/* Use Portal to render the MenuList outside the parent div */}
              <MenuList zIndex={10} className="z-50">
                <MenuItem as={Link} href={`/quiz/${idx}`}>
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    toast.promise(delDeckfromPrivateRepo(idx), {
                      success: { title: "Deck Deleted", description: "Looks great" },
                      error: { title: "Deck Was Not Deleted", description: "Something went wrong" },
                      loading: { title: "Deleting Deck...", description: "Please wait" },
                    });
                  }}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
      </CardBody>

      {/* Footer Section with Questions Count */}
      <CardFooter className="bg-light-bg-subtle p-4">
        <Flex justify="space-between" align="center" width="100%">
          <Text py="2" display="flex" alignItems="center" gap={1} fontSize={{ base: "sm", md: "md" }}>
            <SealQuestion /> <span>{deck.cards.length} Questions</span>
          </Text>
        </Flex>
      </CardFooter>
    </Card>
  );
}