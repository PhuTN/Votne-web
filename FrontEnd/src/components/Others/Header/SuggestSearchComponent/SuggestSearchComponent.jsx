import React, { useState, useEffect } from 'react';
import { TagButton, ItemName, StyledCard, ProductImage, SuggestWrapper } from './style';
import { FireOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { useNavigate } from 'react-router-dom';

const SuggestSearchComponent = ({ productsNew,thaydoi }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Hook điều hướng

  // Cập nhật state khi productsNew thay đổi
  useEffect(() => {
    setProducts(productsNew);
  }, [productsNew]); // Khi productsNew thay đổi, useEffect sẽ chạy và cập nhật state

  const handleProductClick = (id) => {
    
    
    navigate(`/product/product-detail/${id}`); // Điều hướng khi click vào sản phẩm
    
  };

  return (
    <SuggestWrapper>
      <h3 style={{ fontSize: '18px', marginBottom: '30px', marginLeft: '20px', textAlign: 'left' }}>
        <FireOutlined /> TÌM KIẾM NHIỀU NHẤT
      </h3>
      <div style={{ marginBottom: '16px', borderBottom: '1px solid #d9d9d9', paddingBottom: '20px' }}>
        {/* Các tag loại sản phẩm */}
        <TagButton>Cầu lông</TagButton>
        <TagButton>Giày cầu lông</TagButton>
        <TagButton>Áo cầu lông</TagButton>
        <TagButton>Quần cầu lông</TagButton>
      </div>
      <List
        dataSource={products.slice(0, 7)} // Giới hạn chỉ lấy tối đa 7 sản phẩm
        renderItem={item => (
          <StyledCard  onClick={() => handleProductClick(item._id)}>
            <ProductImage src={item.img} alt={item.name} />
            <div>
              <ItemName>{item.name}</ItemName>
              <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'left' }}>{item.price}</p>
            </div>
          </StyledCard>
        )}
      />
    </SuggestWrapper>
  );
};

export default SuggestSearchComponent;
