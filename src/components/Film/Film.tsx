import React, {FC} from 'react';
import Link from "next/link";
import {PropsFilm} from "@/types/IFilm";
import {FiX} from "react-icons/fi";
import {useActions} from "@/hooks/useAction";
import styles from "./film.module.scss";



const Film: FC<PropsFilm> = ({film, isCollectionFilm}) => {
    const {removeCollectionFilm} = useActions();
    const rating = film.rating ? +film.rating : +film.ratingKinopoisk;
    const style = {
        backgroundColor: rating > 10 ? "inherit" : rating >= 7 ? "#3bb33b" : rating >= 6 ? "#ecc723" : rating <= 5 ? "red" : "inherit",
    }
    const removeFilm = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        removeCollectionFilm(film.filmId);
    }


    return (
        <Link href={`film/${film.filmId ? film.filmId : film.kinopoiskId}`} className={styles.card}>
            <img className={styles.card__img} src={film.posterUrl} alt=""/>
            <span
                style={style} className={styles.card__rating}
            >
                {isCollectionFilm ?
                    <FiX onClick={removeFilm}/>
                    : <>
                        {film.ratingKinopoisk ? film.ratingKinopoisk : film.rating}
                    </>
                }
            </span>
            <div className={styles.card__wrapper}>
                <p className={styles.card__wrapper_name}>{film.nameRu}</p>
                <p className={styles.card__wrapper_year}><span>Год:</span> {film.year}</p>
            </div>
        </Link>
    );
};

export default Film;
