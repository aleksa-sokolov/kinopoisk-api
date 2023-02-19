import React from 'react';
import {Skeleton} from "@/components/ui/Skeletons/Skeletons";
import styles from "./FilmSkeleton.module.scss";

const FilmSkeleton = () => {
    return (
        <div className={styles.film}>
            <Skeleton className={styles.film__skeleton}/>
        </div>
    );
};

export default FilmSkeleton;
