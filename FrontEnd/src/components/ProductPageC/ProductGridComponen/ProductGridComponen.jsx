import React, { useState } from 'react';
import styled from 'styled-components';
import { Select, Pagination } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;

const Container = styled.div`
  width: 100%;
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  background-color: #e6f7ff;
  padding: 0px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));  // Giảm kích thước tối thiểu xuống 180px
  gap: 16px;  // Giảm khoảng cách giữa các item
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;  // Giảm padding
  text-align: center;
  width: 180px;  // Giảm chiều rộng
  height: 260px; // Giảm chiều cao
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  flex-grow: 1;
`;

const ProductTitle = styled.p`
  font-size: 13px;  // Giảm kích thước chữ
  color: #333;
  margin: 6px 0;  // Giảm khoảng cách giữa các phần tử
  text-align: left;
  flex-shrink: 0;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;  // Giảm khoảng cách giữa giá
  flex-shrink: 0;
`;

const OriginalPrice = styled.span`
  font-size: 13px;  // Giảm kích thước chữ
  color: #999;
  text-decoration: line-through;
  text-align: left;
`;

const ProductPrice = styled.span`
  color: #d0021b;
  font-weight: bold;
  font-size: 15px;  // Giảm kích thước chữ
  text-align: left;
`;

const DiscountBadge = styled.span`
  background-color: #fe0137;
  color: white;
  padding: 4px 6px;  // Giảm kích thước của badge
  border-radius: 4px;
  font-size: 11px;  // Giảm kích thước chữ của badge
  position: absolute;
  top: 8px;
  right: 8px;
`;

const ProductItem = ({ product }) => {
  const color = product.colors[0];  // Default to the first color variant
  const discountPercentage = Math.round(((color.price - color.discountPrice) / color.price) * 100);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };
  return (
    <ProductCard >
      {discountPercentage > 0 && <DiscountBadge>-{discountPercentage}%</DiscountBadge>}
      <ProductImage src={color.images[0]} alt={product.name} />
      <ProductTitle>{product.name}</ProductTitle>
      <PriceContainer>
        {color.price && <OriginalPrice>{formatCurrency(color.price)} đ</OriginalPrice>}
        <ProductPrice>{formatCurrency(color.discountPrice)} đ</ProductPrice>
      </PriceContainer>
    </ProductCard>
  );
};

const ProductGridComponent = ({ title, products }) => {
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;



  const sortedProducts = [...products];
  if (sortOrder === "asc") {
    sortedProducts.sort((a, b) => {
      const aPrice = a.colors[0].discountPrice;
      const bPrice = b.colors[0].discountPrice;
      return aPrice - bPrice;
    });
  } else if (sortOrder === "desc") {
    sortedProducts.sort((a, b) => {
      const aPrice = a.colors[0].discountPrice;
      const bPrice = b.colors[0].discountPrice;
      return bPrice - aPrice;
    });
  } else if (sortOrder === "newest") {
    sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <Container>
      <Header>
        <Title>{title} Cầu Lông</Title>
        <Select defaultValue="default" onChange={handleSortChange} style={{ width: 150, textAlign: 'center' }}>
          <Option value="default">Mặc định</Option>
          <Option value="asc">Giá tăng dần</Option>
          <Option value="desc">Giá giảm dần</Option>
          <Option value="newest">Hàng mới nhất</Option>
        </Select>
      </Header>
    
      <ProductGrid>
        {currentProducts.map((product) => (
          <Link to={`/product/product-detail/${product._id}`} data-testid = {product.name} style={{ textDecoration: 'none' }} key={product._id}>
            <ProductItem product={product} />
          </Link>
        ))}
      </ProductGrid>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
        <Pagination
          current={currentPage}
          pageSize={productsPerPage}
          total={products.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </Container>
  );
};

export default ProductGridComponent;
