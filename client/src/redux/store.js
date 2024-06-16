import {configureStore} from '@reduxjs/toolkit'

import themeReducer from './features/themeSlice.js'
import postFormToggleReducer from './features/postFormToggleSlice.js'
import authReducer from './features/authSlice.js'
import loadingReducer from './features/loadingSlice.js'

export const store = configureStore({

    reducer : {
        colorTheme: themeReducer,
        postFormToggle: postFormToggleReducer,
        auth: authReducer,
        loadState: loadingReducer,
    }
})