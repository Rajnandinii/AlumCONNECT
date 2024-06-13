import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPostFormOpen : false
}

export const postFormToggleSlice = createSlice({
    name: "postFormOpen",
    initialState,
    reducers: {
        togglePostForm : (state)=>{
            state.isPostFormOpen = !state.isPostFormOpen
        },
    }
})

export const {togglePostForm} = postFormToggleSlice.actions

export default postFormToggleSlice.reducer