import { AxiosResponse } from 'axios';
import { http } from '../src/http';
import BestFilmsPage from '../src/pages/BestFilmsPage/BestFilmsPage';
import { IPropsBestFilms, IPropsFilms } from '@/types/IFilm';
import { GetServerSidePropsResult } from 'next';
import { useEffect } from 'react';


export async function getServerSideProps(ctx: any): Promise<GetServerSidePropsResult<IPropsBestFilms>> {
  const { data }: AxiosResponse<IPropsBestFilms> = await http.get(`/films/top`, {
    params: {
      type: determinateType(ctx.query?.filter),
      page: 1,
    },
  });
  return {
    props: {
      films: data.films,
      pageUrl: ctx.query?.filter,
      pagesCount: data.pagesCount,
    },
  };
}

export function determinateType(queryType: string | undefined) {
  switch (queryType) {
    case 'best':
      return 'TOP_250_BEST_FILMS';
    case 'popular':
      return 'TOP_100_POPULAR_FILMS';
    case 'await':
      return 'TOP_AWAIT_FILMS';
    default:
      return 'TOP_250_BEST_FILMS';
  }
}

export default function FilmPage(props: IPropsFilms) {
  return (
    <BestFilmsPage {...props} />
  );
}
