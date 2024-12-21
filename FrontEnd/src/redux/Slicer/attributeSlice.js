import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch attributes by type
export const fetchAttributesByType = createAsyncThunk(
  "attributes/fetchAttributesByType",
  async (type, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/attributes/type/${type}`);
      return response.data; // Returns the list of attributes
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action to fetch attributes by name "Thương hiệu"
export const fetchAttributesByBrand = createAsyncThunk(
  "attributes/fetchAttributesByBrand",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8081/api/attributes/name/brand");
      return response.data; // Returns the list of attributes for "Thương hiệu"
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action to bulk update attributes
export const bulkUpdateAttributes = createAsyncThunk(
  "attributes/bulkUpdateAttributes",
  async (attributes, thunkAPI) => {
   
    console.log(attributes)
    try {
      const response = await axios.put("http://localhost:8081/api/attributes/bulk-update", attributes);
      return response.data; // Returns success message
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// The slice to manage the attributes state
const attributeSlice = createSlice({
  name: "attributes",
  initialState: {
    attributes: [], // Store the list of attributes
    status: "idle", // loading status: idle | loading | succeeded | failed
    error: null, // For storing any error messages
    updateStatus: "idle", // Status for bulk update
    updateError: null, // Error for bulk update
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetchAttributesByType
      .addCase(fetchAttributesByType.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAttributesByType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.attributes = action.payload; // The attributes list from the response
      })
      .addCase(fetchAttributesByType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Any error message from the API
      })

      // Handling fetchAttributesByBrand
      .addCase(fetchAttributesByBrand.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAttributesByBrand.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.attributes2 = action.payload; // The attributes list for "Thương hiệu"
      })
      .addCase(fetchAttributesByBrand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Any error message from the API
      })

      // Handling bulkUpdateAttributes
      .addCase(bulkUpdateAttributes.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(bulkUpdateAttributes.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        // Optionally update state or notify success
      })
      .addCase(bulkUpdateAttributes.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload; // Any error message from the API
      });
  },
});

export default attributeSlice.reducer;
