import React, { FC, useEffect, useState } from 'react';
import Film from '../../components/Film/Film';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IFilm, IPropsFilms } from '@/types/IFilm';
import InfiniteScroll from 'react-infinite-scroller';
import FilmSkeleton from '@/components/ui/FilmSkeleton/FilmSkeleton';
import { useActions } from '@/hooks/useAction';
import { filmsService } from '@/services/filmsService';

const HomePage: FC<IPropsFilms> = ({ films, totalPages }) => {
  const [filmsState, setFilmsState] = useState<IFilm[]>(films);
  window.history.pushState(films, '', `https://kinopoisk-beryl.vercel.app/`);
  const {
    typeFilm,
    yearFilmFrom,
    yearFilmTo,
    minRatingFilm,
    maxRatingFilm,
    page,
  } = useTypedSelector(state => state.filter);
  const { setPageFilm } = useActions();
  const [loading, setLoading] = useState<boolean>(false);

  async function getFilms() {
    setLoading(true);
    const { data } = await filmsService.getFilms({
      order: 'RATING',
      type: typeFilm,
      ratingFrom: minRatingFilm,
      ratingTo: maxRatingFilm,
      yearFrom: yearFilmFrom,
      yearTo: yearFilmTo,
      page: page,
    });
    setFilmsState([...filmsState, ...data.items]);
    setLoading(false);
  }

  function loadMore() {
    if (!loading && filmsState.length) {
      if (totalPages < page) {
        return;
      }
      setPageFilm(page + 1);
      getFilms();
    }
  }


  useEffect(() => {
    if (page !== 1) {
      setFilmsState([]);
      setFilmsState(filmsState.splice(0, 20));
      getFilms();
    }
    if (typeFilm !== 'ALL' || minRatingFilm !== 0 || maxRatingFilm !== 9 || yearFilmTo !== 2023 || yearFilmFrom !== 1990) {
      setFilmsState([]);
      setFilmsState(filmsState.splice(0, 20));
      setPageFilm(1);
      getFilms();
    }
  }, [minRatingFilm, maxRatingFilm, typeFilm, yearFilmTo, yearFilmFrom]);

  return (
    <div className='container'>
      <InfiniteScroll
        pageStart={0}
        initialLoad={false}
        hasMore={true}
        loadMore={loadMore}
        useWindow={true}
        threshold={100}
      >
        <div className='wrap__films'>
          {filmsState.map((film, index) => (
            <Film key={index} film={film} />
          ))}
          {loading ?
            <>
              {[...new Array(20)].map((_, index) => (
                <FilmSkeleton key={index} />
              ))}
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
