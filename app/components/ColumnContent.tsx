import React from 'react';
import { CardData, getAllCards, getColumnCards } from '../models/cards';
import { useSelector } from '../store';

interface Props {
  id: string;
}

const ColumnContent = ({ id }: Props) => {
  const columnCards = useSelector(getColumnCards(id));
  console.log('column cards', columnCards);
  return (
    <div>
      {columnCards.map(([_, card]) => (
        <p key={card.title}>{card.title}</p>
      ))}
    </div>
  );
};

export default ColumnContent;
