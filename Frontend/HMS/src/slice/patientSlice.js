// slice/doctorSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPatient } from "../services/operations/patientProfileAPI";

export const fetchPatient = createAsyncThunk("patient/fetchPatient", async (profileId) => {
  const response = await getPatient(profileId);
  console.log(response);
  return response;
});

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    patient: null,
    loading: false,
    error: null,
  },
  reducers: {
    setPatient: (state, action) => {
      state.patient = action.payload;
    },
    clearPatient: (state) => {
      state.patient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patient = action.payload;
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPatient, clearPatient } = patientSlice.actions;
export default patientSlice.reducer;
