// slice/doctorSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoctor } from "../services/operations/doctorProfileAPI";

export const fetchDoctor = createAsyncThunk("doctor/fetchDoctor", async (profileId) => {
  const response = await getDoctor(profileId);
  console.log(response);
  return response;
});

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctor: null,
    loading: false,
    error: null,
  },
  reducers: {
    setDoctor: (state, action) => {
      state.doctor = action.payload;
    },
    clearDoctor: (state) => {
      state.doctor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(fetchDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setDoctor, clearDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
