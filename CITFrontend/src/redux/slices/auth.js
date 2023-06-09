import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk(
    "auth/fetchUserData",
    async (params) => {
        const { data } = await axios.post("/auth/login", params);

        return data;
    }
);

export const fetchAuthMe = createAsyncThunk(
    "auth/fetchAuthMe",
    async (params) => {
        const { data } = await axios.get("/auth/me");

        return data;
    }
);

const initialState = {
    data: null,
    status: "loading",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            window.localStorage.setItem("token", null);
            state.data = null;
        },
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = "loading";
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = "loaded";
        },
        [fetchAuth.rejected]: (state) => {
            state.data = null;
            state.status = "error";
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = "loading";
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = "loaded";
        },
        [fetchAuthMe.rejected]: (state) => {
            state.data = null;
            state.status = "error";
        },
    },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
