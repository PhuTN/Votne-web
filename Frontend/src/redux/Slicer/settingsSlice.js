import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async actions
export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8081/api/settings");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async ({ id, settingsData }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:8081/api/settings/${id}`, settingsData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateSettings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.settings = state.settings.map((s) =>
          s._id === action.payload._id ? action.payload : s
        );
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default settingsSlice.reducer;
