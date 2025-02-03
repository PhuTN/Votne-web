import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import FilterSideBarComponent from '../../components/ProductPageC/FilterSideBarCombonent/FilterSideBarCombonent';
import ProductGridComponent3 from '../../components/ProductPageC/ProductGridComponen/ProductGridComponen3';
import CustomBreadcrumb from '../../components/Others/CustomBreadScumb/CustomBreadScumb';
import { FaFilter } from "react-icons/fa";

import { filtersData } from '../../models/fake-data';

import { AppContexts } from '../../contexts/AppContexts';
import {
  useParams

} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttributesByType } from '../../redux/Slicer/attributeSlice';
import { fetchProducts, fetchProductsByType, searchProductsByName } from '../../redux/Slicer/productSlice';
import ChatBot from '../../components/ChatBot/ChatBot';
import ChatBot2 from '../../components/ChatBot/ChatBot2';
import { Slider } from 'antd';

const PageContainer = styled.div`
  display: flex;
  padding: 16px;
  min-height: 100vh;
  position:relative;
`;

const Sidebar = styled.div`
  flex: 0 0 300px;
  margin-right: 16px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 1247px) {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    overflow-y: scroll;
    background: white; /* Thêm nền để tránh bị trùng với nội dung */
    padding: 10px;
    //width: 300px; /* Giữ nguyên chiều rộng */
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2); /* Tạo hiệu ứng đổ bóng */
  }
`;

const Content = styled.div`
  flex: 1; /* Takes the remaining width for content */
`;
const FilterContainer = styled.div`
  margin-bottom: 16px;
  width:260px;
  padding: 5px 10px 10px 10px;
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
const Overlay = styled.div`
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
`;

const FilterBtn = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  right: 10px;
  top: 50%;
  background-color: #1DA0F1;
  z-index: 100;
  justify-content: center;
  align-items: center;
  display: flex;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 1247px) {
    display: none;
  }
`;
const StarFilterContainer = styled.div`
 width:260px;
  margin-top: 16px;
  padding: 5px 10px 10px 10px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const StarButton = styled.button`
  background: ${(props) => (props.active ? "#1DA0F1" : "#f0f0f0")};
  color: black;
  border: none;
  padding: 8px 12px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  
  &:hover {
    background: #1DA0F1;
  }
  span {
    //color: #FFD700; /* Màu vàng cho ngôi sao */
color: ${(props) => (props.active ? "black" : "#FFD700")};
    font-weight: bold;
  }
