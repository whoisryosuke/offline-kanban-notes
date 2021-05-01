import { Button } from '@chakra-ui/button';
import React from 'react';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import { getCurrentBoard } from '../models/boards';
import { getAllColumns } from '../models/columns';
import { useSelector } from '../store/utilities';
import AddColumnButton from './Columns/AddColumnButton';
import AddCardButton from './Columns/AddCardButton';
import ColumnContent from './ColumnContent';
import Column from './Column';

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
      <Stack
        direction="row"
        spacing={3}
        overflowX="auto"
        height="100%"
        flexWrap="nowrap"
        alignContent="stretch"
      >
        {columnIds.length > 0 &&
          columnIds.map((id) => (
            <Column key={id}>
              <Flex justifyContent="space-between" alignItems="center" mb={3}>
                <Box py={1} px={2} bg="blue.400" borderRadius={8}>
                  <Text fontSize="sm">{columns[id].name}</Text>
                </Box>
                <AddCardButton columnId={id} />
              </Flex>
              <ColumnContent id={id} />
            </Column>
          ))}
        <Column>
          <AddColumnButton boardId={currentBoardId} />
        </Column>
      </Stack>
    </Box>
  );
};

export default Columns;
