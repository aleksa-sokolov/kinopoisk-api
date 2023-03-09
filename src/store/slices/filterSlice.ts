import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IFilterState = {
  typeFilm: 'ALL',
  yearFilmFrom: 1990,
  yearFilmTo: 2023,
  minRatingFilm: 0,
  maxRatingFilm: 9,
  pageBestFilm: 1,
  pagePopularFilm: 1,
  page: 1
};

interface IFilterState {
  typeFilm: FilmTypes,
  yearFilmFrom: number,
  yearFilmTo: number,
  minRatingFilm: RatingFilmTypes,
  maxRatingFilm: RatingFilmTypes,
  pageBestFilm: number,
  pagePopularFilm: number
  page: number
}

export type FilmTypes = 'ALL' | 'FILM' | 'TV_SHOW' | 'TV_SERIES' | 'MINI_SERIAL';
export type RatingFilmTypes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;


export const filterSlice = createSlice({
  name: 'filterFilms',
  initialState,
  reducers: {
    setTypeFilm: (state, action: PayloadAction<FilmTypes>) => {
      state.typeFilm = action.payload;
    },
    setYearFilmFrom: (state, action: PayloadAction<number>) => {
      state.yearFilmFrom = action.payload;
    },
    setYearFilmTo: (state, action: PayloadAction<number>) => {
      state.yearFilmTo = action.payload;
    },
    setMinRatingFilm: (state, action: PayloadAction<RatingFilmTypes>) => {
      state.minRatingFilm = action.payload;
    },
    setMaxRatingFilm: (state, action: PayloadAction<RatingFilmTypes>) => {
      state.maxRatingFilm = action.payload;
    },
    setPageBestFilm: (state, action: PayloadAction<number>) => {
      state.pageBestFilm = action.payload;
    },
    setPagePopularFilm: (state, action: PayloadAction<number>) => {
      state.pagePopularFilm = action.payload;
    },
    setPageFilm: (state, action: PayloadAction<number>) => {
      state.pagePopularFilm = action.payload;
    },
  },
});


export const {
  setTypeFilm,
  setYearFilmFrom,
  setYearFilmTo,
  setMinRatingFilm,
  setMaxRatingFilm,
  setPageFilm,
  setPageBestFilm,
  setPagePopularFilm,
} = filterSlice.actions;

export default filterSlice.reducer;
