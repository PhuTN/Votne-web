import React, { useEffect, useState } from 'react'; 
import { Input, Button, Radio, Space, Card, message } from 'antd';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../redux/Slicer/orderSlice';
import { jwtDecode } from 'jwt-decode';
import { fetchUserById } from '../../../redux/Slicer/userSlice';
import { validateOrder } from '../../../modules/validateOrderModule';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas
import axios from 'axios'; // Import axios
import CryptoJS from 'crypto-js';

const { TextArea } = Input;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;
`;

const FormSection = styled.div`
  width: 60%;
  max-width: 600px;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;

const OrderSummarySection = styled.div`
  width: 30%;
  min-width: 300px;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
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
  const [orderNote, setOrderNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Ship Cod'); // State quản lý phương thức thanh toán
  const [momoPaymentUrl, setMomoPaymentUrl] = useState(''); // Thêm state cho URL thanh toán Momo
  const localCartItems1 = JSON.parse(localStorage.getItem('cartItems'));

  // Hàm chuyển đổi dữ liệu giỏ hàng
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
  localStorage.removeItem('previousURL2');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Lấy thông tin người dùng từ token
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

  // Hàm tạo ID đơn hàng
  const generateOrderId = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `O${randomNumber}`;
  };

  // Hàm thay đổi phương thức thanh toán
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value === 'Chuyển Khoản') {
      fetchMomoPaymentUrl(); // Gọi API Momo khi phương thức là "Chuyển Khoản"
    } else {
      setMomoPaymentUrl('');
    }
  };
  var accessKey = 'F8BBA842ECF85'; 
  var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  var orderInfo = 'pay with MoMo';
  var partnerCode = 'MOMO';
  var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
  var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
  var requestType = "payWithMethod";
  var amount = '50000';
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData ='';
  var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
  var orderGroupId ='';
  var autoCapture =true;
  var lang = 'vi';
  // Hàm gọi API MomoCryptoJS 
 

 
  
  const fetchMomoPaymentUrl = async () => {
    try {
      // Thông tin API từ MoMo
      const accessKey = 'F8BBA842ECF85';
      const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
      const orderInfo = 'pay with MoMo';
      const partnerCode = 'MOMO';
      const redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
      const ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
      const requestType = "payWithMethod";
      const amount = '50000';
      const orderId = partnerCode + new Date().getTime();
      const requestId = orderId;
      const extraData = '';
      const lang = 'vi';
  
      // Chuỗi cần ký
      const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
      console.log("--------------------RAW SIGNATURE----------------")
      console.log(rawSignature)
  
      // Tạo chữ ký bằng HMAC-SHA256
      const signature = CryptoJS.HmacSHA256(rawSignature, secretKey).toString(CryptoJS.enc.Hex);
      console.log("--------------------SIGNATURE----------------")
      console.log(signature)
  
      // Dữ liệu yêu cầu gửi đi
      const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: true,
        extraData: extraData,
        orderGroupId: '',
        signature: signature,  // Chữ ký
      });
  
      // Gửi yêu cầu HTTP tới MoMo API
      const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      // Kiểm tra kết quả từ MoMo
      if (response.data.resultCode === 0) {
        // Lưu URL thanh toán vào state hoặc xử lý tiếp theo
        console.log('Thanh toán thành công, URL:', response.data.payUrl);
      } else {
        console.error('Không thể tạo URL thanh toán MoMo');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API MoMo:', error);
    }
  };
  

  
  

  const orderData = {
    id: generateOrderId(),
    name: user?.username,
    iduser: user?._id,
    phonumber: user?.phoneNumber,
    address: user?.address,
    email: user?.email,
    description: orderNote,
    status: 'Chờ xử lý',
    location: '',
    products: newCart,
    paymentMethod: paymentMethod, // Lấy giá trị từ Radio button
    paymentStatus: 'Chưa Thanh Toán',
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
   
    e.preventDefault();
    try {
      const result = await dispatch(createOrder(orderData)).unwrap();
      console.log('Order created successfully:', result);
      message.success('Đặt hàng thành công!');
      setTimeout(() => {
        //navigate('/account');
        //window.location.reload();
      }, 3000); // Chuyển hướng sau 3 giây
    } catch (err) {
      console.error('Error creating order:', err);
      alert('Failed to create order.');
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
            data-testid="ghichu"
          />
        </Space>

        <h3 style={{ marginTop: '20px' }}>Thanh toán</h3>
        <Radio.Group
          onChange={handlePaymentMethodChange}
          value={paymentMethod}
          style={{ width: '100%' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Radio value="Ship Cod" data-testid="shipcod">Thanh toán khi nhận hàng (COD)</Radio>
            <Radio value="Chuyển Khoản" data-testid="chuyenkhoan">Thanh toán qua Momo</Radio>
          </Space>
        </Radio.Group>

        {momoPaymentUrl && (
          <div>
            <h3>Quét mã thanh toán Momo:</h3>
            <QRCodeCanvas value={momoPaymentUrl} size={256} />
          </div>
        )}
      </FormSection>

      <OrderSummarySection>
        <OrderSummary title={`Đơn hàng (${products.length} sản phẩm)`}>
          {products.map((product) => (
            <ProductDetails key={product.id} style={{ borderBottom: '1px solid #ddd', paddingBottom: '20px' }}>
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
            <Button type="primary" style={{ flex: 1 }} onClick={handleSubmit} data-testid="dat">
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
