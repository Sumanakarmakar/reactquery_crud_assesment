import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../Api/ApiUrl'
import { toast } from "react-toastify";


const initialState = {
    UserData: {},
    status: 'idle',
    LogoutToggle: false,
    redirectReg: null,
    redirectToLogin: null,
    redirectToDashboard: null
}

export const registration = createAsyncThunk('signup', async (data) => {
    try {
        const response = await axiosInstance.post('register', data)
        const regData = response?.data
        console.log(regData,
            'xcvbn'
        )
        toast(response?.data?.message)
        return regData
    } catch (error) {
        console.log(error);
        toast(error?.response?.data?.message)
    }
})

export const login = createAsyncThunk('login', async (data) => {
    try {
        const response = await axiosInstance.post('login', data)
        const logData = response?.data
        return logData
    } catch (error) {
        console.log(error);
        toast(error?.response?.data?.message)
    }
})

export const AuthSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        //for logout
        logout: (state, { payload }) => {
            localStorage.removeItem('name')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            state.LogoutToggle = false
        },

        //for register page redirection
        regLogout: (state, { payload }) => {
            localStorage.removeItem('name')
        },

        //for checking token
        check_token: (state, { payload }) => {
            let token = localStorage.getItem('token') || sessionStorage.getItem('token')
            if (token !== null && token !== undefined && token !== '') {
                state.LogoutToggle = true
            }
        },

        //for redirection to login page
        redirectToLoginPage: (state, { payload }) => {
            state.redirectToLogin = payload
        },

        //for redirection yo home page
        redirectToHomePage: (state, { payload }) => {
            state.redirectToDashboard = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registration.pending, (state, action) => {
                state.status = 'Loading'
            })
            .addCase(registration.fulfilled, (state, { payload }) => {
                state.status = 'idle'
                console.log(payload?.data);
                if (payload?.status) {
                    localStorage.setItem("name", payload?.data?.name)
                    state.redirectToLogin = '/login'
                    toast.success(payload?.message)
                }
            })
            .addCase(registration.rejected, (state, { payload }) => {
                state.status = 'idle'
                toast.error(payload?.data?.message)
            })

            .addCase(login.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.status = 'idle'
                if (payload?.status) {
                    localStorage.setItem("name", payload?.user?.name)
                    localStorage.setItem("token", payload?.token)
                    localStorage.setItem("user", JSON.stringify(payload?.user))
                    // state.redirectToDashboard = '/'
                    state.LogoutToggle = true
                    toast.success(payload?.message)
                }
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.status = 'idle'
                state.error = payload
                console.log("login error", payload);
                toast("Wrong email or Password!")
            })
    }
})

export const {
    logout,
    regLogout,
    check_token,
    redirectToLoginPage,
    redirectToHomePage
} = AuthSlice.actions