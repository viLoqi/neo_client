import { Alert, AlertIcon, Heading, Input, InputGroup, InputLeftElement, Progress, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useRef } from "react";
import ContactCard from "./ContactCard";
import { Contact } from "@/app/_types/main";
import { MagnifyingGlass } from "@phosphor-icons/react";
import useUser from "@/hooks/useUser";
import useAuthToken from "@/hooks/useAuthToken";
import { useMemo, useState } from "react";

const ContactList = ({ contacts, setSelectedContact, selectedContact }: { contacts: Contact[], selectedContact: Contact, setSelectedContact: Dispatch<SetStateAction<Contact>> }) => {
    //TODO: refactor this; gg too tired :(
    const isWhitespaceString = (str: String) => !str.replace(/\s/g, '').length
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [user] = useUser()
    const token = useAuthToken()
    const baseHeaders = useMemo(() => { return { "Content-Type": "application/json" } }, [])
    const inputRef = useRef<HTMLInputElement>(null)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        if (inputRef.current) {
            const message = inputRef.current.value
            if (!isWhitespaceString(message)) {
                //TODO: give user visual feedback that the contact they are trying to add is invalid
                setLoading(true)
                setError(false)
                fetch(`https://us-east1-loqi-loqi.cloudfunctions.net/chat?uid=${user?.email}&tuid=${message}`, { method: "POST", headers: { ...baseHeaders, "Authorization": `Bearer ${token}` } }).then((r) => {
                    r.json().then(() => {
                        if (inputRef.current)
                            inputRef.current.value = ""
                        setLoading(false)
                    }).catch(() => {
                        setLoading(false)
                        setError(true)
                    })
                })
            }
        }
    }


    if (contacts)
        return (<div>
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
                        <div className="flex flex-col items-center w-full p-4 ">
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <MagnifyingGlass weight="duotone" />
                                </InputLeftElement>
                                <Input placeholder='Search @stonybrook.edu email' onKeyDown={(e) => { handleKeyDown(e) }} border={0} ref={inputRef} />
                            </InputGroup>
                        </div>
                        {loading ? <Progress size='xs' isIndeterminate /> : <></>}
                        {error ? <Alert status='error'>
                            <AlertIcon />
                            {inputRef.current!.value} does not exist in our app
                        </Alert> : <></>}

                        <div className="my-4">
                            {selectedContact ?
                                contacts.map(contact => {
                                    return <ContactCard key={contact.uid} uid={contact.uid} userName={contact.name} userProfilePicture={contact.photoURL} selected={contact.uid == selectedContact.uid} onClick={() => { setSelectedContact(contact) }} />
                                })
                                : <Alert status='info'>
                                    <AlertIcon />
                                    Start a converstation by looking up their school email
                                </Alert>
                            }
                        </div>
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