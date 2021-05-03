import { useColorModeValue } from '@chakra-ui/color-mode';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/editable';
import { Box, Stack, Text } from '@chakra-ui/layout';
import marked from 'marked';
import React, { useState } from 'react';
import { editCard, openEdit, CardData, setCurrent } from '../models/cards';
import { useDispatch } from '../store/utilities';

interface Props {
  id: string;
  card: CardData;
}

const Card = ({ id, card, ...restProps }: Props, ref) => {
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

  const handleCardDrawer = () => {
    dispatch(setCurrent(id));
    dispatch(openEdit());
  };
  return (
    <Box
      ref={ref}
      width="100%"
      py={2}
      px={3}
      bg={bg}
      borderRadius={10}
      mb={3}
      onClick={handleCardDrawer}
      {...restProps}
    >
      <Stack spacing={2}>
        <Text fontSize="md" fontWeight="bold">
          {card.title}
        </Text>
        {card?.content && (
          <Text
            fontSize="sm"
            dangerouslySetInnerHTML={{ __html: marked(card.content) }}
          />
        )}
      </Stack>
    </Box>
  );
};

export default React.forwardRef(Card);
