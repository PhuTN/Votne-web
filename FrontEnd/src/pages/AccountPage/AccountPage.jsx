import React, {useEffect, useState} from 'react'
import AccountComponent from '../../components/AccountPageC/AccountComponent/AccountComponent'
import { AppContexts } from '../../contexts/AppContexts';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../../redux/Slicer/userSlice';
import { jwtDecode } from 'jwt-decode';
import { fetchOrdersByUserId } from '../../redux/Slicer/orderSlice';
const AccountPage = () => {

      

  const token = localStorage.getItem("token"); // Lấy token từ LocalStorage
  let decodedToken ={}
  if (token) {
    decodedToken = jwtDecode(token);
   // console.log("Thông tin giải mã token:",decodedToken );
  } else {
    console.log("Không có token để giải mã.");
  }

  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserById(decodedToken?.userId    )); // Lấy thông tin người dùng theo ID
  }, [dispatch, decodedToken?.userId]);
 
  const orders = useSelector((state) => state.orders.orders); // Lấy danh sách đơn hàng từ store

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrdersByUserId(decodedToken?.userId)); // Gửi action để lấy dữ liệu orders
    }
  }, [status, decodedToken?.userId, dispatch]);
  console.log("hello")
  console.log(decodedToken)
  console.log("hello")
  return (
    <div style={{width: '1200px', 
                margin: '30px auto 50px auto', }}>
        <AccountComponent personalInfo={user} orderData={orders} />
    </div>
  )
}

export default AccountPage