import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store/utilities';

export type BoardData = {
  name: string;
  color?: string;
};

export type BoardList = { [key: string]: BoardData };

const boardsSlice = createSlice({
  name: 'boards',
  initialState: { current: '', list: {} as BoardList },
  reducers: {
    setCurrent: (state, action: { payload: string }) => {
      state.current = action.payload;
    },
    addBoard: (
      state,
      action: { payload: { id: string; board: BoardData } }
    ) => {
      state.list = {
        ...state.list,
        [action.payload.id]: action.payload.board,
      };
    },
    deleteBoard: (state, action: { payload: string }) => {
      const { [action.payload]: deleted, ...newState } = state.list;
      state.list = newState;
    },
  },
});

export const { setCurrent, addBoard, deleteBoard } = boardsSlice.actions;

export default boardsSlice.reducer;

export const getCurrentBoard = (state: RootState) => state.boards.current;
export const getAllBoards = (state: RootState) => state.boards.list;
export const getBoard = (board: string) => (state: RootState) =>
  state.boards.list[board];
