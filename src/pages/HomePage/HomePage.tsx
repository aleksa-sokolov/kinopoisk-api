import React, {FC, useEffect, useState} from 'react';
import {AxiosResponse} from "axios";

import Film from "../../components/Film/Film";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {http} from "../../http";
import {IFilm, IHomePageFilms, IPropsFilms} from "@/types/IFilm";
import InfiniteScroll from "react-infinite-scroller";
import {Skeleton} from "@/components/ui/Skeletons/Skeletons";


const HomePage: FC<IPropsFilms> = ({films}) => {
    const [filmsState, setFilmsState] = useState<IFilm[]>(films);
    const {typeFilm, yearFilmFrom, yearFilmTo, minRatingFilm, maxRatingFilm} = useTypedSelector(state => state.filter);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false)

    // TODO все стейты надо типизировать!

    async function getFilms() {
        setLoading(true)
        const {data}: AxiosResponse<IHomePageFilms> = await http.get(`/films`, {
            params: {
                order: "RATING",
                type: typeFilm,
                ratingFrom: minRatingFilm,
                ratingTo: maxRatingFilm,
                yearFrom: yearFilmFrom,
                yearTo: yearFilmTo,
                page
            }
        });
        // У тебя было так: setFilmsState(data.items) - т.е ты брал новые фильмы и перезаписывал стейт, а надо было их добавлять к строму стейту
        // Условно ты делал так: films = newFilms, а надо так: films.concat(newFilms)
        setFilmsState([...filmsState, ...data.items]);
        setLoading(false)
    }

    function loadMore() {
        getFilms();
    }


    useEffect(() => {
        if (page !== 1) {
            getFilms();
        }
    }, [minRatingFilm, maxRatingFilm, typeFilm, yearFilmTo, yearFilmFrom]);

    return (
        <div className="container">
            <InfiniteScroll
                pageStart={0}
                hasMore={true}
                loadMore={loadMore}
                useWindow={true}
                threshold={300}
            >
                <div className="wrap__films">
                    {filmsState.map(film => (
                        <Film key={film.kinopoiskId} film={film}/>
                    ))}


                    {/*Loading (сделай ток по-нормальному) при подгрузке фильмов*/}
                    {loading ?
                        <>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                        </>
                        :
                        <></>
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default HomePage;
