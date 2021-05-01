import React from 'react';
import { Button } from '@chakra-ui/button';
import { useDispatch, useSelector } from '../../store';
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
  return <Button onClick={handleAddColumn}>Add Column</Button>;
};

export default AddColumnButton;
