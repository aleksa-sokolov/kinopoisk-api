import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import searchSlice from "./slices/searchSlice";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import collectionSlice from "./slices/collectionSlice";


const persistCollectionConfig = {
    key: "collection",
    storage
};

const persistCollectionSlice = persistReducer(persistCollectionConfig, collectionSlice)
export const store = configureStore({
    reducer: {
        filter: filterSlice,
        search: searchSlice,
        collections: persistCollectionSlice,
    }
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
