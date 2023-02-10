import styles from "./Skeletons.module.scss"
import {FC, HTMLAttributes} from "react";
import clsx from "clsx";

export const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({className}) => {
    return <div className={clsx(className, styles.total_skeletons)} />
}