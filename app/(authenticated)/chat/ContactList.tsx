import { Heading, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import ContactCard from "./ContactCard";

export interface Contact {
    uid: string
    name: string
    photoURL: string,
}
const ContactList = ({ contacts, setSelectedContact, selectedContact }: { contacts: Contact[], selectedContact: Contact, setSelectedContact: Dispatch<SetStateAction<Contact>> }) => {
    if (contacts && selectedContact)
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
                            return <ContactCard key={contact.uid} userName={contact.name} userProfilePicture={contact.photoURL} selected={contact.uid == selectedContact.uid} onClick={() => { setSelectedContact(contact) }} />
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

    return <div>No Contacts, go make some friends :3</div>
}

export default ContactList;