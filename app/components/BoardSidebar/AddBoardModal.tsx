import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormLabel,
  FormControl,
  Flex,
} from '@chakra-ui/react';

interface Props {
  isOpen: any;
  onClose: any;
}

const AddBoardModal = ({ isOpen, onClose }: Props) => {
  const [boardName, setBoardName] = useState('');
  const handleChange = (event) => setBoardName(event.target.value);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new board</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Board Name</FormLabel>
            <Input
              value={boardName}
              onChange={handleChange}
              placeholder="Cool Project"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Flex width="100%">
            <Button flex={1} variant="ghost">
              Nevermind
            </Button>
            <Button
              colorScheme="green"
              flex={3}
              mr={3}
              onClick={() => onClose(boardName)}
            >
              Create
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBoardModal;
