import axios from "axios";

export const http = axios.create({
    baseURL: "https://kinopoiskapiunofficial.tech/api/v2.2/",
    headers: {
        'X-API-KEY': '378420c5-80b2-40d6-9116-77ffd5586502',
        'Content-Type': 'application/json; charset=utf-8',
    }
});


export const getHttpDirector = axios.create({
    baseURL: "https://kinopoiskapiunofficial.tech/api/v1/",
    headers: {
        'X-API-KEY': '378420c5-80b2-40d6-9116-77ffd5586502',
        'Content-Type': 'application/json; charset=utf-8',
    }
});


export const getHttpSearch = axios.create({
    baseURL: "https://kinopoiskapiunofficial.tech/api/v2.1/films/",
    headers: {
        'X-API-KEY': '378420c5-80b2-40d6-9116-77ffd5586502',
        'Content-Type': 'application/json; charset=utf-8',
    }
});


