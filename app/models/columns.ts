import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store/utilities';

export type ColumnData = {
  name: string;
  order: number;
  board: string;
  color?: string;
};

export type ColumnList = { [key: string]: ColumnData };

const columnsSlice = createSlice({
  name: 'columns',
  initialState: { current: '', list: {} as ColumnList },
  reducers: {
    setCurrent: (state, action: { payload: string }) => {
      state.current = action.payload;
    },
    addColumn: (
      state,
      action: { payload: { id: string; column: ColumnData } }
    ) => {
      state.list = {
        ...state.list,
        [action.payload.id]: action.payload.column,
      };
    },
    reorderColumn: (
      state,
      action: { payload: { id: string; order: number } }
    ) => {
      state.list = {
        ...state.list,
        [action.payload.id]: {
          ...state.list[action.payload.id],
          order: action.payload.order,
        },
      };
    },
    deleteColumn: (state, action: { payload: string }) => {
      const { [action.payload]: deleted, ...newState } = state.list;
      state.list = newState;
    },
    editColumnName: (
      state,
      action: {
        payload: {
          id: string;
          newValue: string;
        };
      }
    ) => {
      state.list[action.payload.id].name = action.payload.newValue;
    },
    editColumnColor: (
      state,
      action: {
        payload: {
          id: string;
          newValue: string;
        };
      }
    ) => {
      state.list[action.payload.id].color = action.payload.newValue;
    },
  },
});

export const {
  setCurrent,
  addColumn,
  reorderColumn,
  deleteColumn,
  editColumnName,
  editColumnColor,
} = columnsSlice.actions;

export default columnsSlice.reducer;

export const getCurrentColumn = (state: RootState) => state.columns.current;
export const getAllColumns = (state: RootState) => state.columns.list;
export const getBoardColumns = (id: string) => (state: RootState) =>
  Object.entries(state.columns.list).filter(
    ([key, column]) => column.board === id
  );
export const getColumn = (column: string) => (state: RootState) =>
  state.columns.list[column];
