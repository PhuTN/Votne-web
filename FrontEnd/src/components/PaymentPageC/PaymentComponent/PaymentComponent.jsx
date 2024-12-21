import React, { useEffect, useState } from 'react';
import { Input, Button, Radio, Space, Card, message } from 'antd';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../redux/Slicer/orderSlice';
import {jwtDecode} from 'jwt-decode';
import { fetchUserById } from '../../../redux/Slicer/userSlice';
import { validateOrder } from '../../../modules/validateOrderModule';

const { TextArea } = Input;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const FormSection = styled.div`
  width: 60%;
  max-width: 600px;
  margin-right: 20px;
`;

const OrderSummarySection = styled.div`
  width: 30%;
  min-width: 300px;
`;

const OrderSummary = styled(Card)`
  margin-top: 20px;
`;

const PaymentButton = styled(Button)`
  width: 100%;
  margin: 5px 0;
`;

const ProductImageContainer = styled.div`
  display: inline-block;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
`;

const PaymentComponent = ({ products }) => {
  const [orderNote, setOrderNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Ship Cod"); // Thêm state quản lý phương thức thanh toán
  const localCartItems1 = JSON.parse(localStorage.getItem("cartItems"));

  function transformData(inputArray) {
    return inputArray?.map((item) => ({
      idproduct: item._id,
      colorid: item.colorid,
      idattributevalue: item.attributeId,
      price: item.price,
      number: item.quantity,
    }));
  }

  const newCart = transformData(localCartItems1);
  const totalPrice = products?.reduce((acc, product) => acc + product.price * product.quantity, 0);
  localStorage.removeItem("previousURL2");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken?.userId) {
          dispatch(fetchUserById(decodedToken.userId));
        } else {
          console.warn('Không tìm thấy userId trong token.');
        }
      } catch (error) {
        console.error('Lỗi khi giải mã token:', error);
      }
    } else {
      console.warn('Không tìm thấy token trong LocalStorage.');
    }
  }, [dispatch]);

  const generateOrderId = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `O${randomNumber}`;
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const orderData = {
    id: generateOrderId(),
    name: user?.username,
    iduser: user?._id,
    phonumber: user?.phoneNumber,
    address: user?.address,
    email: user?.email,
    description: orderNote,
    status: "Chờ xử lý",
    location: "",
    products: newCart,
    paymentMethod: paymentMethod, // Lấy giá trị từ Radio button
    paymentStatus: "Chưa Thanh Toán",
  };
  console.log(orderNote)
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    
    if(!validateOrder(user?.username,user?.phoneNumber,user?.email,user?.address,  paymentMethod,products.length,orderNote )){
      return;
    }
    e.preventDefault();
    try {
      const result = await dispatch(createOrder(orderData)).unwrap();
      console.log("Order created successfully:", result);
      message.success("Đặt hàng thành công!");
      setTimeout(() => {
        navigate('/account');
        window.location.reload();
      }, 3000); // Chuyển hướng sau 3 giây
      
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Failed to create order.");
    }
  };

  return (
    <Container>
      <FormSection>
        <h2>Vợt nè</h2>
        <h3>Thông tin nhận hàng</h3>
        <Space direction="vertical" style={{ width: '100%' }}>
          <span>Tên: {user?.username}</span>
          <span>Số điện thoại: {user?.phoneNumber}</span>
          <span>Địa chỉ: {user?.address}</span>
          <span>Email: {user?.email}</span>
          <TextArea
            rows={2}
            placeholder="Ghi chú đơn hàng (tùy chọn)"
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
            data-testid = "ghichu"
          />
        </Space>

        <h3 style={{ marginTop: '20px' }}>Thanh toán</h3>
        <Radio.Group
          onChange={handlePaymentMethodChange}
          value={paymentMethod}
          style={{ width: '100%' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Radio value="Ship Cod" data-testid = "shipcod">Thanh toán khi nhận hàng (COD)</Radio>
            <Radio value="Chuyển Khoản" data-testid = "chuyenkhoan">Thanh toán qua ngân hàng</Radio>
          </Space>
        </Radio.Group>
      </FormSection>

      <OrderSummarySection>
        <OrderSummary title={`Đơn hàng (${products.length} sản phẩm)`}>
          {products.map((product) => (
            <ProductDetails key={product.id}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ProductImageContainer>
                  <ProductImage src={product.image} alt={product.name} />
                </ProductImageContainer>
                <div style={{ marginLeft: '10px' }}>
                  <p>{product.name}</p>
                  <h3>{product.price.toLocaleString('vi-VN')} ₫</h3>
                </div>
              </div>
              <p style={{ margin: 0 }}>Số lượng: {product.quantity}</p>
            </ProductDetails>
          ))}
          <h3>Tổng cộng: {totalPrice.toLocaleString('vi-VN')} ₫</h3>
          <Space style={{ width: '100%' }}>
            <Link to="/cart" style={{ textDecoration: 'none' }}>
              <Button style={{ flex: 1 }}>Sửa giỏ hàng</Button>
            </Link>
            <Button type="primary" style={{ flex: 1 }} onClick={handleSubmit} data-testid = "dat">
              ĐẶT HÀNG
            </Button>
          </Space>
          <p style={{ fontSize: '12px', marginTop: '10px' }}>
            - Giá trên chưa bao gồm phí vận chuyển. Phí vận chuyển sẽ được nhân viên báo khi xác nhận đơn hàng.
            <br />
            - Thời gian xử lý đơn hàng: Từ 8h00 - 17h thứ 2 đến thứ 7.
          </p>
        </OrderSummary>
      </OrderSummarySection>
    </Container>
  );
};

export default PaymentComponent;

