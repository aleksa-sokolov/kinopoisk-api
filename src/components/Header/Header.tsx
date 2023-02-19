import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import Link from 'next/link';
import { AxiosResponse } from 'axios';
import { useMediaQuery } from 'usehooks-ts';
import { useRouter } from 'next/router';
import MobileBurger from '../MobileBurger/MobileHeader';
import MobileMenu from '../MobileMenu/MobileMenu';
import Settings from '../Settings/Settings';
import { useActions } from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { getHttpSearch } from '../../http';
import { Input } from 'antd';
import { ISearch, ISearchFilm } from '@/types/ISearch';
import styles from './header.module.scss';

const { Search } = Input;
const Header: FunctionComponent = () => {
  const matches = useMediaQuery('(max-width: 940px)');
  const router = useRouter();
  const { setSearchFilm } = useActions();
  const { nameRu } = useTypedSelector(state => state.search);
  const [searchResultFilm, setResultFilm] = useState<ISearchFilm[]>();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const style = {
    display: nameRu ? 'block' : 'none',
  };

  function closeBurger() {
    setOpenMenu(false);
  }

  function handlerChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchFilm(e.target.value as string);
  }

  async function getHttpResultFilm() {
    const { data }: AxiosResponse<ISearch> = await getHttpSearch('search-by-keyword', {
      params: {
        keyword: nameRu,
      },
    });
    setResultFilm(data.films);
    return data;
  }


  useEffect(() => {
    if (nameRu) {
      getHttpResultFilm();
    }
  }, [nameRu]);

  return (

    <header className={styles.header}>
      <div className='container'>
        <div className={styles.header__wrapper}>
          <Link href='/' className={styles.header__logo}>
            Кинопоиск
          </Link>
          <div className={styles.header__search}>
            <div>
              <Search
                onChange={handlerChangeSearch}
                className={styles.header__search_wrapper_input}
                placeholder='Поиск фильмов'
                allowClear
                enterButton='Поиск'
                size='middle'
                style={{ height: 34 }}
              />
            </div>
            {/*// в отдельный компонент */}
            <ul style={style} className={styles.header__search_results}>
              {searchResultFilm?.slice(0, 5).map((film: ISearchFilm, index) => {
                return (<li className={styles.header__search_result} key={index}>
                  <Link
                    onClick={() => setResultFilm([])}
                    className={styles.header__search_result_link}
                    href={`film/${film.filmId ? film.filmId : film.kinopoiskId}`}
                  >
                    <div className={styles.header__search_result_link_img}>
                      <img src={film.posterUrl} alt={film.nameRu} />
                    </div>
                    {film.nameRu}
                  </Link>
                </li>);
              })}
            </ul>
          </div>
          {!matches ?
            <>
              <ul className={styles.header__lists}>
                <li className={styles.header__lists_list}>
                  <Link href='/films?filter=best'>Лучшие</Link>
                </li>
                <li className={styles.header__lists_list}>
                  <Link href='/films?filter=popular'>Популярные</Link>
                </li>
                <li className={styles.header__lists_list}>
                  <Link href='/films?filter=await'>Ожидаемые</Link>
                </li>
              </ul>
              <Link href='/collections' className={styles.header__btn}>
                Коллекция
              </Link>
            </>
            : <div onClick={() => setOpenMenu(true)}>
              <MobileBurger />
            </div>
          }
        </div>
      </div>
      {router.asPath === '/' ? <Settings /> : <></>}
      <MobileMenu closeBurger={closeBurger} openMenu={openMenu} />
    </header>

  );
};

export default Header;
