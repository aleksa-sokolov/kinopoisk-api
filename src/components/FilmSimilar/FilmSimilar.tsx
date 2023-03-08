import React, { FC } from 'react';
import Slider from 'react-slick';
import { ISimilarFilms } from '@/types/ISimilarFilms';
import Link from 'next/link';
import styles from './filmSimilar.module.scss';
import Image from 'next/image';

const settingsSlider = {
  dots: false,
  infinite: true,
  arrows: false,
  speed: 1000,
  slidesToShow: 6,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 780,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 634,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};
const FilmSimilar: FC<ISimilarFilms> = (filmSimilar) => {
  return (
    <div className={styles.film__wrapper}>
      <div className={styles.similarFilms}>
        <h2 className={styles.similarFilms__title}>
          Похожие фильмы и сериалы
        </h2>
        {filmSimilar.total <= 5 ?
          <>
            <p className={styles.similarFilms__subtitle}>
              Нет похожих фильмов
              <span> (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧</span>
            </p>
            <img
              className={styles.similarFilms__img}
              src='/images/no-god-no-god-please-no.gif' alt='alt'
            />
          </> :
          <Slider {...settingsSlider}>
            {filmSimilar.items?.map((film, index) => {
              return (
                <div key={index} className={styles.similarFilm}>
                  <Image
                    unoptimized
                    width={190}
                    height={260}
                    className={styles.similarFilm__img}
                    src={film.posterUrl}
                    alt='' />
                  <Link
                    href={`${film.filmId ? film.filmId : film.kinopoiskId}`}
                    className={styles.similarFilm__title}
                  >
                    {film.nameRu}
                  </Link>
                </div>
              );
            })}
          </Slider>
        }
      </div>
    </div>
  );
};

export default FilmSimilar;
