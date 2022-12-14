import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk(
	'posts/fetchUserData',
	async params => {
		const { data } = await axios.post('/auth/login', params);

		return data;
	}
);

const initialState = {
	data: null,
	status: 'loading',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	extraReducers: {
		[fetchAuth.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchAuth.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = 'loaded';
		},
		[fetchAuth.rejected]: state => {
			state.data = null;
			state.status = 'error';
		},
	},
});

export const selectIsAuth = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
