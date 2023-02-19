import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { AxiosResponse } from 'axios';
import { IFilm, ISingleFilmResponse } from '@/types/IFilm';
import { useActions } from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ICollectionsFilm } from '@/types/ICollectionsFilm';
import FilmFeedback from '../../components/FilmFeedback/FilmFeedback';
import FilmSimilar from '../../components/FilmSimilar/FilmSimilar';
import { IFeedbackFilm } from '@/types/IFeedbackFilm';
import { http } from '../../http';
import styles from './singlePageFilm.module.scss';


const SinglePageFilm: FC<ISingleFilmResponse> = ({ film, peoplesRelatedToTheFilm, filmSimilar, idFilm }) => {
  const { AddCollectionFilm, removeCollectionFilm } = useActions();
  const collectionFilms = useTypedSelector(state => state.collections);
  const [filmFeedback, setFilmFeedback] = useState<IFeedbackFilm>();
  const [orderFeedback, setOrderFeedback] = useState<string>();

  function checkFavoriteFilms(arr: ICollectionsFilm, obj: IFilm) {
    const found = arr.favoriteCollection.find((element) => element.nameRu === obj.nameRu);
    if (found === undefined) {
      return false;
    }
    return true;
  }

  const getPeopleRelatedToTheFilm = (value: string, tag: string) => {
    const result = peoplesRelatedToTheFilm?.filter((item) => item.professionKey === value)?.slice(0, 10).map((people, index) => {
      if (tag === 'span') {
        return <span key={index}>{people.nameRu}</span>;
      } else if (tag === 'link') {
        return <Link key={index} href={`/people/${people.staffId}`}>{people.nameRu}</Link>;
      }
    });
    return result;
  };

  async function getFeedBackFilm() {
    const filmFeedBack: AxiosResponse<IFeedbackFilm> = await http.get(`films/${idFilm}/reviews`, {
      params: {
        order: orderFeedback,
      },
    });
    setFilmFeedback(filmFeedBack.data);
  }

  useEffect(() => {
    getFeedBackFilm();
  }, [orderFeedback, idFilm]);

  return (
    <div className='container'>
      <div className={styles.film__wrapper}>
        <div className={styles.film__wrapper_img}>
          <img src={film.posterUrl} alt='' />
        </div>
        <div className={styles.film__info}>
          <div className={styles.film__info_top}>
            <div className={styles.film__info_top_wrap}>
              <h1 className={styles.film__info_top_wrap_title}>{film.nameRu}</h1>
              <ul className={styles.film__info_top_wrap_lists}>
                <li className={styles.film__info_top_wrap_list}>
                  {
                    film.genres.map((items, index) => (
                      <Link key={index} href='/'>{items.genre}</Link>))
                  }
                </li>
              </ul>
            </div>
            {
              checkFavoriteFilms(collectionFilms, film) ?
                <button
                  onClick={() => removeCollectionFilm(film.filmId)}
                  className={styles.film__info_top_btn}
                >
                  Удалить из коллекции
                </button> :
                <button
                  onClick={() => AddCollectionFilm(film)}
                  className={styles.film__info_top_btn}
                >
                  Добавить в коллекцию
                </button>
            }
          </div>
          <ul className={styles.film__info_creators}>
            {film.description ?
              <li className={styles.film__info_creators_story}>Сюжет
                фильма:<span>{film.description}</span>
              </li> :
              <>
              </>
            }
            <li className={styles.film__info_creators_director}>
              Режиссер: {getPeopleRelatedToTheFilm('DIRECTOR', 'span')}
            </li>
            <li className={styles.film__info_creators_roles}>
              В ролях: {getPeopleRelatedToTheFilm('ACTOR', 'link')}
            </li>
            <li className={styles.film__info_creators_countries}>Страна:
              {
                film.countries.map((country, index) => (
                  <span key={index}>{country.country}</span>))
              }
            </li>
            <li className={styles.film__info_creators_produces}>
              Продюсеры:{getPeopleRelatedToTheFilm('PRODUCER', 'span')}
            </li>
            <li className={styles.film__info_creators_script}>
              Сценарий: {getPeopleRelatedToTheFilm('WRITER', 'span')}
            </li>
            <li className={styles.film__info_creators_composer}>
              Оператор:{getPeopleRelatedToTheFilm('OPERATOR', 'span')}
            </li>
            <li className={styles.film__info_creators_age}>Возрастные
              ограничения:<span>{film.ratingAgeLimits}</span></li>
            {film.slogan ?
              <li className={styles.film__info_creators_slogan}>Слоган:<span>{film.slogan}</span></li> :
              <></>
            }
          </ul>
        </div>
      </div>
      <FilmSimilar {...filmSimilar} />
      <div className={styles.feedbacks}>
        <p className={styles.feedbacks__title}>Рецензии пользователей</p>
        <div className={styles.feedbacks__reviews}>
          <p className={styles.feedbacks__review}>Положительных
            отзывов: <span>{filmFeedback?.totalPositiveReviews}</span>
          </p>
          <p className={styles.feedbacks__review}>Отрицательных
            отзывов: <span>{filmFeedback?.totalNegativeReviews}</span>
          </p>
          <p className={styles.feedbacks__review}>Нейтральных
            отзывов: <span>{filmFeedback?.totalNeutralReviews}</span>
          </p>
        </div>
        <div className={styles.feedbacks__buttons}>
          <button onClick={() => setOrderFeedback('DATE_ASC')}>Старые отзывы</button>
          <button onClick={() => setOrderFeedback('DATE_DESC')}>Новые отзывы</button>
        </div>
        {filmFeedback?.items.map((feedback, index) => (<FilmFeedback key={index} {...feedback} />))}
      </div>
    </div>
  );
};

export default SinglePageFilm;
