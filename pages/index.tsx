import { GetServerSidePropsResult } from 'next';
import { AxiosResponse } from 'axios';
import HomePage from '../src/pages/HomePage/HomePage';
import { IHomePageFilms, IPropsFilms } from '@/types/IFilm';
import { http } from '../src/http';

export async function getStaticProps(ctx: any): Promise<GetServerSidePropsResult<IPropsFilms>> {
  try {
    const { data }: AxiosResponse<IHomePageFilms> = await http.get(`/films`, {
      params: {
        order: 'RATING',
        type: 'ALL',
        ratingFrom: 1,
        ratingTo: 10,
        yearFrom: 1990,
        yearTo: 2023,
        page: 1,
      },
    });
    return {
      props: {
        films: data.items,
        totalPages: data.totalPages,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        films: [],
        totalPages: 0,
      },
    };
  }
}

export default function FilmPage(props: IPropsFilms) {
  return (
    <HomePage {...props} />
  );
}
