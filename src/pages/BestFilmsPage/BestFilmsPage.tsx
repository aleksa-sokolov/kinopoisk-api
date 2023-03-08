import React, { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Film from '../../components/Film/Film';
import { IFilm, IHomePageFilms, IPropsFilms } from '@/types/IFilm';
import FilmSkeleton from '@/components/ui/FilmSkeleton/FilmSkeleton';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useAction';
import { AxiosResponse } from 'axios';
import { http } from '@/http/index';
import { determinateType } from '../../../pages/films';
import { useRouter } from 'next/router';


const BestFilmsPage: FC<IPropsFilms> = ({ films, totalPages }, pageUrl) => {
  const router = useRouter();
  const [filmsState, setFilmsState] = useState<IFilm[]>(films);
  const [loading, setLoading] = useState<boolean>(false);
  const { pages } = useTypedSelector(state => state.filter);
  const urlName = determinateType(pageUrl);
  const { setPageFilm } = useActions();

  useEffect(() => {
    setFilmsState(films);
  }, [router.query]);

  async function getFilms() {
    setLoading(true);
    const { data }: AxiosResponse<IHomePageFilms> = await http.get(`/films/top`, {
      params: {
        type: urlName,
        page: pages,
      },
    });
    setFilmsState([...filmsState, ...data.films]);
    setLoading(false);
  }

  function loadMore() {
    if (!loading && filmsState.length) {
      setPageFilm(pages + 1);
      getFilms();
    }
  }

  return (
    <div className='container'>
      <InfiniteScroll
        pageStart={0}
        initialLoad={false}
        hasMore={true}
        loadMore={loadMore}
        useWindow={true}
        threshold={500}
      >
        <div className='wrap__films'>
          {filmsState?.map((film: IFilm) => <Film key={film.filmId} film={film} />)}
          {loading ?
            <>
              {[...new Array(8)].map((_, index) => (
                <FilmSkeleton key={index} />
              ))}
            </> :
            <></>}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default BestFilmsPage;



