import React, { useEffect, useState } from 'react';
import AccountComponent from '../../components/AccountPageC/AccountComponent/AccountComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../../redux/Slicer/userSlice';
import { fetchOrdersByUserId } from '../../redux/Slicer/orderSlice';
import {jwtDecode} from 'jwt-decode';

const AccountPage = () => {
  const token = localStorage.getItem('token'); // Lấy token từ LocalStorage
  let decodedToken = {};
  if (token) {
    decodedToken = jwtDecode(token);
  } else {
    console.log('Không có token để giải mã.');
  }

  const dispatch = useDispatch();
  const { user, status: userStatus } = useSelector((state) => state.user);
  const { orders, status: ordersStatus } = useSelector((state) => state.orders);

  const [userFetched, setUserFetched] = useState(false);
  const [ordersFetched, setOrdersFetched] = useState(false);

  // Fetch user data
  useEffect(() => {
    if (decodedToken?.userId) {
      dispatch(fetchUserById(decodedToken.userId))
        .then((action) => {
          setUserFetched(true);
        })
    }
  }, [dispatch, decodedToken?.userId]);

  // Fetch order data
  useEffect(() => {
    if (decodedToken?.userId ) {
      dispatch(fetchOrdersByUserId(decodedToken.userId))
      .then((action) => {
        setOrdersFetched(true);
      })
    }
  }, [dispatch, userStatus, decodedToken?.userId]);

  // Theo dõi trạng thái fetch
  useEffect(() => {
    if (userStatus === 'succeeded') {
      setUserFetched(true);
    }
  }, [userStatus]);

  useEffect(() => {
    if (ordersStatus === 'succeeded') {
      setOrdersFetched(true);
    }
  }, [ordersStatus]);

  // Re-render component khi dữ liệu được fetch thành công
  const shouldRender = userFetched && ordersFetched;
  console.log("DU" + orders)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '30px auto 50px auto',
        minHeight: '100vh',
      }}
    >
    
        <AccountComponent personalInfo={user} orderData={orders} />
      
    </div>
  );
};

export default AccountPage;
