import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';

// Responsive carousel settings
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

// Styled component for Slider Container
const SliderContainer = styled.div`
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #aee1f8;
  border-radius: 10px;

  .ant-card {
    margin: 5px;
    padding: 10px;
    width: 225px;
    height: 280px;
    position: relative;
  }

  .ant-card-cover img {
    width: 100%;
    height: 120px;
    object-fit: contain;
  }

  .ant-card-body {
    text-align: left;
    padding: 10px;
  }
`;

const StyledTabs = styled(Tabs)`
  padding: 2px 10px;
  .ant-tabs-nav {
    background-color: white;
    border-radius: 5px;
    white-space: nowrap;
    padding: 0;
  }

  .ant-tabs-tab {
    font-size: 16px;
    text-align: center;
    margin-left: 50px;
    align-items: center;
  }

  .ant-tabs-tab-active {
    font-weight: bold;
    border-radius: 5px;
  }
`;

const CenteredSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  
  font-size: 32px;
  color: #1DA0F1;
  margin: 50px 0 30px 0;
  font-weight: bold;
`;

const DiscountBadge = styled.span`
  background-color: #fe0137;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  position: absolute;
  top: 8px;
  right: 8px;
`;

const ProductSliderComponent = ({ tabItems, products }) => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.category === activeTab);

  return (
    <div>
      <CenteredSpan>
        Sản phẩm mới
      </CenteredSpan>
      <SliderContainer>
        <StyledTabs defaultActiveKey="all" onChange={setActiveTab}>
          {tabItems.map(tab => (
            <Tabs.TabPane tab={tab.label} key={tab.key} />
          ))}
        </StyledTabs>

        <Carousel responsive={responsive}>
          {filteredProducts.map(product => {
            const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            return (
              <Link style={{textDecoration:'none'}} to =  {`/product/product-detail/${product.id}`}>
              <Card key={product.id} hoverable>
                <DiscountBadge>-{discountPercentage}%</DiscountBadge>
                <div className="ant-card-cover">
                  <img alt={product.name} src={product.imgSrc} />
                </div>
                <div className="ant-card-body">
                  <h4>{product.name}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ textDecoration: 'line-through', margin: 0 }}>{product.originalPrice.toLocaleString()}đ</p>
                    <p style={{ fontWeight: 'bold', color: '#d0021b', fontSize: '16px', margin: 0 }}>{product.price.toLocaleString()}đ</p>
                  </div>
                </div>
              </Card>
              </Link>
            );
          })}
        </Carousel>
      </SliderContainer>
    </div>
  );
};

export default ProductSliderComponent;