import React from 'react';
import { Button } from '@chakra-ui/button';
import { useDispatch, useSelector } from '../../store';
import { addColumn, getAllColumns } from '../../models/columns';
import generateId from '../../utils/generateId';
import { addCard, getAllCards } from '../../models/cards';

interface Props {
  columnId: string;
}

const AddCardButton = ({ columnId }: Props) => {
  const cards = useSelector(getAllCards);
  const columnCards = Object.keys(cards).filter(
    (cardId) => cards[cardId].column === columnId
  );
  const cardCount = columnCards.length;
  const dispatch = useDispatch();
  const handleAddColumn = () => {
    const id = generateId();
    dispatch(
      addCard({
        id,
        card: {
          title: 'Card Title',
          order: cardCount + 1,
          column: columnId,
        },
      })
    );
  };
  return <Button onClick={handleAddColumn}>Add Card</Button>;
};

export default AddCardButton;
