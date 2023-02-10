import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: IFilterState = {
    typeFilm: "ALL",
    yearFilmFrom: 1990,
    yearFilmTo: 2023,
    minRatingFilm: 0,
    maxRatingFilm: 10
}

interface IFilterState {
    typeFilm: FilmTypes,
    yearFilmFrom: YearFilmTypes,
    yearFilmTo: YearFilmTypes,
    minRatingFilm: RatingFilmTypes,
    maxRatingFilm: RatingFilmTypes
}

export type FilmTypes = "ALL" | "FILM" | "TV_SHOW" | "TV_SERIES" | "MINI_SERIAL";
export type YearFilmTypes = 1990 | 1991 |1992 | 1993 | 1994 | 1995 | 1996 | 1997 | 1998 | 1999 | 2000 | 2001 | 2002 | 2003 | 2004 | 2005 | 2006 | 2007 |
                            2008 | 2009 | 2010 | 2011 | 2012 | 2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023;
export type RatingFilmTypes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;


export const filterSlice = createSlice({
    name: "filterFilms",
    initialState,
    reducers: {
        setTypeFilm: (state, action: PayloadAction<FilmTypes>) => {
            state.typeFilm = action.payload;
        },
        setYearFilmFrom: (state,action: PayloadAction<YearFilmTypes>) => {
            state.yearFilmFrom = action.payload;
        },
        setYearFilmTo: (state,action: PayloadAction<YearFilmTypes>) => {
            state.yearFilmTo = action.payload;
        },
        setMinRatingFilm: (state, action: PayloadAction<RatingFilmTypes>) => {
            state.minRatingFilm = action.payload;
        },
        setMaxRatingFilm: (state, action: PayloadAction<RatingFilmTypes>) => {
            state.maxRatingFilm = action.payload;
        }
    }
});


export const {setTypeFilm, setYearFilmFrom,setYearFilmTo,setMinRatingFilm,setMaxRatingFilm} = filterSlice.actions;
export default filterSlice.reducer;
