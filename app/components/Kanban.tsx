import { Flex } from '@chakra-ui/layout';
import React from 'react';
import BoardSidebar from './BoardSidebar';
import Columns from './Columns';

const Kanban = () => {
  return (
    <Flex width="100%">
      <BoardSidebar />
      <Columns />
    </Flex>
  );
};

export default Kanban;
