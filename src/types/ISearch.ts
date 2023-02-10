export type ISearch = {
    keyword: string,
    films: ISearchFilm[]
}

export interface ISearchFilm {
    filmId: number,
    kinopoiskId: number,
    nameRu: string,
    posterUrl: string
}
