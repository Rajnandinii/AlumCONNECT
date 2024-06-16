import {createSlice} from '@reduxjs/toolkit'

const getFromLocal = ()=>{
    const userData = JSON.parse(localStorage.getItem('userInfo'))
    return userData? userData : null
}

const getRole = (value)=>{
    const userData = JSON.parse(localStorage.getItem('userInfo'))
    if(userData && userData.role === value){
       return true
    }
    else return false
}

const initialState = {
    user: getFromLocal(),
    isAuth: !!getFromLocal(),
    isStudent: getRole('student'),
    isAlumni: getRole('alumni'),
    isAdmin: getRole('admin'),
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        loginRedux: (state,action) => {
            state.user = action.payload
            state.isAuth = true
            state.isStudent = action.payload.role === "student"
            state.isAlumni = action.payload.role === 'alumni'
            state.isAdmin= action.payload.role === 'admin'
        },
        logoutRedux: (state) =>{
            state.user = null
            state.isAuth = false
            state.isStudent = false
            state.isAlumni = false
            state.isAdmin = false
        }
    }
})

export const {loginRedux, logoutRedux} = authSlice.actions

export default authSlice.reducer