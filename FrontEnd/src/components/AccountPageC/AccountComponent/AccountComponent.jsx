import React from 'react';
import styled from 'styled-components';
import { Table, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const AccountInfoWrapper = styled.div`
  background-color: #FFFFFF;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    width: 1200px;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 10px;
  height: auto; 

  @media (min-width: 768px) {
    margin-right: 20px;
    height: 320px;
  }
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
  font-size: 16px;
  font-weight: bold;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 18px;
    text-align: left;
  }
`;

const InfoSection = styled.div`
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  padding: 5px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
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
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #e65c00;
    border-color: #e65c00;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  @media (min-width: 768px) {
    width: auto;
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
    render: (date) => new Date(date).toLocaleString(),
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
    render: (price) => `${price.toLocaleString()} VNĐ`,
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
];

const AccountComponent = ({ personalInfo, orderData }) => {
  const navigate = useNavigate();

  const formattedOrderData = orderData
  .map((order) => {
    const totalPrice = order.products.reduce((sum, product) => sum + product.price * product.number, 0);
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
    };
  })
  .reverse();


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
          <Link to="/wishlist" style={{ textDecoration: 'none' ,marginTop:'20px'}}>
            <EditButton >DANH SÁCH YÊU THÍCH</EditButton>
          </Link>
        </InfoSection>
      </InfoContainer>

      <OrderContainer>
        <Header>ĐƠN HÀNG CỦA BẠN</Header>
        <InfoSection>
          <Table
            dataSource={formattedOrderData}
            columns={columns}
            pagination={{ pageSize: 7 }}
            rowKey={(record) => record._id}
            locale={{ emptyText: 'Không có đơn hàng' }}
            scroll={{ x: 1000 }}
            onRow={(record) => ({
              onClick: () => navigate(`/order-detail/${record._id}`),
            })}
          />
        </InfoSection>
      </OrderContainer>
    </AccountInfoWrapper>
  );
};

export default AccountComponent;
