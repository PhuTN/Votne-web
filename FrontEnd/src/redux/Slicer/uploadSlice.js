import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API endpoint cho việc upload file
const UPLOAD_API_URL = "http://localhost:8081/api/upload";

// AsyncThunk để xử lý việc upload file
export const uploadFile = createAsyncThunk(
  "upload/uploadFile",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("image", file); // Gửi file dưới key "image" (phù hợp với multer.single('image'))

      const response = await axios.post(UPLOAD_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // Trả về kết quả từ server
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice để quản lý trạng thái upload
const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    file: null, // Thông tin file đã upload
    status: "idle", // Trạng thái: idle | loading | succeeded | failed
    error: null, // Lỗi (nếu có)
  },
  reducers: {}, // Không có reducers đồng bộ cho upload
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.file = action.payload; // Lưu thông tin file từ response
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi
      });
  },
});

export default uploadSlice.reducer;
