import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

type ReorderIndices = {
  startIndex: number;
  endIndex: number;
};

export const reorderCards = createAsyncThunk<CardList, ReorderIndices>(
  'cards/reorderCards',
  async ({ startIndex, endIndex }, thunkAPI) => {
    const state = thunkAPI.getState();
    const updatedCards: CardList = {};
    const cards = Object.entries(state.cards.list as CardList);
    const realStart = startIndex + 1;
    const realEnd = endIndex + 1;
    console.log('the state', state);
    console.log('start and stop', realStart, realEnd);

    // realStart - realEnd = direction (negative = subtract move up)
    const direction = Math.sign(realStart - realEnd);
    console.log('direction', direction);
    // Change order of each card
    cards.forEach(([cardId, card]) => {
      console.log('looping through cards', cardId, card);
      console.log('is after?', card.order <= realStart);
      console.log('is before?', card.order >= realEnd);
      // If it's negative, reverse order of search
      const isBetween =
        direction > 0
          ? card.order <= realStart && card.order >= realEnd
          : card.order >= realStart && card.order <= realEnd;

      console.log('is it direction?', direction < 0);
      console.log('is it between?', isBetween);
      // Go from start index to end index
      if (isBetween) {
        updatedCards[cardId] = {
          ...card,
        };
        // If it's the start index, make it the end index
        if (card.order === realStart) {
          console.log('first card', cardId, card);
          updatedCards[cardId].order = realEnd;
          return;
        }
        console.log('other cards');
        // If it's anything between, subtract or add to it's index
        updatedCards[cardId].order += direction;
      }
    });
    console.log('after reorder', updatedCards);

    return updatedCards;
  }
);

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
    // reorderCards: (
    //   state,
    //   action: {
    //     payload: {
    //       startIndex: number;
    //       endIndex: number;
    //     };
    //   }
    // ) => {
    //   // startIndex - endIndex = direction (negative = subtract move up)
    //   const direction = Math.sign(
    //     action.payload.startIndex - action.payload.endIndex
    //   );
    //   const cards = Object.entries(state.list);
    //   // Change order of each card
    //   cards.forEach(([cardId, card]) => {
    //     // Go from start index to end index
    //     if (
    //       card.order >= action.payload.startIndex &&
    //       card.order <= action.payload.endIndex
    //     ) {
    //       // If it's the start index, make it the end index
    //       if (card.order === action.payload.startIndex) {
    //         state.list[cardId].order = action.payload.endIndex;
    //       }
    //       // If it's anything between, subtract or add to it's index
    //       state.list[cardId].order += direction;
    //     }
    //   });
    // },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [reorderCards.fulfilled]: (state, action) => {
      // Add user to the state array
      state.list = {
        ...state.list,
        ...action.payload,
      };
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
export const getCurrentCardData = (state: RootState) =>
  state.cards.list[state.cards.current];
export const getEditMode = (state: RootState) => state.cards.edit;
