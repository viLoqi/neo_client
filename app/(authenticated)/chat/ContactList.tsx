import UserCard from "@/components/UserCard";
import { Heading, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

export interface Contact {
    uid: string
    name: string
    photoURL: string
}
const ContactList = ({ contacts }: { contacts: Contact[] }) => {
    return (<div >
        <Heading className="my-8 ml-4" size="lg">Messages</Heading>
        <Tabs isFitted position='relative' variant='unstyled'>
            <TabList>
                <Tab>All</Tab>
                <Tab>Groups</Tab>
                <Tab>Active</Tab>
            </TabList>
            <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
            <TabPanels>
                <TabPanel>
                    {contacts.map(contact => {
                        return <UserCard key={contact.name} userHandle={contact.name} userName={contact.name} userProfilePicture={contact.photoURL} />
                    })}
                </TabPanel>
                <TabPanel>
                    <p>Coming soon.</p>
                </TabPanel>
                <TabPanel>
                    <p>Coming soon.</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
    );
}

export default ContactList;