import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch all locations
export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8081/api/locations");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action to fetch a location by ID
export const fetchLocationById = createAsyncThunk(
  "locations/fetchLocationById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/locations/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action to create a new location
export const createLocation = createAsyncThunk(
  "locations/createLocation",
  async (locationData, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8081/api/locations", locationData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action to update a location by ID
export const updateLocation = createAsyncThunk(
  "locations/updateLocation",
  async ({ id, updateData }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:8081/api/locations/${id}`, updateData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action to delete a location by ID
export const deleteLocation = createAsyncThunk(
  "locations/deleteLocation",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:8081/api/locations/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// The slice to manage locations state
const locationSlice = createSlice({
  name: "locations",
  initialState: {
    locations: [],
    status: "idle",
    error: null,
    selectedLocation: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchLocationById.fulfilled, (state, action) => {
        state.selectedLocation = action.payload;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.locations.push(action.payload);
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        const index = state.locations.findIndex(loc => loc.id === action.payload.id);
        if (index !== -1) {
          state.locations[index] = action.payload;
        }
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.locations = state.locations.filter(loc => loc.id !== action.payload);
      });
  },
});

export default locationSlice.reducer;
