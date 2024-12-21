import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action: Đăng ký người dùng
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8081/api/auth/register", userData);
      return response.data; // Kết quả từ API đăng ký
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action: Đăng nhập người dùng
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8081/api/auth/login", loginData);
      return response.data; // Kết quả từ API đăng nhập (token)
    } catch (err) {
      return "error";
    }
  }
);

// Slice quản lý trạng thái Auth
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Thông tin người dùng (nếu đã đăng nhập)
    token: null, // Token từ đăng nhập
    status: "idle", // loading status: idle | loading | succeeded | failed
    error: null, // Lỗi nếu có
  },
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý đăng ký
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Xử lý đăng nhập
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token; // Lưu token từ response
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions; // Action để logout
export default authSlice.reducer;
