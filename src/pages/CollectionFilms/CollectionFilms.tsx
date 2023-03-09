import React from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Film from '../../components/Film/Film';
import { IFilm } from '@/types/IFilm';

const CollectionFilms = () => {
  const collectionsFilms: [] | any = useTypedSelector(state => state.collections);
  const style: {} = {
    display: 'block',
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    color: '#fff',
  };
  return (
    <div className='wrap__films'>
      {collectionsFilms.favoriteCollection <= 0 ?
        <div style={style}>
          <p style={{ textAlign: 'center' }}>
            Вы еще не добавили ни одного фильма в свою коллекцию :(
          </p>
          <img
            style={{ borderRadius: '20px', width: '100%', maxWidth: '600px', height: 'auto' }}
            src='/images/spiderman-crying.gif' alt=''
          />
        </div>
        :
        collectionsFilms.favoriteCollection.map((film: IFilm, index: number) => {
          return <Film isCollectionFilm={true} key={index} film={film} />;
        })}
    </div>
  );
};

export default CollectionFilms;
