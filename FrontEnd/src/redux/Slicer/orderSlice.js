import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Hàm lấy token từ localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Async action để lấy danh sách tất cả đơn hàng
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.get("http://localhost:8081/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action để lấy danh sách đơn hàng theo ID người dùng
export const fetchOrdersByUserId = createAsyncThunk(
  "orders/fetchOrdersByUserId",
  async (userId, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`http://localhost:8081/api/orders/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action để lấy chi tiết đơn hàng theo ID đơn hàng
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`http://localhost:8081/api/orders/by-id/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action để tạo đơn hàng mới
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.post("http://localhost:8081/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action để cập nhật đơn hàng
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ orderData }, thunkAPI) => {
    
    try {
      const token = getAuthToken();
      const response = await axios.put(`http://localhost:8081/api/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action để xóa đơn hàng
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.delete(`http://localhost:8081/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice cho orders
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [], // Danh sách đơn hàng theo userId
    ordersAll: [], // Danh sách tất cả đơn hàng
    selectedOrder: null, // Chi tiết đơn hàng được chọn
    status: "idle", // Trạng thái: idle | loading | succeeded | failed
    error: null, // Lỗi nếu có
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Lấy tất cả đơn hàng
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ordersAll = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Lấy danh sách đơn hàng theo userId
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Lấy chi tiết đơn hàng theo orderId
      .addCase(fetchOrderById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.selectedOrder = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Tạo đơn hàng
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Cập nhật đơn hàng
      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Xóa đơn hàng
      .addCase(deleteOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = state.orders.filter(order => order._id !== action.payload._id);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
