import {IFilm} from "@/types/IFilm";

export type IPeople  = {
    personId: number,
    nameRu: string,
    nameEn: string,
    posterUrl: string,
    growth: number,
    birthday: string,
    age: number,
    birthplace: string,
    spouses: ISpouses[],
    profession: string,
    facts: string[],
    films: IFilmActor[]
}

export interface ISpouses {
    personId: number,
    name: string,
    divorced: boolean,
    sex: string,
    relation: string
}

export interface IFilmActor {
    filmId: number,
    nameRu: string,
    rating: number,
    general: boolean,
    description: string,
    professionKey: string
}


export type IPeopleResponse = {
    people: IPeople
}
