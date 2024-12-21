import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action để gọi API lấy sản phẩm gần đây
export const fetchRecentProducts = createAsyncThunk(
  "products/fetchRecentProducts",
  async (types, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8081/api/products/recent", {
        params: { types },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action để gọi API lấy sản phẩm theo loại
export const fetchProductsByType = createAsyncThunk(
  "products/fetchProductsByType",
  async (type, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8081/api/products/by-type", {
        params: { type },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action để gọi API lấy sản phẩm theo id
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/products/id`, {
        params: { id },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action để cập nhật thông tin sản phẩm
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:8081/api/products/${id}`, data);
      return response.data; // Trả về sản phẩm đã cập nhật
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action mới: gọi API lấy sản phẩm nổi bật
export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8081/api/products/featured");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action mới: gọi API tìm kiếm sản phẩm theo tên
export const searchProductsByName = createAsyncThunk(
  "products/searchProductsByName",
  async (search, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8081/api/products/search", {
        params: { search },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action để tạo một sản phẩm mới (chỉ nhận type)
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (type, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8081/api/products", {
        type,
      });
      return response.data; // Trả về _id của sản phẩm mới tạo
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // Danh sách sản phẩm
    product: null, // Sản phẩm chi tiết
    featuredProducts: [], // Danh sách sản phẩm nổi bật
    productname: [], // Kết quả tìm kiếm sản phẩm theo tên
    newProductId: null, // ID của sản phẩm mới tạo
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý fetchRecentProducts
      .addCase(fetchRecentProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRecentProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchRecentProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Xử lý fetchProductsByType
      .addCase(fetchProductsByType.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsByType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductsByType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Xử lý fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Xử lý updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        if (state.product && state.product.id === updatedProduct.id) {
          state.product = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Xử lý createProduct
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newProductId = action.payload.productId; // Lưu _id của sản phẩm mới
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Xử lý fetchFeaturedProducts
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.featuredProducts = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Xử lý searchProductsByName
      .addCase(searchProductsByName.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(searchProductsByName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productname = action.payload;
      })
      .addCase(searchProductsByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
