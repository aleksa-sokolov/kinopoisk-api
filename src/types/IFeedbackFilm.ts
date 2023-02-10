export type IFeedbackFilm = {
    items: IFeedbackFilmInfo[],
    total: number,
    totalNegativeReviews: number,
    totalNeutralReviews: number,
    totalPositiveReviews: number
}


export interface IFeedbackFilmInfo {
    kinopoiskId: number,
    type: string,
    date: string,
    positiveRating: number,
    negativeRating: number,
    author: string,
    title: string,
    description: string
}
