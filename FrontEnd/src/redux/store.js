import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slicer/productSlice";
import attributeReducer from "./Slicer/attributeSlice";
import checkboxReducer from "./Slicer/checkboxSlice"; // Import checkbox reducer
import authReducer from "./Slicer/authSlice"; // Import auth reducer
import userReducer from "./Slicer/userSlice"; // Import user reducer
import cartReducer from "./Slicer/cartSlice"; // Import cart reducer
import refreshReducer from "./Slicer/refreshReducer"; // Import refresh reducer
import orderReducer from "./Slicer/orderSlice"; // Import order reducer
import uploadReducer from "./Slicer/attributeSlice"; // Import order reducer

export const store = configureStore({
  reducer: {
    products: productReducer, // Reducer cho sản phẩm
    attributes: attributeReducer, // Reducer cho thuộc tính sản phẩm
    checkbox: checkboxReducer, // Reducer cho checkbox
    auth: authReducer, // Reducer cho thông tin đăng nhập
    user: userReducer, // Reducer cho thông tin người dùng
    cart: cartReducer, // Reducer cho giỏ hàng
    refresh: refreshReducer, // Reducer cho refresh
    orders: orderReducer, // Reducer cho đơn hàng
    upload:uploadReducer,
  },
});

export default store;
