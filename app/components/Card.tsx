import { useColorModeValue } from '@chakra-ui/color-mode';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/editable';
import { Box, Text } from '@chakra-ui/layout';
import React from 'react';
import { editCard, CardData } from '../models/cards';
import { useDispatch } from '../store/utilities';

interface Props {
  id: string;
  card: CardData;
}

const Card = ({ id, card }: Props) => {
  const dispatch = useDispatch();
  const bg = useColorModeValue('gray.300', 'gray.900');

  const handleTitleChange = (nextValue: string) => {
    dispatch(
      editCard({
        id,
        card: {
          title: nextValue,
        },
      })
    );
  };
  return (
    <Box width="100%" py={2} px={3} bg={bg} borderRadius={10} mb={3}>
      <Editable
        fontSize="md"
        defaultValue={card.title}
        onChange={handleTitleChange}
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Text>{card.content}</Text>
    </Box>
  );
};

export default Card;
