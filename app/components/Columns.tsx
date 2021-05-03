import { Button } from '@chakra-ui/button';
import React from 'react';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/editable';
import { getCurrentBoard } from '../models/boards';
import {
  getAllColumns,
  getBoardColumns,
  editColumnName,
} from '../models/columns';
import { useDispatch, useSelector } from '../store/utilities';
import AddColumnButton from './Columns/AddColumnButton';
import AddCardButton from './Columns/AddCardButton';
import ColumnContent from './ColumnContent';
import Column from './Column';

const Columns = () => {
  const currentBoardId = useSelector(getCurrentBoard);
  const columns = useSelector(getBoardColumns(currentBoardId));
  const dispatch = useDispatch();

  const handleColumnChange = (id: string, newValue: string) => {
    dispatch(editColumnName({ id, newValue }));
  };

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
      <Stack
        direction="row"
        spacing={3}
        overflowX="auto"
        height="100%"
        flexWrap="nowrap"
        alignContent="stretch"
      >
        {columns.length > 0 &&
          columns.map(([id, column]) => (
            <Column key={id}>
              <Flex justifyContent="space-between" alignItems="center" mb={3}>
                <Box py={1} px={2} bg="blue.400" borderRadius={8}>
                  <Editable
                    fontSize="sm"
                    defaultValue={column.name}
                    onChange={(nextValue: string) =>
                      handleColumnChange(id, nextValue)
                    }
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Box>
                <AddCardButton columnId={id} />
              </Flex>
              <ColumnContent id={id} />
            </Column>
          ))}
        {columns.length <= 0 && (
          <Column>
            <Text fontSize="sm">
              No columns found, try adding one{' '}
              <span role="img" aria-label="point right">
                👉🏼
              </span>
            </Text>
          </Column>
        )}
        <Column>
          <AddColumnButton boardId={currentBoardId} />
        </Column>
      </Stack>
    </Box>
  );
};

export default Columns;
