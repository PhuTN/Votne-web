import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Button, Modal, Input, message } from 'antd';
import OrderProduct from '../OrderProduct/OrderProduct';
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
  height: fit-content; 
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
  margin-top: 30px;
`;

const EditButton = styled(Button)`
  background-color: red;
  color: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  margin-left: 10px; 
  
  &:hover {
    background-color: #e65c00;
    border-color: #e65c00;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const columns = [
  {
    title: 'Đơn hàng',
    dataIndex: 'orderNumber',
    key: 'orderNumber',
  },
  {
    title: 'Ngày',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Giá tiền',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
  },
];

const OrderDetailComponent = ({ personalInfo, orderData }) => {

  console.log(  "ORDER" )
  console.log( orderData )
  console.log(  "ORDER" )
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [returnReason, setReturnReason] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Xử lý logic trả hàng ở đây
    console.log('Lý do trả hàng:', returnReason);
    setIsModalVisible(false);
    setReturnReason(''); // Reset lý do
    message.success("Hủy thành công!");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


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
        <Header>THÔNG TIN ĐƠN HÀNG</Header>
        <InfoSection>
        <InfoItem><InfoLabel>Mã đơn hàng:</InfoLabel> {personalInfo.orderId}</InfoItem>
  <InfoItem><InfoLabel>Họ tên:</InfoLabel> {personalInfo.fullName}</InfoItem>
  <InfoItem><InfoLabel>Số ĐT:</InfoLabel> {personalInfo.phoneNumber}</InfoItem>
  <InfoItem><InfoLabel>Email:</InfoLabel> {personalInfo.email}</InfoItem>
  <InfoItem><InfoLabel>Địa chỉ:</InfoLabel> {personalInfo.address}</InfoItem>
  <InfoItem><InfoLabel>Tình trạng:</InfoLabel> {personalInfo.status}</InfoItem>
  <InfoItem><InfoLabel>Ngày đặt hàng:</InfoLabel> {personalInfo.dayorder}</InfoItem>
  <InfoItem><InfoLabel>Mô tả:</InfoLabel> {personalInfo.decription}</InfoItem>
  <InfoItem><InfoLabel>Địa điểm:</InfoLabel> {personalInfo.location}</InfoItem>
  <InfoItem><InfoLabel>Phương thức thanh toán:</InfoLabel> {personalInfo.paymentMethod}</InfoItem>
  <InfoItem><InfoLabel>Trạng thái thanh toán:</InfoLabel> {personalInfo.paymentStatus}</InfoItem>
          <ButtonContainer>
         { (decodedToken.role === "Customer" && personalInfo.status !== 'Đã hủy' && <EditButton  data-testid = "huy" onClick={showModal}>Hủy</EditButton>)}
            
            {/* <EditButton>Hủy</EditButton> */}
          </ButtonContainer>
        </InfoSection>
      </InfoContainer>

      <OrderContainer>
        <Header>SẢN PHẨM</Header>
        <InfoSection>
          <OrderProduct orderData2= {orderData} />
        </InfoSection>
      </OrderContainer>

      <Modal
        title="Nhập lý do trả hàng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered // Đảm bảo Modal nằm ở giữa màn hình
        okButtonProps={{ "data-testid": "ok" }}
      >
        <Input.TextArea
          rows={4}
          value={returnReason}
          onChange={(e) => setReturnReason(e.target.value)}
          placeholder="Nhập lý do hủy đơn..."
           data-testid = "liDo"
        />
      </Modal>
    </AccountInfoWrapper>
  );
};

export default OrderDetailComponent;
