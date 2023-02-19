import React, { FC } from 'react';
import { PropsFilms } from '../../../pages/films';
import Film from '../Film/Film';
import styles from './films.module.scss';

const Films: FC<PropsFilms> = ({ films }) => {
  let filmItems = films.films;
  return (
    <div className={styles.cards}>
      <div className={styles.cards__container}>
        {filmItems.map((film) => (
          <Film film={film} key={film.kinopoiskId ? film.kinopoiskId : film.filmId} />
        ))}
      </div>
    </div>
  );
};

export default Films;
