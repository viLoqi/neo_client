"use client"

import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, useToast, Select } from '@chakra-ui/react';

// Define a type for your component's props
type GenerateDeckModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: any
};

export default function GenerateDeckModal({ isOpen, onClose, onGenerate }: GenerateDeckModalProps) {
  const [numQuestions, setNumQuestions] = useState<string>('1');
  const [questionType, setQuestionType] = useState<string>('');
  const [diff, setDiff] = useState("EASY")
  const toast = useToast()

  const colorTable = {
    "EASY": "text-success",
    "MEDIUM": "text-warning",
    "HARD": "text-error"
  }

  const handleGenerateClick = () => {
    toast.promise(onGenerate(numQuestions, questionType, diff)
      , {
        success: { title: 'Deck Generated', description: 'Looks great' },
        error: { title: 'Deck Was Not Generated', description: 'Something wrong, please try again' },
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
        <ModalHeader>Generate a Quiz</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Number of Questions</FormLabel>
            <NumberInput defaultValue={numQuestions} max={5} onChange={(valueString) => setNumQuestions(valueString)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Question Type</FormLabel>
            <Input placeholder='What is on your mind?' onChange={(e) => setQuestionType(e.target.value)} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Difficulty</FormLabel>
            <Select value={diff} onChange={(e) => setDiff(e.target.value as "EASY" | "MEDIUM" | "HARD")} className={`${colorTable[diff as "EASY" | "MEDIUM" | "HARD"]}`}>
              <option className={`${colorTable["EASY"]}`} value='EASY'>Easy</option>
              <option className={`${colorTable["MEDIUM"]}`} value='MEDIUM'>Medium</option>
              <option className={`${colorTable["HARD"]}`} value='HARD'>Hard</option>
            </Select>
          </FormControl>


          <FormControl mt={4}  >
            <FormLabel>Notes (Coming Soon...)</FormLabel>
            <Select disabled value={"SELECT"}>
              <option value='SELECT'>Select notes to be used for question generation</option>
            </Select>
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