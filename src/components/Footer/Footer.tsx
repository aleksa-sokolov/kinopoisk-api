import React, { FC } from 'react';
import styles from './footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        Официальный сайт - <a href='https://www.kinopoisk.ru'>
        Кинопоиск
      </a>
      </div>
    </footer>
  );
};

export default Footer;
