import {GetServerSidePropsResult} from "next";
import {AxiosResponse} from "axios";
import HomePage from "../src/pages/HomePage/HomePage";
import {IHomePageFilms, IPropsFilms} from "@/types/IFilm";
import {http} from "../src/http";


export async function getServerSideProps(): Promise<GetServerSidePropsResult<IPropsFilms>> {
    try{
        const {data}: AxiosResponse<IHomePageFilms> = await http.get(`/films`, {
            params: {
                order: "RATING",
                type: "ALL",
                ratingFrom: 0,
                ratingTo: 10,
                yearFrom: 1990,
                yearTo: 2023,
                page: 1
            }
        });
        return {
            props: {
                films: data.items,
            }
        }
    }
    catch (e){
        return {
            props: {
                films: []
            }
        }
    }




}


export default function FilmPage(props: IPropsFilms) {
    return (
        <HomePage {...props}/>
    )
}
