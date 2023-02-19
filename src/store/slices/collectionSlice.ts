import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilm } from '@/types/IFilm';

const initialState: ICollectionInitialState = {
  favoriteCollection: [],
};

interface ICollectionInitialState {
  favoriteCollection: IFilm[];
}

export const collectionSlice = createSlice({
  name: 'collectionSlice',
  initialState,
  reducers: {
    AddCollectionFilm: (state, action: PayloadAction<IFilm>) => {
      state.favoriteCollection.push(action.payload);
    },
    removeCollectionFilm: (state, action: PayloadAction<number | any>) => {
      console.log(state.favoriteCollection);
      console.log(action.payload);
      state.favoriteCollection = state.favoriteCollection.filter((film) => film.filmId ? film.filmId : film.kinopoiskId !== action.payload);
    },
  },
});

export const { AddCollectionFilm, removeCollectionFilm } = collectionSlice.actions;
export default collectionSlice.reducer;
