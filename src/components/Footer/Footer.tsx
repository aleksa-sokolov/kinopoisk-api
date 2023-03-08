import React, { FC } from 'react';
import styles from './footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      Официальный сайт: <a href='https://www.kinopoisk.ru'>Кинопоиск</a>
    </footer>
  );
};

export default Footer;
