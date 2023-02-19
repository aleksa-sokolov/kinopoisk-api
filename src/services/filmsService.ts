import { http } from '@/http/index';
import { AxiosResponse } from 'axios';
import { IHomePageFilms } from '@/types/IFilm';
import { IGetFilmsParams } from '@/types/IFilmServices';

export const filmsService = {
  async getFilms(params: IGetFilmsParams): Promise<AxiosResponse<IHomePageFilms>> {
    return http.get('/films', {
      params,
    });
  },
};
