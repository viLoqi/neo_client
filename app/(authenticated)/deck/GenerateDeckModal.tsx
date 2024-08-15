"use client"

import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, useToast } from '@chakra-ui/react';

// Define a type for your component's props
type GenerateDeckModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: any
};

export default function GenerateDeckModal({ isOpen, onClose, onGenerate }: GenerateDeckModalProps) {
  const [numQuestions, setNumQuestions] = useState<string>('1');
  const [questionType, setQuestionType] = useState<string>('');
  const toast = useToast()

  const handleGenerateClick = () => {
    toast.promise(onGenerate(numQuestions, questionType)
      , {
        success: { title: 'Deck Generated', description: 'Looks great' },
        error: { title: 'Deck Was Not Generated', description: 'Something wrong' },
        loading: { title: 'Generating Deck...', description: 'Please wait' },
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
        <ModalHeader>Generate a Deck</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Number of Questions</FormLabel>
            <NumberInput defaultValue={1} min={1} max={10} onChange={(valueString) => setNumQuestions(valueString)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Question Type</FormLabel>
            <Input placeholder='What is on your mind?' onChange={(e) => setQuestionType(e.target.value)} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={() => handleGenerateClick()}>
            Generate
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};