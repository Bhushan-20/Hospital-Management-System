import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "jwt",
  initialState: token || null,
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      localStorage.setItem("token", token);
      return token; // just store the raw token
    },
    removeToken: () => {
      localStorage.removeItem("token");
      return null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
