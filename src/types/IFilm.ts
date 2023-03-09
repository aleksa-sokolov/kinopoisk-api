import { IPeoplesFilm } from './IPeoplesFilm';
import { ISimilarFilms } from './ISimilarFilms';

export interface IFilm {
  film: IFilm;
  kinopoiskId?: number,
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
  filmId?: number,
  ratingAgeLimits: number,
  slogan: string
  films: any,
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
  films: IFilm[],
  totalPages: number,
  pagesCount?: number | any
  pageUrl?: string
}

export type IPropsBestFilms = {
  films: IFilm[],
  pageUrl?: string,
  pagesCount?: number
}

export type IHomePageFilms = {
  items: IFilm[],
  films?: IFilm[] | any,
  totalPages: number
}

export type PropsFilm = {
  film?: IFilm | any,
  films?: IFilm | any,
  isCollectionFilm?: boolean,
  key?: number | undefined
}
