import { GetServerSidePropsResult } from 'next';
import { IFilm, ISingleFilmResponse } from '@/types/IFilm';
import { AxiosResponse } from 'axios';
import { getHttpDirector, http } from '@/http/index';
import SinglePageFilm from '../../src/pages/SinglePageFilm/SinglePageFilm';
import { IPeoplesFilm } from '@/types/IPeoplesFilm';
import { ISimilarFilms } from '@/types/ISimilarFilms';

export async function getServerSideProps(ctx: any): Promise<GetServerSidePropsResult<ISingleFilmResponse>> {
  const idFilm: number = ctx.params.id;
  const film: AxiosResponse<IFilm> = await http.get(`/films/${idFilm}`);
  const peoplesRelatedToTheFilm: AxiosResponse<IPeoplesFilm[]> = await getHttpDirector.get(`staff`, {
    params: {
      filmId: idFilm,
    },
  });
  const filmSimilar: AxiosResponse<ISimilarFilms> = await http.get(`films/${idFilm}/similars`);

  return {
    props: {
      film: film.data,
      peoplesRelatedToTheFilm: peoplesRelatedToTheFilm.data,
      filmSimilar: filmSimilar.data,
      idFilm: idFilm,
    },
  };
}

export default function FilmPage(props: ISingleFilmResponse) {
  return (
    <SinglePageFilm {...props} />
  );
}
