import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { useDispatch } from '../store/utilities';
import BoardSidebar from './BoardSidebar';
import CardEditDrawer from './CardEditDrawer';
import Columns from './Columns';
import { setCurrent } from '../models/cards';

const Kanban = () => {
  return (
    <Flex width="100%">
      <BoardSidebar />
      <Columns />
      <CardEditDrawer />
    </Flex>
  );
};

export default Kanban;
