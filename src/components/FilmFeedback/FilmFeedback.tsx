import React, { FC, useState } from 'react';
import { IFeedbackFilmInfo } from '@/types/IFeedbackFilm';
import { AiFillStar } from 'react-icons/ai';
import styles from './filmFeedback.module.scss';


const FilmFeedback: FC<IFeedbackFilmInfo> = (feedback) => {
  const [open, setOpen] = useState<boolean>(false);
  const style = {
    fill: feedback.type === 'POSITIVE' ? 'green' : feedback.type === 'NEGATIVE' ? 'red' : 'yellow',
    fontSize: '1.5em',
  };

  function truncate() {
    if (!open) {
      return <p>{feedback.description.slice(0, 300)} ...</p>;
    }
    return <p>{feedback.description}</p>;
  }

  return (
    <div className={styles.feedback}>
      <div className={styles.feedback__top}>
        <div className={styles.feedback__top_author}>
          <p className={styles.feedback__top_author_name}>{feedback.author}</p>
          <p className={styles.feedback__top_author_date}>{feedback.date}</p>
        </div>
        <div className={styles.feedback__top_rating}>
                    <span>
                        {feedback.type === 'POSITIVE' ? 'Хороший отзыв' : feedback.type === 'NEGATIVE' ?
                          'Негативный отзыв' : 'Нейтральный отзыв'}
                    </span>
          <AiFillStar style={style} />
        </div>
      </div>
      <div className={styles.feedback__content}>
        <p>{truncate()}</p>
        <button onClick={() => setOpen(!open)}>
          {!open ? 'Показать полностью' : 'Скрыть'}
        </button>
      </div>
    </div>
  );
};

export default FilmFeedback;
