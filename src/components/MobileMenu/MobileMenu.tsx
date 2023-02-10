import Link from "next/link";
import clsx from "clsx";
import {FiX} from "react-icons/fi";
import styles from "./mobileMenu.module.scss";

const MobileMenu = ({openMenu, closeBurger}: { openMenu: boolean, closeBurger: () => void }) => {
    return (
        <>
            {openMenu ?
                <div className={openMenu ? clsx(styles.mobile__menu, styles.mobile__menu_active) : styles.mobile__menu}>
                    <FiX onClick={closeBurger}/>
                    <ul className={styles.mobile__menu_lists}>
                        <li onClick={closeBurger} className={styles.mobile__menu_list}><Link href="/films?filter=best">Лучшие</Link></li>
                        <li onClick={closeBurger} className={styles.mobile__menu_list}><Link href="/films?filter=await">Ожидаемые</Link></li>
                        <li onClick={closeBurger} className={styles.mobile__menu_list}><Link href="/films?filter=popular">Популярные</Link></li>
                        <li onClick={closeBurger} className={styles.mobile__menu_list}><Link href="/collections">Моя коллекция</Link></li>
                    </ul>
                </div> : <></>
            }
        </>

    );
};

export default MobileMenu;
