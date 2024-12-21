import React from 'react';
import styled from 'styled-components';
import { Table, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AccountInfoWrapper = styled.div`
  background-color: #FFFFFF;
  padding: 20px;
  width: 1200px;
  display: flex;
`;

const InfoContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 10px;
  height: 250px; 
`;

const OrderContainer = styled.div`
  flex: 2;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 10px;
`;

const Header = styled.div`
  background-color: #1DA0F1;
  color: #FFFFFF;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const InfoSection = styled.div`
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  padding: 5px;
`;

const InfoLabel = styled.span`
  font-weight: bold;
`;

const EditButton = styled(Button)`
  background-color: #1DA0F1;
  border-color: #1DA0F1;
  color: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  margin-top: 30px;
  
  &:hover {
    background-color: #e65c00;
    border-color: #e65c00;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const columns = [
  {
    title: 'Mã Đơn Hàng',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Ngày Đặt',
    dataIndex: 'dayorder',
    key: 'dayorder',
    render: (date) => new Date(date)?.toLocaleString(),
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tổng Giá',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    render: (price) => `${price?.toLocaleString()} VNĐ`,
  },
  {
    title: 'Trạng Thái',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Số Điện Thoại',
    dataIndex: 'phonumber',
    key: 'phonumber',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Mô Tả',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Phương Thức Thanh Toán',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
  },
  {
    title: 'Trạng Thái Thanh Toán',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
  },
  {
    title: "Lý do hủy khách hàng",
    dataIndex: "location",
    key: "location",
   
  },
  {
    title: "Lý do hủy của shop",
    dataIndex: "cancelReason",
    key: "cancelReason",
   
  },
];

const AccountComponent = ({ personalInfo, orderData }) => {
  const navigate = useNavigate();
console.log(orderData)
  const formattedOrderData = orderData.map((order) => {
    const totalPrice = order?.products?.reduce((sum, product) => sum + product.price * product.number, 0);
    return { 
      id: order.id,
      dayorder: order.dayorder,
      address: order.address,
      totalPrice,
      status: order.status,
      _id: order._id,
      phonumber: order.phonumber,
      email: order.email,
      description: order.description,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      location: order.location,
      cancelReason: order.cancelReason,
    };
    
  });

  const token = localStorage.getItem("token");
  
  let decodedToken ={}
    if (token) {
      decodedToken = jwtDecode(token);
     // console.log("Thông tin giải mã token:",decodedToken );
    } else {
      console.log("Không có token để giải mã.");
    }
  

  return (
    <AccountInfoWrapper>
      <InfoContainer>
        <Header>THÔNG TIN TÀI KHOẢN</Header>
        <InfoSection>
          <InfoItem>
            <InfoLabel>Họ tên:</InfoLabel> {personalInfo?.username}
          </InfoItem>
          <InfoItem>
            <InfoLabel>Số ĐT:</InfoLabel> {personalInfo?.phoneNumber}
          </InfoItem>
          <InfoItem>
            <InfoLabel>Địa chỉ:</InfoLabel> {personalInfo?.address}
          </InfoItem>
          <Link to="/account/account-info" style={{ textDecoration: 'none' }}>
            <EditButton>SỬA THÔNG TIN CÁ NHÂN</EditButton>
          </Link>
        </InfoSection>
      </InfoContainer>
{(decodedToken.role === "Customer" &&
      <OrderContainer>
        <Header>ĐƠN HÀNG CỦA BẠN</Header>
        <InfoSection>
          <Table
            dataSource={formattedOrderData}
            columns={columns}
            pagination={{ pageSize: 7 }}
            rowKey={(record) => record._id}
            locale={{ emptyText: 'Không có đơn hàng' }}
            onRow={(record) => ({
              onClick: () => navigate(`/order-detail/${record._id}`),
            })}
          />
        </InfoSection>
      </OrderContainer>
)}
    </AccountInfoWrapper>
  );
};

export default AccountComponent;
