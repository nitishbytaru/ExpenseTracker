import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!localStorage.getItem("userId"),
  profile: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { setLoading, setIsLoggedIn, setProfile } = authSlice.actions;

export default authSlice.reducer;
