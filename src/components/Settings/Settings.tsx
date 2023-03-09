import { FC } from 'react';
import { useActions } from '@/hooks/useAction';
import { FilmTypes, RatingFilmTypes } from '@/store/slices/filterSlice';
import styles from './settings.module.scss';
import { Select, Space } from 'antd';

const Settings: FC = () => {
  const { setTypeFilm, setYearFilmFrom, setYearFilmTo, setMinRatingFilm, setMaxRatingFilm } = useActions();
  const filmYears = [];
  const filmRating = [];

  for (let i = 1990; i <= 2023; i++) {
    filmYears.push({
      value: i,
      label: i,
    });
  }

  for (let i = 0; i <= 10; i++) {
    filmRating.push({
      value: i,
      label: i,
    });
  }


  function changeTypeHandler(value: FilmTypes) {
    setTypeFilm(value);
  }

  function changeYearFromHandler(value: number) {
    setYearFilmFrom(+value);
  }

  function changeYearToHandler(value: number) {
    setYearFilmTo(+value);
  }

  function handleChangeMinRatingFilm(value: RatingFilmTypes) {
    setMinRatingFilm(value);
  }

  function handleChangeMaxRatingFilm(value: RatingFilmTypes) {
    setMaxRatingFilm(value);
  }

  return (
    <div className={styles.settings}>
      <div className='container'>
        <div className={styles.settings__wrapper}>
          <div className={styles.settings__types}>
            <Space wrap className={styles.settings__subtitle_options}>
              Тип
              <Select
                defaultValue='ALL'
                style={{ width: 120 }}
                onChange={changeTypeHandler}
                options={[
                  { value: 'ALL', label: 'All' },
                  { value: 'FILM', label: 'Film' },
                  { value: 'TV_SERIES', label: 'TV series' },
                  { value: 'MINI_SERIES', label: 'Mini series' },
                ]}
              />
            </Space>
          </div>
          <div className={styles.settings__year}>
            <Space wrap className={styles.settings__subtitle_options}>
              Мин.год
              <Select
                defaultValue={1990}
                style={{ width: 120 }}
                onChange={changeYearFromHandler}
                options={filmYears}
              />
            </Space>
          </div>
          <div className={styles.settings__year}>
            <Space wrap className={styles.settings__subtitle_options}>
              Макс.год
              <Select
                defaultValue={2023}
                style={{ width: 120 }}
                onChange={changeYearToHandler}
                options={filmYears}
              />
            </Space>
          </div>
          <div className={styles.settings__min_rating}>
            <Space wrap className={styles.settings__subtitle_options}>
              Мин.рейтинг
              <Select
                defaultValue={1}
                style={{ width: 120 }}
                onChange={handleChangeMinRatingFilm}
                options={filmRating}
              />
            </Space>
          </div>
          <div className={styles.settings__max_rating}>
            <Space wrap className={styles.settings__subtitle_options}>
              Макс.рейтинг
              <Select
                defaultValue={9}
                style={{ width: 120 }}
                onChange={handleChangeMaxRatingFilm}
                options={filmRating}
              />
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
