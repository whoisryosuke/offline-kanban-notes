import { Flex } from '@chakra-ui/layout';
import React from 'react';
import BoardSidebar from './BoardSidebar';
import CardEditDrawer from './CardEditDrawer';
import Columns from './Columns';

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
