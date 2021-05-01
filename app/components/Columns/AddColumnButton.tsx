import React from 'react';
import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from '../../store/utilities';
import { addColumn, getAllColumns } from '../../models/columns';
import generateId from '../../utils/generateId';

interface Props {
  boardId: string;
}

const AddColumnButton = ({ boardId }: Props) => {
  const columns = useSelector(getAllColumns);
  const columnCount = Object.keys(columns).length;
  const dispatch = useDispatch();
  const handleAddColumn = () => {
    const id = generateId();
    dispatch(
      addColumn({
        id,
        column: {
          name: 'In Progress',
          order: columnCount + 1,
          board: boardId,
        },
      })
    );
  };
  return (
    <Button
      width="100%"
      justifyContent="flex-start"
      variant="ghost"
      leftIcon={<AddIcon w={3} h={3} />}
      onClick={handleAddColumn}
    >
      Add Column
    </Button>
  );
};

export default AddColumnButton;
