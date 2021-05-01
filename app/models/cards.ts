import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store/utilities';

export type CardData = {
  title: string;
  content?: string;
  /**
   * Order in the column
   */
  order: number;
  /**
   * The relational column ID
   */
  column: string;
  color?: string;
  trash: boolean;
};

export type CardList = { [key: string]: CardData };

const cardsSlice = createSlice({
  name: 'cards',
  initialState: { current: '', edit: false, list: {} as CardList },
  reducers: {
    openEdit: (state) => {
      state.edit = true;
    },
    closeEdit: (state) => {
      state.edit = false;
    },
    toggleEdit: (state) => {
      state.edit = !state.edit;
    },
    setCurrent: (state, action: { payload: string }) => {
      state.current = action.payload;
    },
    addCard: (state, action: { payload: { id: string; card: CardData } }) => {
      state.list = {
        ...state.list,
        [action.payload.id]: {
          ...action.payload.card,
          trash: false,
        },
      };
    },
    editCard: (
      state,
      action: { payload: { id: string; card: Partial<CardData> } }
    ) => {
      state.list[action.payload.id] = {
        ...state.list[action.payload.id],
        ...action.payload.card,
      };
    },
    reorderCard: (
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
    deleteCard: (state, action: { payload: string }) => {
      const { [action.payload]: deleted, ...newState } = state.list;
      state.list = newState;
    },
  },
});

export const {
  openEdit,
  closeEdit,
  toggleEdit,
  setCurrent,
  addCard,
  editCard,
  reorderCard,
  deleteCard,
} = cardsSlice.actions;

export default cardsSlice.reducer;

export const getCurrentCard = (state: RootState) => state.cards.current;
export const getAllCards = (state: RootState) => state.cards.list;
export const getColumnCards = (id: string) => (state: RootState) => {
  return Object.entries(state.cards.list).filter(
    ([_, card]) => card.column === id
  );
};
export const getCard = (card: string) => (state: RootState) =>
  state.cards.list[card];
export const getEditMode = (state: RootState) => state.cards.edit;
