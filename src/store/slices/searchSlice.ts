import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    nameRu: "",
}

export const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {
        setSearchFilm: (state, action: PayloadAction<string>) => {
            state.nameRu = action.payload;
        }
    }
})

export const {setSearchFilm} = searchSlice.actions;
export default searchSlice.reducer;
