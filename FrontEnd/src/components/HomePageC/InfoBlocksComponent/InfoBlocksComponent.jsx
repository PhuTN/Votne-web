import React from 'react';
import { FaTruck, FaShieldAlt, FaCreditCard, FaSyncAlt } from 'react-icons/fa'; 
import { Container, Item, IconWrapper, Title, Description } from './style';

const InfoBlocksComponent = () => {
  return (
    <Container>
      <Item>
        <IconWrapper><FaTruck /></IconWrapper>
        <Title>Vận chuyển TOÀN QUỐC</Title>
        <Description>Thanh toán khi nhận hàng</Description>
      </Item>

      <Item>
        <IconWrapper><FaShieldAlt /></IconWrapper>
        <Title>Bảo đảm chất lượng</Title>
        <Description>Sản phẩm bảo đảm chất lượng.</Description>
      </Item>

      <Item>
        <IconWrapper><FaCreditCard /></IconWrapper>
        <Title>Thanh toán LINH HOẠT</Title>
        <Description>Với nhiều PHƯƠNG THỨC</Description>
      </Item>

      <Item>
        <IconWrapper><FaSyncAlt /></IconWrapper>
        <Title>Đổi sản phẩm mới</Title>
        <Description>Nếu sản phẩm lỗi</Description>
      </Item>
    </Container>
  );
};

export default InfoBlocksComponent;
