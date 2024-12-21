import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Cài thư viện jwt-decode

const ProtecedRoute = ({ children, allowedRoles }) => {
  const getAuthToken = () => {
    return localStorage.getItem("token"); // Lấy token từ localStorage
  };

  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/login" />; // Chuyển hướng nếu không có token
  }

  try {
    const decodedToken = jwtDecode(token); // Giải mã token
    const userRole = decodedToken.role; // Lấy role từ token

    if (!allowedRoles.includes(userRole)) {
      return <div>Bạn không có quyền vào trang này</div>; // Thông báo nếu không có quyền
    }

    return children; // Hiển thị nội dung nếu hợp lệ
  } catch (error) {
    console.error("Token không hợp lệ", error);
    return <Navigate to="/login" />;
  }
};

export default ProtecedRoute;