`;

const StarFilter = ({ selectedRating, setSelectedRating }) => {
  const handleStarClick = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
  };

  return (
    <StarFilterContainer>
      <h3>Đánh giá</h3>
      {[5, 4, 3, 2, 1].map((star) => (
        <StarButton 
          key={star} 
          active={selectedRating === star} 
          onClick={() => handleStarClick(star)}
        >
          {star} <span>★</span>
        </StarButton>
      ))}
      <StarButton active={selectedRating === null} onClick={() => setSelectedRating(null)}>
        Tất cả
      </StarButton>
    </StarFilterContainer>
  );
};


const ProductPage = () => {
  const [isShowSideBar, setIsShowSideBar] = useState(window.innerWidth > 1247 ? true : false)
  const [isShowOverlay, setIsShowOverlay] = useState(false)
  const sideBarEle = useRef(null)
  const [selectedRating, setSelectedRating] = useState(null); // Mặc định không lọc theo sao

  useEffect(() => {
      const handleWindowResize = () => {
        setIsShowOverlay(false)
        if (window.innerWidth > 1247) {
          setIsShowSideBar(true)
  
          sideBarEle.current.style.position = "static"
          sideBarEle.current.style.overflowY = "hidden";
  
        } else {
          setIsShowSideBar(false)
  
          sideBarEle.current.style.position = "fixed"
          sideBarEle.current.style.left = "0"
          sideBarEle.current.style.top = "0"
          sideBarEle.current.style.bottom = "0"
          sideBarEle.current.style.zIndex = "100"
          sideBarEle.current.style.overflowY = "scroll"
        }
      }
  
      window.addEventListener('resize', handleWindowResize)
  
      return () => {
        window.removeEventListener('resize', handleWindowResize)
      }
    }, [])

  function filterProductsByAttributes(products, attributeValues) {
    return products.filter(product => {
      // Kiểm tra nếu tất cả giá trị trong attributeValues đều tồn tại trong product.attributeValues
      return attributeValues.every(attributeValue =>
        product.attributeValues.includes(attributeValue)
      );
    });
  }

  const { type } = useParams();  // Lấy tham số type từ URL

  // Sử dụng giá trị 'type' để fetch sản phẩm tương ứng







  const dispatch = useDispatch();

  // Get the attributes state from Redux
  const { attributes, status, error } = useSelector((state) => state.attributes);

  useEffect(() => {
    if (type) {
      dispatch(fetchAttributesByType(type)); // Fetch attributes when the 'type' changes
    }
  }, [dispatch, type]); // Re-fetch when 'type' changes
  // Add more products as needed




  

  const checkboxState = useSelector((state) => state.checkbox);



  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts()); // Gọi action khi component mount
  }, [dispatch]);
  console.log("FFFFFFF",products)




  console.log(products)
  const activeProducts = products.filter(product => product.active);

  const [favoriteList, setFavoriteList] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  
  // Cập nhật localStorage khi favoriteList thay đổi
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(favoriteList));
  }, [favoriteList]); 

  const filteredAttributes = attributes
    .filter(attr => attr.active) // Lọc các attribute có active: true
    .map(attr => ({
      ...attr,
      values: attr.values.filter(value => value.active), // Lọc các value có active: true
    }))
    .filter(attr => attr.values.length > 0); // Loại bỏ các attribute không có value nào active

const [priceRange, setPriceRange] = useState([0, 10000000]);
const handlePriceChange = (value) => {
  setPriceRange(value);
};

const { keyword } = useParams(); // Lấy từ khóa từ URL
  const [newKeyword, setNewKeyword] = useState(keyword)
  useEffect(() => {
    if (keyword) {
      console.log('Từ khóa tìm kiếm:', decodeURIComponent(keyword));
      // Gọi API hoặc xử lý tìm kiếm dựa trên keyword ở đây
    }
  }, [keyword]);

  const { productname } = useSelector((state) => state.products); // Lấy dữ liệu từ Redux store
  
    // Gọi API khi searchTerm thay đổi
    useEffect(() => {
        setNewKeyword(keyword)
      dispatch(searchProductsByName(keyword));
    }, [dispatch, keyword]);

    const favoriteProducts = activeProducts.filter(product => favoriteList.includes(product._id));

    const filteredProducts = favoriteProducts
  .filter(product => {
    const price = product.colors[0].discountPrice;
    return price >= priceRange[0] && price <= priceRange[1];
  })
  .filter(product => {
    if (selectedRating === null) return true; // Nếu không chọn sao nào, hiển thị tất cả sản phẩm
    return product.rating >= selectedRating && product.rating < selectedRating + 1;
  });


console.log(filteredProducts)
const breadcrumbItems = [
    { path: '/', label: 'Trang Chủ' },
    { path: `/wishlist`, label: "Danh sách bạn yêu thích" },
  ];
  return (
    <div>
    <ChatBot></ChatBot>
                 <ChatBot2></ChatBot2>
    
    <div style={{backgroundColor:"rgb(245, 245, 245)"}}>
      <div style={{maxWidth: '1200px', margin:' 0 auto' }}>
      <CustomBreadcrumb   items={breadcrumbItems} />
      </div>
      </div>
      <div style={{maxWidth: '1200px', margin:' 0 auto' }}>

        <PageContainer>
    
        {
            isShowOverlay &&
            <Overlay></Overlay>
          }
          <div>

          </div>

          <FilterBtn className='filterBtn' onClick={() => {
            setIsShowSideBar(!isShowSideBar)
            setIsShowOverlay(!isShowOverlay)
          }}>
            <FaFilter size={25} color='white' />
          </FilterBtn>

          {/* Sidebar */}

          <Sidebar ref={sideBarEle} style={{ display: `${isShowSideBar ? 'block' : 'none'}` }}>
  <FilterContainer>
  <h3>Giá</h3>
    <Slider
      range
      min={0}
      max={10000000}
      step={50000}
      defaultValue={priceRange}
      onChange={handlePriceChange}
    />
    <RangeContainer>
      <span>Tối thiểu: {priceRange[0].toLocaleString()} đ</span>
      <span>Tối đa: {priceRange[1].toLocaleString()} đ</span>
    </RangeContainer>
  </FilterContainer>

  {/* Bộ lọc sao */}
  <StarFilter selectedRating={selectedRating} setSelectedRating={setSelectedRating} />

 
</Sidebar>


          {/* Main Content */}
          <Content>
            <ProductGridComponent3 title={newKeyword} products={filteredProducts} />
          </Content>
        </PageContainer>
      </div>
    </div>
  );
};

export default ProductPage;
