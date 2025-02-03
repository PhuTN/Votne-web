import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch all reviews
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8081/api/reviews");
      return response.data; // Returns the list of reviews
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action to fetch a review by ID
export const fetchReviewById = createAsyncThunk(
  "reviews/fetchReviewById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/reviews/${id}`);
      return response.data; // Returns the review details
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action to add a new review
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (review, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8081/api/reviews", review);
      return response.data; // Returns the newly created review
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action to update a review
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:8081/api/reviews/${id}`, updatedData);
      return response.data; // Returns the updated review
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action to delete a review
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/reviews/${id}`);
      return { id, message: response.data.message }; // Returns the ID of deleted review
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchReviewsByProductId = createAsyncThunk(
    "reviews/fetchReviewsByProductId",
    async (productId, thunkAPI) => {
      try {
        const response = await axios.get(`http://localhost:8081/api/reviews/product/${productId}`);
        return response.data; // Returns the list of reviews for the product
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
      }
    }
  );
  

// The slice to manage the reviews state
const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [], // Store the list of reviews
    currentReview: null, // Store the details of a single review
    status: "idle", // loading status: idle | loading | succeeded | failed
    error: null, // For storing any error messages
    updateStatus: "idle", // Status for updates
    updateError: null, // Error for updates
    deleteStatus: "idle", // Status for deletions
    deleteError: null, // Error for deletions
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetchReviews
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload; // The reviews list from the response
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Any error message from the API
      })

      // Handling fetchReviewById
      .addCase(fetchReviewById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentReview = action.payload; // The review details from the response
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handling addReview
      .addCase(addReview.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.reviews.push(action.payload.review); // Add the new review to the list
      })
      .addCase(addReview.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })

      // Handling updateReview
      .addCase(updateReview.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.reviews.findIndex((r) => r.id === action.payload.review.id);
        if (index !== -1) {
          state.reviews[index] = action.payload.review; // Update the review in the list
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })

      // Handling deleteReview
      .addCase(deleteReview.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.reviews = state.reviews.filter((r) => r.id !== action.payload.id); // Remove the deleted review
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload;
      })
      .addCase(fetchReviewsByProductId.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload; // The reviews list for the specific product
      })
      .addCase(fetchReviewsByProductId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  
  },
});

export default reviewSlice.reducer;
