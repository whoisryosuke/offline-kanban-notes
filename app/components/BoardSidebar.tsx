import { Button } from '@chakra-ui/button';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { useDisclosure } from '@chakra-ui/hooks';
import { AddIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import {
  addBoard,
  BoardData,
  getAllBoards,
  getCurrentBoard,
  setCurrent,
} from '../models/boards';
import { useDispatch, useSelector } from '../store/utilities';
import generateId from '../utils/generateId';
import AddBoardModal from './BoardSidebar/AddBoardModal';

const BoardSidebar = () => {
  const currentBoard = useSelector(getCurrentBoard);
  const boards = useSelector(getAllBoards);
  const boardIds = Object.keys(boards);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const createBoard = (boardName: string, color?: string) => {
    // Generate board ID
    const id = generateId();

    // Create board data
    const board: BoardData = {
      name: boardName,
      color,
    };
    // Add to store
    dispatch(addBoard({ id, board }));

    // If there's no boards, make it the current one
    if (currentBoard === '') dispatch(setCurrent(id));

    // Close the modal
    onClose();
  };

  const handleBoardSelection = (id: string) => {
    dispatch(setCurrent(id));
  };

  const colorModeIcon =
    colorMode === 'light' ? <SunIcon w={3} h={3} /> : <MoonIcon w={3} h={3} />;
  // Light / Dark
  const bg = useColorModeValue('gray.300', 'gray.900');
  const border = useColorModeValue('gray.500', 'gray.700');

  return (
    <Box
      width="250px"
      height="100vh"
      borderRight="1px solid"
      borderColor={border}
      position="fixed"
      p={3}
      bg={bg}
      zIndex={420}
    >
      <Stack spacing={1}>
        {boardIds.length > 0 &&
          boardIds.map((id) => (
            <Button
              key={id}
              width="100%"
              justifyContent="flex-start"
              variant="ghost"
              fontWeight={currentBoard === id ? 'bold' : 'normal'}
              onClick={() => handleBoardSelection(id)}
            >
              {boards[id].name}
            </Button>
          ))}
        {boardIds.length <= 0 && (
          <Text fontSize="sm">
            No boards found. <em>Add one below.</em>
          </Text>
        )}
        <Button
          onClick={onOpen}
          variant="ghost"
          width="100%"
          justifyContent="flex-start"
          leftIcon={<AddIcon w={3} h={3} />}
        >
          Add Board
        </Button>
      </Stack>
      <AddBoardModal isOpen={isOpen} onClose={createBoard} />

      <Button
        onClick={toggleColorMode}
        variant="ghost"
        width="90%"
        justifyContent="flex-start"
        leftIcon={colorModeIcon}
        position="absolute"
        bottom={3}
      >
        {colorMode === 'light' ? 'Light' : 'Dark'} Mode
      </Button>
    </Box>
  );
};

export default BoardSidebar;
