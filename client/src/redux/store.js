import {configureStore} from '@reduxjs/toolkit'

import themeReducer from './features/themeSlice.js'

export const store = configureStore({

    reducer : {
        colorTheme: themeReducer,
    }
})