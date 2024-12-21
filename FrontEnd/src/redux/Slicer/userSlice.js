import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Lấy token từ localStorage (hoặc Redux Store nếu bạn lưu token ở đó)
const getAuthToken = () => {
  return localStorage.getItem("token"); // Hoặc từ Redux store nếu bạn sử dụng Redux để lưu token
};

// API call để đăng ký người dùng
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8081/api/users/register", userData);
      console.log(response)
      return response.data; // Trả về dữ liệu người dùng sau khi đăng ký thành công
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// API call để xác thực người dùng qua email
export const verifyUser = createAsyncThunk(
  "user/verifyUser",
  async ({ email, verificationCode }, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8081/api/users/verify", { email, verificationCode });
      return response.data; // Trả về thông báo xác thực thành công
    } catch (err) {
      return "err";
    }
  }
);

// API call để gửi lại mã xác thực
export const resendVerificationCode = createAsyncThunk(
  "user/resendVerificationCode",
  async (email, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8081/api/users/resend-code", { email });
      return response.data; // Trả về thông báo gửi lại mã xác thực thành công
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// API call để lấy thông tin người dùng theo ID
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`http://localhost:8081/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      return response.data; // Trả về dữ liệu người dùng theo ID
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// API call để cập nhật thông tin người dùng
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, userData }, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `http://localhost:8081/api/users/${userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      return response.data; // Trả về thông tin người dùng sau khi cập nhật thành công
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// API call để thay đổi mật khẩu người dùng
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ userId, currentPassword, newPassword }, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `http://localhost:8081/api/users/${userId}/password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      return response.data; // Trả về thông tin người dùng sau khi thay đổi mật khẩu thành công
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// API call để lấy danh sách tất cả người dùng
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.get("http://localhost:8081/api/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      return response.data; // Trả về danh sách tất cả người dùng
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// API call để cập nhật thông tin cho tất cả người dùng
export const updateAllUsers = createAsyncThunk(
  "user/updateAllUsers",
  async (userData, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        "http://localhost:8081/api/users",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      return response.data; // Trả về thông báo thành công sau khi cập nhật tất cả người dùng
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// API call để gửi yêu cầu quên mật khẩu
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8081/api/users/forgot-password", { email });
      return response.data; // Trả về thông báo gửi mã xác thực thành công
    } catch (err) {
      return  { er: "error" ,err};
    }
  }
);

// API call để đặt lại mật khẩu
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ email, resetCode, newPassword }, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8081/api/users/reset-password", { email, resetCode, newPassword });
      return response.data; // Trả về thông báo thay đổi mật khẩu thành công
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// API call để thêm nhân viên
export const addStaff = createAsyncThunk(
  "user/addStaff",
  async (staffData, thunkAPI) => {
    try {
      const token = getAuthToken(); // Lấy token từ localStorage hoặc Redux store
      const response = await axios.post("http://localhost:8081/api/users/addStaff", staffData, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      return response.data; // Trả về dữ liệu nhân viên đã được thêm thành công
    } catch (err) {
      return "er";
    }
  }
);


// Slice để quản lý trạng thái của người dùng
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // Dữ liệu người dùng hiện tại
    users: [], // Danh sách tất cả người dùng
    status: "idle", // Trạng thái tải dữ liệu (idle | loading | succeeded | failed)
    error: null, // Lỗi nếu có
    verificationStatus: "idle", // Trạng thái xác thực
    verificationError: null, // Lỗi khi xác thực
    resetPasswordStatus: "idle", // Trạng thái cho reset mật khẩu
    resetPasswordError: null,    // Lỗi cho reset mật khẩu
    addStaffStatus: "idle",  // Trạng thái cho thêm nhân viên
    addStaffError: null,     // Lỗi khi thêm nhân viên
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addStaff.pending, (state) => {
      state.addStaffStatus = "loading"; 
      state.addStaffError = null;
    })
    .addCase(addStaff.fulfilled, (state, action) => {
      state.addStaffStatus = "succeeded";
      // Có thể thêm nhân viên mới vào danh sách nếu cần
      state.users.push(action.payload.user); // Giả sử payload trả về có thông tin nhân viên
    })
    .addCase(addStaff.rejected, (state, action) => {
      state.addStaffStatus = "failed";
      state.addStaffError = action.payload; 
    })
    .addCase(forgotPassword.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(forgotPassword.fulfilled, (state, action) => {
      state.status = "succeeded";
      // Lưu thông báo thành công
    })
    .addCase(forgotPassword.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })

    // Xử lý action resetPassword
    .addCase(resetPassword.pending, (state) => {
      state.resetPasswordStatus = "loading";
      state.resetPasswordError = null;
    })
    .addCase(resetPassword.fulfilled, (state, action) => {
      state.resetPasswordStatus = "succeeded";
      // Lưu thông báo thành công
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.resetPasswordStatus = "failed";
      state.resetPasswordError = action.payload;
    })
      // Xử lý action createUser
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Lưu dữ liệu người dùng vào state
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi nếu có
      })

      // Xử lý action verifyUser
      .addCase(verifyUser.pending, (state) => {
        state.verificationStatus = "loading";
        state.verificationError = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.verificationStatus = "succeeded";
        state.user = action.payload; // Cập nhật lại thông tin người dùng
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.verificationStatus = "failed";
        state.verificationError = action.payload; // Lưu lỗi khi xác thực
      })

      // Xử lý action resendVerificationCode
      .addCase(resendVerificationCode.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(resendVerificationCode.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Thông báo đã gửi lại mã xác thực
      })
      .addCase(resendVerificationCode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi khi gửi lại mã
      })

      // Xử lý action fetchUserById
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Lưu dữ liệu người dùng vào state
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi nếu có
      })

      // Xử lý action updateUser
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Cập nhật lại thông tin người dùng
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi nếu có
      })

      // Xử lý action updatePassword
      .addCase(updatePassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Không cần phải cập nhật lại user nếu chỉ thay đổi mật khẩu
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi nếu có
      })

      // Xử lý action fetchAllUsers
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload; // Lưu danh sách người dùng vào state
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi nếu có
      })

      // Xử lý action updateAllUsers
      .addCase(updateAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Cập nhật thành công không cần phải thay đổi thêm gì
      })
      .addCase(updateAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi nếu có
      });
  },
});

export default userSlice.reducer;
