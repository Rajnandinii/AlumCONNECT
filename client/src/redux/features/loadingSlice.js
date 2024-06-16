import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        toggleLoading : (state) => {
            state.loading =!state.loading;
        },
    }
})

export const {toggleLoading} = loadingSlice.actions

export default loadingSlice.reducer