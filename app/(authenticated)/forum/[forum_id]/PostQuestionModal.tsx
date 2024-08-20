"use client"

import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, Textarea, useToast } from '@chakra-ui/react';
import useForumPosts from '@/hooks/useForumPosts';
import useUser from '@/hooks/useUser';
import useNotifyEmail from '@/hooks/useNotifyEmail';
import { usePathname } from 'next/navigation';
import useForumProperties from '@/hooks/useForumProperties';

// Define a type for your component's props
type PostQuestionModalProps = {
    isOpen: boolean;
    forumId: string
    onClose: () => void;
};

export default function PostQuestionModal({ isOpen, onClose, forumId }: PostQuestionModalProps) {
    const [question, setQuestion] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const { addForumPost } = useForumPosts(forumId)
    const [user] = useUser()
    const toast = useToast()


    const path = usePathname()
    const forumProperties = useForumProperties(path.split("/")[2])

    const { notify } = useNotifyEmail()

    const handleAsk = () => {

        if (question && description)
            toast.promise(addForumPost({
                body: {
                    "description": description,
                    "pinned": false,
                    "question": question,
                    "studentAnswer": null,
                    "instructorAnswer": null,
                    "comments": [],
                    "followups": [],
                    "upvotes": 0,
                    "downvotes": 0,
                    "authorName": user?.displayName!,
                    "authorEmail": user?.email!,
                    "authorPhotoURL": user?.photoURL!
                }
            }).then(r => r.text().then((post_id) => {
                const instructors = forumProperties[0]?.instructors
                if (instructors)
                    instructors.forEach((email: string) => {
                        notify({
                            "to": email,
                            "type": "NEW QUESTION ADDED",
                            "cls": path.split("/")[2],
                            "question": question,
                            "description": description,
                            "post_link": `${location.href}/posts/${post_id}`
                        })
                    });

            }))
                , {
                    success: { title: 'Question Posted', description: 'Looks great' },
                    error: { title: 'Question Was Not Posted', description: 'Something wrong' },
                    loading: { title: 'Posting Question...', description: 'Please wait' },
                })
        else {
            toast({
                title: 'Question Was Not Posted',
                description: "Please input the question and description",
                status: 'error',
                duration: 2000,
            })
        }



        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Post a New Question</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl isRequired>
                        <FormLabel>Question</FormLabel>
                        <Input onChange={(e) => setQuestion(e.target.value)}>
                        </Input>
                    </FormControl>

                    <FormControl mt={4} isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleAsk()}>
                        Ask
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
};