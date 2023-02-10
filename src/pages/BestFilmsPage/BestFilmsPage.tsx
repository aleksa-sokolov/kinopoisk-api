import React, {FC} from 'react';
import Film from "../../components/Film/Film";
import {IFilm, IPropsFilms} from "@/types/IFilm";


const BestFilmsPage: FC<IPropsFilms> = (updateState) => {
    return (
        <div className="container">
            <div className="wrap__films">
                {updateState.films?.map((film: IFilm) => {
                    return <Film key={film.filmId} film={film}/>
                })}
            </div>
        </div>
    );
};

export default BestFilmsPage;
