import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Select, Pagination, message, Slider } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, HeartFilled, StarFilled, StarOutlined } from '@ant-design/icons';
import { FaStarHalf } from 'react-icons/fa';

const { Option } = Select;

const Container = styled.div`
  width: 100%;
  // padding: 16px;
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
  gap: 16px;  // Giảm khoảng cách giữa các item
  grid-template-columns: repeat(4, 1fr);
  max-width: 1500%;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;  // Giảm khoảng cách giữa các item
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;  // Giảm khoảng cách giữa các item
  }
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;  // Giảm padding
  text-align: center;
  width: 180px;  // Giảm chiều rộng
  height: 300px; // Giảm chiều cao
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
const FavoriteIcon = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 20px;
  cursor: pointer;
  color: ${props => (props.favorited ? 'red' : 'gray')};
`;
const FilterContainer = styled.div`
  margin-bottom: 16px;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const RangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 14px;
  color: #555;
`;
const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 5px;
`;

const NoRating = styled.span`
  font-size: 14px;
  color: gray;
`;

const Stars = styled.div`
  display: flex;
  color: #f5a623; /* Màu vàng */
`;

const StarRating = ({ rating }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  
  return (
    <Stars>
      {[...Array(fullStars)].map((_, index) => (
        <StarFilled key={index} />
      ))}
      {halfStar && <FaStarHalf />}
      {[...Array(maxStars - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
        <StarOutlined key={index} />
      ))}
    </Stars>
  );
};


const ProductItem = ({ product, favoriteList, toggleFavorite }) => {
  const color = product.colors[0];
  const discountPercentage = Math.round(((color.price - color.discountPrice) / color.price) * 100);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };
  const isFavorited = favoriteList.includes(product._id);
  return (
    <ProductCard>
      {discountPercentage > 0 && <DiscountBadge>-{discountPercentage}%</DiscountBadge>}
      <FavoriteIcon favorited={isFavorited} onClick={() => toggleFavorite(product._id)}>
        {isFavorited ? <HeartFilled /> : <HeartOutlined />}
      </FavoriteIcon>
      <Link to={`/product/product-detail/${product._id}`} data-testid = {product.name} style={{ textDecoration: 'none' }} key={product._id}>
      <ProductImage src={color.images[0]} alt={product.name} />
      </Link>
      <Link to={`/product/product-detail/${product._id}`} data-testid = {product.name} style={{ textDecoration: 'none' }} key={product._id}>

      <ProductTitle>{product.name}</ProductTitle>
      </Link>
      <Link to={`/product/product-detail/${product._id}`} data-testid = {product.name} style={{ textDecoration: 'none' }} key={product._id}>

      <PriceContainer>
        {color.price && <OriginalPrice>{formatCurrency(color.price)} đ</OriginalPrice>}
        <ProductPrice>{formatCurrency(color.discountPrice)} đ</ProductPrice>
      </PriceContainer>
      </Link>
      <RatingContainer>
        {product.rating >= 0 ? (
          <>
            <StarRating rating={product.rating} />
            <span>({product.rating.toFixed(1)})</span>
          </>
        ) : (
          <NoRating>Chưa đánh giá</NoRating>
        )}
      </RatingContainer>
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
 // Lấy giá trị wishlist từ localStorage nếu có, hoặc mặc định là mảng rỗng
 const [favoriteList, setFavoriteList] = useState(() => {
  const savedWishlist = localStorage.getItem("wishlist");
  return savedWishlist ? JSON.parse(savedWishlist) : [];
});

// Cập nhật localStorage khi favoriteList thay đổi
useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(favoriteList));
}, [favoriteList]);

// Hàm toggleFavorite để thêm hoặc xóa sản phẩm khỏi favoriteList


const toggleFavorite = (productId) => {
  setFavoriteList((prevList) => {
    const isCurrentlyFavorite = prevList.includes(productId);
    const updatedList = isCurrentlyFavorite
      ? prevList.filter(id => id !== productId)  // Xóa sản phẩm khỏi danh sách yêu thích
      : [...prevList, productId];  // Thêm sản phẩm vào danh sách yêu thích

    // Hiển thị thông báo đúng theo hành động
    message.success(isCurrentlyFavorite ? "Đã xóa khỏi danh sách yêu thích!" : "Đã thêm vào danh sách yêu thích!");

    return updatedList;
  });
}
const [priceRange, setPriceRange] = useState([0, 5000000]);
const handlePriceChange = (value) => {
  setPriceRange(value);
};
const filteredProducts = currentProducts.filter(product => {
  const price = product.colors[0].discountPrice;
  return price >= priceRange[0] && price <= priceRange[1];
});
  return (
    <Container>
      <Header>
        <Title>Danh sách bạn yêu thích</Title>
       
        
      </Header>
      
      <ProductGrid>
        {filteredProducts.map((product) => (
        
          <ProductItem key={product._id} product={product} favoriteList={favoriteList} toggleFavorite={toggleFavorite} />
          
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
