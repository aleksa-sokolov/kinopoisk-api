import { FiMenu } from 'react-icons/fi';
import styles from './mobileHeader.module.scss';

const MobileBurger = () => {
  return (
    <div className={styles.mobile__header}>
      <FiMenu />
    </div>
  );
};

export default MobileBurger;
