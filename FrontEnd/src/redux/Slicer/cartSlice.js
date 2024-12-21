import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Hàm lấy token từ localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Async action để lấy giỏ hàng của người dùng theo ID
export const fetchCartByUserId = createAsyncThunk(
  "cart/fetchCartByUserId",
  async (userId, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`http://localhost:8081/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action để tạo giỏ hàng mới
export const createCart = createAsyncThunk(
  "cart/createCart",
  async (cartData, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.post("http://localhost:8081/api/cart", cartData, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action để cập nhật giỏ hàng
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ cartId, cartData }, thunkAPI) => {
    try {
        console.log("HELLO1")
        console.log(cartData)
      const token = getAuthToken();
      const response = await axios.put(`http://localhost:8081/api/cart/${cartId}`, cartData, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action để xóa giỏ hàng
export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (cartId, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.delete(`http://localhost:8081/api/cart/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice cho cart
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null, // Giỏ hàng của người dùng
    status: "idle", // Trạng thái: idle | loading | succeeded | failed
    error: null, // Lỗi nếu có
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartByUserId.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCartByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(fetchCartByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.cart = null;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
