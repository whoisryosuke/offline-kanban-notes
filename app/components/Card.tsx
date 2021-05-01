import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { CardData } from '../models/cards';

interface Props {
  card: CardData;
}

const Card = ({ card }: Props) => {
  const bg = useColorModeValue('gray.300', 'gray.900');
  return (
    <Box width="100%" p={2} bg={bg} borderRadius={10}>
      <h3>{card.title}</h3>
    </Box>
  );
};

export default Card;
