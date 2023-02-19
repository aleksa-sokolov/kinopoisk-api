import { http } from '@/http/index';
import { AxiosResponse } from 'axios';
import { IHomePageFilms } from '@/types/IFilm';
import { IGetFilmsParams } from '@/types/IFilmServices';
import { ISearch, ISearchFilm } from '@/types/ISearch';

export const filmsService = {
  async getFilms(params: IGetFilmsParams): Promise<AxiosResponse<IHomePageFilms>> {
    return http.get('/films', {
      params,
    });
  },
};

export const getFilmsService = {
  async getHttpSearch(params: ISearch): Promise<AxiosResponse<ISearch>> {
    return http.get('search-by-keyword', {
      params,
    });
  },
};
