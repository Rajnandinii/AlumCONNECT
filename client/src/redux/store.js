import {configureStore} from '@reduxjs/toolkit'

import themeReducer from './features/themeSlice.js'
import postFormToggleReducer from './features/postFormToggleSlice.js'

export const store = configureStore({

    reducer : {
        colorTheme: themeReducer,
        postFormToggle: postFormToggleReducer
    }
})