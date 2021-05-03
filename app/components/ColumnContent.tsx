import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  CardData,
  getAllCards,
  getColumnCards,
  reorderCards,
} from '../models/cards';
import { useDispatch, useSelector } from '../store/utilities';
import Card from './Card';
import { DRAG_TYPES } from '../constants/drag';

interface Props {
  id: string;
}

const ColumnContent = ({ id }: Props) => {
  const columnCards = useSelector(getColumnCards(id));
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    dispatch(
      reorderCards({
        startIndex: result.source.index,
        endIndex: result.destination.index,
      })
    );
    console.log(
      'drag working, reorder',
      result.source.index,
      result.destination.index
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={DRAG_TYPES.COLUMN}>
        {(provided) => (
          <Flex
            flexDirection="column"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columnCards
              .sort(([_, a], [_id, b]) => a.order - b.order)
              .map(([cardId, card], index) => (
                <Draggable key={cardId} draggableId={cardId} index={index}>
                  {(cardProvided) => (
                    <Card
                      key={card.title}
                      id={cardId}
                      card={card}
                      ref={cardProvided.innerRef}
                      {...cardProvided.draggableProps}
                      {...cardProvided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ColumnContent;
