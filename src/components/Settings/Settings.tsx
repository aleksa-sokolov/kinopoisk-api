import {ChangeEvent, FunctionComponent} from "react";
import {useActions} from "@/hooks/useAction";
import {FilmTypes, RatingFilmTypes, YearFilmTypes} from "@/store/slices/filterSlice";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import styles from "./settings.module.scss";
// @ts-ignore


const filmTypes: FilmTypes[] = ["ALL", "FILM", "TV_SHOW", "TV_SERIES", "MINI_SERIES"];

const Settings: FunctionComponent = () => {
    const {typeFilm} = useTypedSelector(state => state.filter);
    const {setTypeFilm, setYearFilmFrom, setYearFilmTo, setMinRatingFilm, setMaxRatingFilm} = useActions();
    const filmYears = [];


    for (let i = 1990; i <= 2023; i++) {
        filmYears.push(i);
    }

    function changeTypeHandler(e: ChangeEvent<HTMLSelectElement>) {
        setTypeFilm(e.target.value as FilmTypes)
    }

    function changeYearFromHandler(e: ChangeEvent<HTMLSelectElement>) {
        setYearFilmFrom(+e.target.value as YearFilmTypes);
    }

    function changeYearToHandler(e: ChangeEvent<HTMLSelectElement>) {
        setYearFilmTo(+e.target.value as YearFilmTypes);
    }

    function handleChangeMinRatingFilm(e: ChangeEvent<HTMLSelectElement>) {
        setMinRatingFilm(+e.target.value as RatingFilmTypes);
    }

    function handleChangeMaxRatingFilm(e: ChangeEvent<HTMLSelectElement>) {
        setMaxRatingFilm(+e.target.value as RatingFilmTypes);
    }

    return (
        <div className={styles.settings}>
            <div className="container">
                <div className={styles.settings__wrapper}>
                    <div className={styles.settings__types}>
                        Тип
                        <select
                            value={typeFilm}
                            defaultValue="ALL"
                            onChange={changeTypeHandler}
                            name="select"
                            className={styles.settings__type}
                        >
                            {filmTypes.map((value, index) => (
                                <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.settings__year}>
                        Мин.год
                        <select
                            defaultValue={1990}
                            name="select"
                            onChange={changeYearFromHandler}>
                            {filmYears.map((value: number, index: number) => (
                                <option
                                    key={index}
                                    value={value}
                                >
                                    {value}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.settings__year}>
                        Макс.год
                        <select
                            defaultValue={2023}
                            name="select"
                            onChange={changeYearToHandler}>
                            {filmYears.map((value: number, index: number) => (
                                <option
                                    key={index}
                                    value={value}
                                >
                                    {value}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.settings__min_rating}>
                        Мин.рейтинг
                        <select
                            defaultValue={7}
                            name="select"
                            onChange={handleChangeMinRatingFilm}
                        >
                            {Array.from(Array(11)).map((values, index) => (
                                <option
                                    key={index}
                                    value={index}
                                >
                                    {index}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.settings__max_rating}>
                        Макс.рейтинг
                        <select
                            defaultValue={10}
                            name="select"
                            onChange={handleChangeMaxRatingFilm}
                        >
                            {Array.from(Array(11)).map((value, index) => (
                                <option
                                    key={index}
                                    value={index}
                                >
                                    {index}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
