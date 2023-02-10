import {IPeoplesFilm} from "./IPeoplesFilm";
import {ISimilarFilms} from "./ISimilarFilms";

export interface IFilm {
    film: IFilm;
    kinopoiskId: number,
    imdbId: null | number,
    nameRu: string,
    description: string,
    director: string,
    nameEn: null | string,
    nameOriginal: string,
    countries: ICountries[],
    genres: IGenres[],
    ratingKinopoisk: number,
    rating: number,
    ratingImdb: number,
    year: number,
    type: string,
    posterUrl: string,
    posterUrlPreview: string,
    filmId: number,
    ratingAgeLimits: number,
    slogan: string
}

export type IGenres = {
    genre: string;
}

export type ICountries = {
    country: string
}

export type ISingleFilmResponse = {
    film: IFilm,
    peoplesRelatedToTheFilm: IPeoplesFilm[],
    filmSimilar: ISimilarFilms,
    idFilm: number
}

export type IPropsFilms = {
    films: IFilm[]
}

export type IHomePageFilms = {
    items: IFilm[]
}

export type PropsFilm = {
    film: IFilm,
    isCollectionFilm?: boolean
}
