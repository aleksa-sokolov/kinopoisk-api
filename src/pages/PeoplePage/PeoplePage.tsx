import { FC, useState } from 'react';
import { IFilmActor, IPeopleResponse } from '@/types/IPeople';
import { AiOutlineDown } from 'react-icons/ai';
import styles from './peoplePage.module.scss';
import clsx from 'clsx';
import Link from 'next/link';


const PeoplePage: FC<IPeopleResponse> = ({ people }) => {
  const [showFacts, setShowFacts] = useState<boolean>(true);
  const [showFilms, setShowsFilm] = useState<boolean>(true);
  const [countFilm, setCountFilm] = useState<number>(10);

  function showMoreFacts(arr: string[]) {
    if (showFacts) {
      return arr.slice(0, 3).map((item, index) => (
        <li className={styles.people__facts_list} key={index}>
          {item}
        </li>
      ));
    }
    return arr.map((item, index) => (
      <li className={styles.people__facts_list} key={index}>
        {item}
      </li>
    ));
  }

  function showMoreFilms(arr: IFilmActor[]) {
    if (showFilms) {
      return arr.filter((film: IFilmActor, index, self) => film.nameRu && film.rating).slice(0, countFilm).map((item: IFilmActor, index) => (
        <Link key={index} className={styles.people__films_wrap_link} href={`/film/${item.filmId}`}>
          <p className={styles.people__films_wrap_link_name}>
            {item.nameRu}
          </p>
          {item.rating ? <>
            <p className={item.rating >= 7 ?
              clsx(styles.people__films_wrap_link_rating, styles.people__films_wrap_link_rating_green) :
              item.rating >= 6 ? clsx(styles.people__films_wrap_link_rating, styles.people__films_wrap_link__rating_yellow) :
                item.rating <= 6 ? clsx(styles.people__films_wrap_link_rating, styles.people__films_wrap_link__rating_red) : '#838383'
            }>
              <span>{item.rating}</span>
            </p>
          </> : ''}
        </Link>
      ));
    }
  }

  return (
    <div className='container'>
      <div className={styles.wrapper}>
        <div className={styles.people__img}>
          <img src={people.posterUrl} alt={people.nameRu} />
        </div>
        <div className={styles.people__info}>
          <h1 className={styles.people__info_name}>
            {people.nameRu}
          </h1>
          <p className={styles.people__info_name_eng}>
            {people.nameEn}
          </p>
          <p className={styles.people__info_about_name}>
            О персоне
          </p>
          <ul className={styles.people__info_lists}>
            <li className={styles.people__info_list}>
              <p>Карьера</p><span>{people.profession}</span>
            </li>
            <li className={styles.people__info_list}>
              <p>Рост</p><span>{people.growth} см</span>
            </li>
            <li className={styles.people__info_list}>
              <p>Дата рождения</p>
              <span>{people.birthday}, {people.age} лет</span></li>
            <li className={styles.people__info_list}>
              <p>Место рождения</p><span>{people.birthplace}</span>
            </li>
            <li className={styles.people__info_list}><p>Партнеры</p>{people.spouses.map(spouse => (
              <span> {spouse.name} </span>))}</li>
            <li className={styles.people__info_list}>
              <p>Всего фильмов</p><span>{people.films.length}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.people__facts}>
        <h2 className={styles.people__facts_title}>
          Знаете ли вы, что…
        </h2>
        <ul className={styles.people__facts_lists}>
          {showMoreFacts(people.facts)}
        </ul>
        <button
          onClick={() => setShowFacts(false)}
          className={showFacts ? styles.people__facts_btn : clsx(styles.people__facts_btn, styles.people__facts_btn_none)}
        >
          <AiOutlineDown />Показать еще
        </button>
      </div>

      <div className={styles.people__films}>
        <h3 className={styles.people__films_title}>
          Фильмы с участием <span>{people.nameRu}</span>
        </h3>
        <div className={styles.people__films_wrap}>
          {showMoreFilms(people.films)}
        </div>
        <button
          onClick={() => {
            // setShowsFilm(false);
            setCountFilm(countFilm + 10);
          }}
          className={
            showFilms ? styles.people__films_btn : clsx(styles.people__films_btn, styles.people__films_btn_none)
          }
        >
          <AiOutlineDown />Показать еще
        </button>
      </div>
    </div>
  );
};

export default PeoplePage;
