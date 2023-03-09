import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import {
  setTypeFilm,
  setYearFilmFrom,
  setYearFilmTo,
  setMinRatingFilm,
  setMaxRatingFilm,
  setPageFilm,
  setPageBestFilm,
  setPagePopularFilm,
  setStartFilter
} from '@/store/slices/filterSlice';
import { setSearchFilm } from '@/store/slices/searchSlice';
import { AddCollectionFilm, removeCollectionFilm } from '@/store/slices/collectionSlice';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    setTypeFilm,
    setYearFilmFrom,
    setYearFilmTo,
    setMinRatingFilm,
    setMaxRatingFilm,
    setSearchFilm,
    AddCollectionFilm,
    removeCollectionFilm,
    setPageFilm,
    setPageBestFilm,
    setPagePopularFilm,
    setStartFilter
  }, dispatch);
};
