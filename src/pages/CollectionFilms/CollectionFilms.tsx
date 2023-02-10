import React from 'react';
import {useTypedSelector} from "@/hooks/useTypedSelector";
import Film from "../../components/Film/Film";

const CollectionFilms = () => {
    const collectionsFilms = useTypedSelector(state => state.collections);
    return (
        <div className="wrap__films">
            {
                collectionsFilms.favoriteCollection.map((film, index) => (
                    <Film isCollectionFilm={true} key={index} film={film}/>
                ))
            }
        </div>
    );
};

export default CollectionFilms;
