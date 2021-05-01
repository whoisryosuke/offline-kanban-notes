import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Textarea,
  Stack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from '../store/utilities';
import {
  getCurrentCard,
  getCard,
  editCard,
  CardData,
  closeEdit,
  getEditMode,
} from '../models/cards';

// interface Props {
// }

const CardEditDrawer = () => {
  const [card, setCard] = useState<Partial<CardData>>({});
  const isOpen = useSelector(getEditMode);
  const currentCardId = useSelector(getCurrentCard);
  const currentCard = useSelector(getCard(currentCardId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentCardId && !card?.title) {
      setCard(currentCard);
    }
  }, [card, currentCard]);

  const handleInputSync = ({
    currentTarget: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };
  // Method for saving edits to current card
  const handleSaveCard = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(
      editCard({
        id: currentCardId,
        card,
      })
    );
  };

  const onClose = () => {
    dispatch(closeEdit());
  };

  console.log('is open?', isOpen);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{card.title}</DrawerHeader>

          <DrawerBody>
            <Stack spacing={2}>
              <Input
                placeholder="Card title"
                name="title"
                value={card?.title}
                onChange={handleInputSync}
              />
              <Textarea
                placeholder="Card content"
                height="50vh"
                name="content"
                value={card?.content}
                onChange={handleInputSync}
              />
              {/* TODO: Add select input for changing column */}
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" flex={1} onClick={handleSaveCard}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default CardEditDrawer;
