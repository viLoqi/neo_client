"use client"

import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, Textarea, useToast } from '@chakra-ui/react';
import useForumPosts from '@/hooks/useForumPosts';
import useUser from '@/hooks/useUser';

// Define a type for your component's props
type PostQuestionModalProps = {
    isOpen: boolean;
    forumId: string
    onClose: () => void;
};

export default function PostQuestionModal({ isOpen, onClose, forumId }: PostQuestionModalProps) {
    const [question, setQuestion] = useState<string>('1');
    const [description, setDescription] = useState<string>('');
    const { addForumPost } = useForumPosts(forumId)
    const [user] = useUser()
    const toast = useToast()

    const handleAsk = () => {

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
                "authorPhotoURL": user?.photoURL!
            }
        })
            , {
                success: { title: 'Question Posted', description: 'Looks great' },
                error: { title: 'Question Was Not Generated', description: 'Something wrong' },
                loading: { title: 'Posting Question...', description: 'Please wait' },
            })

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
                    <FormControl>
                        <FormLabel>Question</FormLabel>
                        <Input onChange={(e) => setQuestion(e.target.value)}>
                        </Input>
                    </FormControl>

                    <FormControl mt={4}>
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