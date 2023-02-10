import React, {ChangeEvent, FunctionComponent, useEffect, useState} from 'react';
import Link from "next/link";
import {AxiosResponse} from "axios";
import clsx from "clsx";
import {useMediaQuery} from 'usehooks-ts';
import {useRouter} from "next/router";

import MobileBurger from "../MobileBurger/MobileHeader";
import MobileMenu from "../MobileMenu/MobileMenu";
import Settings from "../Settings/Settings";
import {useActions} from "@/hooks/useAction";

import {useTypedSelector} from "@/hooks/useTypedSelector";
import {getHttpSearch} from "../../http";

import {ISearch, ISearchFilm} from "@/types/ISearch";

import styles from "./header.module.scss";


const Header: FunctionComponent = () => {
    const matches = useMediaQuery('(max-width: 940px)');
    const router = useRouter();
    const {setSearchFilm} = useActions();
    const {nameRu} = useTypedSelector(state => state.search);
    const [searchResultFilm, setResultFilm] = useState<ISearchFilm[]>();
    const [openMenu, setOpenMenu] = useState(false);

    function closeBurger() {
        setOpenMenu(false);
    }

    function handlerChangeSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearchFilm(e.target.value as string);
    }

    async function getHttpResultFilm() {
        const {data}: AxiosResponse<ISearch> = await getHttpSearch("search-by-keyword", {
            params: {
                keyword: nameRu
            }
        });
        setResultFilm(data.films);
        return data;
    }


    useEffect(() => {
        getHttpResultFilm();
    }, [nameRu])

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.header__wrapper}>
                    <Link href="/" className={styles.header__logo}>
                        Кинопоиск
                    </Link>
                    <div className={styles.header__search}>
                        <div
                            className={nameRu ? clsx(styles.header__search_wrapper, styles.header__search_wrapper_border) :
                                styles.header__search_wrapper}>
                            <input
                                onChange={handlerChangeSearch}
                                className={styles.header__search_wrapper_input}
                                type="text"
                                placeholder="Поиск фильмов"
                            />
                            <button className={styles.header__search_wrapper_btn}>
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.95068 1.36413C7.071 0.484451 5.90145 0 4.6574 0C3.41335 0 2.24378 0.484451 1.36413 1.36413C0.484451 2.24378 0 3.41335 0 4.65738C0 5.90143 0.484451 7.071 1.36413 7.95066C2.24378 8.83031 3.41337 9.31478 4.6574 9.31478C5.90143 9.31478 7.071 8.83031 7.95068 7.95066C8.83033 7.071 9.3148 5.90143 9.3148 4.65738C9.31478 3.41335 8.83033 2.24378 7.95068 1.36413ZM4.65738 8.42608C2.57931 8.42608 0.888679 6.73546 0.888679 4.65738C0.888679 2.57931 2.57933 0.888679 4.6574 0.888679C6.73548 0.888679 8.42608 2.57931 8.42608 4.65738C8.42608 6.73546 6.73546 8.42608 4.65738 8.42608Z"
                                        fill="#00ABB3"/>
                                    <path
                                        d="M10.8699 10.2414L7.9488 7.32039C7.77527 7.14686 7.49394 7.14686 7.32041 7.32039C7.1469 7.49392 7.1469 7.77526 7.32041 7.94879L10.2414 10.8698C10.3282 10.9566 10.4419 11 10.5557 11C10.6694 11 10.7831 10.9566 10.8699 10.8698C11.0434 10.6963 11.0434 10.415 10.8699 10.2414Z"
                                        fill="#00ABB3"/>
                                </svg>
                            </button>
                        </div>
                        <ul className={styles.header__search_results}>
                            {searchResultFilm?.slice(0, 5).map((film: ISearchFilm, index) => {
                                return (<li className={styles.header__search_result} key={index}>
                                    <Link onClick={() => {
                                        setResultFilm([])
                                    }} className={styles.header__search_result_link}
                                          href={`film/${film.filmId ? film.filmId : film.kinopoiskId}`}>
                                        <div className={styles.header__search_result_link_img}>
                                            <img src={film.posterUrl} alt=""/>
                                        </div>
                                        {film.nameRu}
                                    </Link>
                                </li>)
                            })}
                        </ul>
                    </div>
                    {!matches ?
                        <>
                            <ul className={styles.header__lists}>
                                <li className={styles.header__lists_list}><Link href="/films?filter=best">Лучшие</Link>
                                </li>
                                <li className={styles.header__lists_list}><Link
                                    href="/films?filter=popular">Популярные</Link>
                                </li>
                                <li className={styles.header__lists_list}><Link
                                    href="/films?filter=await">Ожидаемые</Link></li>
                            </ul>
                            <Link href="/collections" className={styles.header__btn}>
                                <svg width="12" height="11" viewBox="0 0 12 11" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.99726 0C10.6564 0 12 1.38028 12 3.08176C12 6.16352 8.99726 7.91821 5.99836 11C2.99918 7.91821 0 6.16352 0 3.08179C0 1.3803 1.34356 2.82436e-05 2.99918 2.82436e-05C4.49863 2.82436e-05 5.24849 0.770539 5.99836 2.31128C6.74795 0.770539 7.49781 0 8.99726 0Z"
                                        fill="#FF7979"/>
                                </svg>
                                Коллекция
                            </Link>
                        </>
                        : <div onClick={() => setOpenMenu(true)}>
                            <MobileBurger/>
                        </div>
                    }
                </div>
            </div>
            {router.asPath === "/" ? <Settings/> : <></>}
            <MobileMenu closeBurger={closeBurger} openMenu={openMenu}/>
        </header>
    );
};

export default Header;
