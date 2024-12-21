import React from 'react';
import styled from 'styled-components';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const categories = [
  { name: 'Vợt Cầu Lông', items: [
    'Balo Cầu Lông Yonex',
    'Balo cầu lông Victor',
    'Balo cầu lông Kawasaki',
    'Balo cầu lông Flypower',
    'Balo cầu lông Mizuno',
    'Balo cầu lông VNB',
    'Balo cầu lông Adonex',
    'Balo cầu lông Forza',
    'Balo cầu lông Lining',
    'Balo cầu lông Sunbatta',
  ] },
  { name: 'Giày Cầu Lông', items: [
    'Balo Cầu Lông Yonex',
    'Balo cầu lông Victor',
    'Balo cầu lông Kawasaki',
    'Balo cầu lông Flypower',
    'Balo cầu lông Mizuno',
    'Balo cầu lông VNB',
    'Balo cầu lông Adonex',
    'Balo cầu lông Forza',
    'Balo cầu lông Lining',
    'Balo cầu lông Sunbatta',
  ] },
  { name: 'Áo Cầu Lông', items: [
    'Balo Cầu Lông Yonex',
    'Balo cầu lông Victor',
    'Balo cầu lông Kawasaki',
    'Balo cầu lông Flypower',
    'Balo cầu lông Mizuno',
    'Balo cầu lông VNB',
    'Balo cầu lông Adonex',
    'Balo cầu lông Forza',
    'Balo cầu lông Lining',
    'Balo cầu lông Sunbatta',
  ] },
  { name: 'Váy cầu lông', items: [
    'Balo Cầu Lông Yonex',
    'Balo cầu lông Victor',
    'Balo cầu lông Kawasaki',
    'Balo cầu lông Flypower',
    'Balo cầu lông Mizuno',
    'Balo cầu lông VNB',
    'Balo cầu lông Adonex',
    'Balo cầu lông Forza',
    'Balo cầu lông Lining',
    'Balo cầu lông Sunbatta',
  ] },
  { name: 'Quần Cầu Lông', items: [] },
  { name: 'Túi Vợt Cầu Lông', items: [] },
  {
    name: 'Balo Cầu Lông',
    items: [
      'Balo Cầu Lông Yonex',
      'Balo cầu lông Victor',
      'Balo cầu lông Kawasaki',
      'Balo cầu lông Flypower',
      'Balo cầu lông Mizuno',
      'Balo cầu lông VNB',
      'Balo cầu lông Adonex',
      'Balo cầu lông Forza',
      'Balo cầu lông Lining',
      'Balo cầu lông Sunbatta',
    ],
  },
];

const Container = styled.div`
  width: 250px;
  margin: 35px 0 0 10px;
`;

const StyledCollapse = styled(Collapse)`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .ant-collapse-header {
    font-weight: bold;
    font-size: 16px;
  }
`;

const CategoryTitle = styled.div`
  font-size: 18px;
  text-align: center;
  padding: 10px 0;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Item = styled.div`
  padding: 7px;
  font-size: 16px;
  transition: color 0.3s;

  &:hover {
    color: #1DA0F1;
  }
`;

const SideBarProductType = ({ defaultActiveKey }) => {
  return (
    <Container>
      <CategoryTitle>DANH MỤC SẢN PHẨM</CategoryTitle>
      <StyledCollapse defaultActiveKey={defaultActiveKey}>
        {categories.map((category, index) => (
          <Panel header={category.name} key={index}>
            {category.items.map((item, idx) => (
              <Item key={idx}>{item}</Item>
            ))}
          </Panel>
        ))}
      </StyledCollapse>
    </Container>
  );
};

export default SideBarProductType;
