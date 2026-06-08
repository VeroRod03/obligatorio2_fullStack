import {
    createSlice,
} from "@reduxjs/toolkit";

const initialState = {
    tiposObra: []
};

const tiposObraSlice = createSlice({
    name: "tiposObra",
    initialState,
    reducers: {
        setTiposObra: (state, action) => {
            state.tiposObra = action.payload;
        }
    },
});

export const { setTiposObra } = tiposObraSlice.actions;

export default tiposObraSlice.reducer;