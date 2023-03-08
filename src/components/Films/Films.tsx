import React, { FC } from 'react';
import Film from '../Film/Film';
import styles from './films.module.scss';
import { IFilm, PropsFilm } from '@/types/IFilm';

const Films: FC<PropsFilm> = ({ films }) => {
  let filmItems = films.films;
  return (
    <div className={styles.cards}>
      <div className={styles.cards__container}>
        {filmItems.map((film: IFilm) => (
          <Film film={film} key={film.kinopoiskId ? film.kinopoiskId : film.filmId} />
        ))}
      </div>
    </div>
  );
};

export default Films;
