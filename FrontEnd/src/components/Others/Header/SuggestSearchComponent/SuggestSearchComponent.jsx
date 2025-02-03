import React, { useState, useEffect } from 'react';
import { TagButton, ItemName, StyledCard, ProductImage, SuggestWrapper } from './style';
import { FireOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { useNavigate } from 'react-router-dom';

const SuggestSearchComponent = ({ productsNew }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Hook điều hướng

  // Cập nhật state khi productsNew thay đổi
  useEffect(() => {
    setProducts(productsNew);
  }, [productsNew]); // Khi productsNew thay đổi, useEffect sẽ chạy và cập nhật state

  const handleProductClick = (id) => {
    navigate(`/product/product-detail/${id}`); // Điều hướng khi click vào sản phẩm
  };

  // Kiểm tra nếu không có sản phẩm
  if (!products || products.length === 0) {
    return null; // Không render gì nếu danh sách rỗng
  }

  return (
    <SuggestWrapper>
      <List
        dataSource={products.slice(0, 7)} // Giới hạn chỉ lấy tối đa 7 sản phẩm
        renderItem={(item) => (
          <StyledCard onClick={() => handleProductClick(item._id)}>
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
