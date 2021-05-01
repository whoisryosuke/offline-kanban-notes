import { Button } from '@chakra-ui/button';
import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { getCurrentBoard } from '../models/boards';
import { getAllColumns } from '../models/columns';
import { useSelector } from '../store';
import AddColumnButton from './Columns/AddColumnButton';
import AddCardButton from './Columns/AddCardButton';
import ColumnContent from './ColumnContent';

const Columns = () => {
  const currentBoardId = useSelector(getCurrentBoard);
  const columns = useSelector(getAllColumns);
  const columnIds = Object.keys(columns);

  // Generate a new column here
  // Create a Column component
  // Use Editable Chakra UI component for name - `startWithEditView` to true
  // Give column a placeholder name ("In Progress")
  // Add to store
  // If user confirms edit, save any changes to store

  return (
    <Box
      flex={1}
      height="100vh"
      padding={3}
      // Width of the sidebar + padding above
      paddingLeft="calc(250px + var(--chakra-space-3))"
      position="relative"
      zIndex={2}
    >
      Columns: <br />
      <Flex overflowX="auto" flexWrap="nowrap">
        {columnIds.length > 0 &&
          columnIds.map((id) => (
            <Box width="250px" key={id}>
              {columns[id].name}
              <ColumnContent id={id} />
              <AddCardButton columnId={id} />
            </Box>
          ))}
      </Flex>
      <AddColumnButton boardId={currentBoardId} />
    </Box>
  );
};

export default Columns;
