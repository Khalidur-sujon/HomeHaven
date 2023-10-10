import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	loading: false,
	error: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		signInStart: (state) => {
			state.loading = true;
		},
		signInSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
			state.error = false;
		},
		signInFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		signOut: (state) => {
			state.currentUser = null;
			state.loading = false;
			state.error = false;
		},
		userProfileUpdateStart: (state) => {
			state.loading = true;
		},
		userProfileUpdateSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
			state.error = false;
		},
		userProfileUpdateFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const {
	signInStart,
	signInSuccess,
	signInFailure,
	signOut,
	userProfileUpdateStart,
	userProfileUpdateSuccess,
	userProfileUpdateFailure,
} = userSlice.actions;
export default userSlice.reducer;
