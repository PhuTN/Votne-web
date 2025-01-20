import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import FilterSideBarComponent from '../../components/ProductPageC/FilterSideBarCombonent/FilterSideBarCombonent';
import ProductGridComponent from '../../components/ProductPageC/ProductGridComponen/ProductGridComponen';
import CustomBreadcrumb from '../../components/Others/CustomBreadScumb/CustomBreadScumb';
import { FaFilter } from "react-icons/fa";

import { filtersData } from '../../models/fake-data';

import { AppContexts } from '../../contexts/AppContexts';
import {
  useParams

} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttributesByType } from '../../redux/Slicer/attributeSlice';
import { fetchProductsByType } from '../../redux/Slicer/productSlice';
const PageContainer = styled.div`
  display: flex;
  padding: 16px;
  min-height: 100vh;
  position:relative;
`;

const Sidebar = styled.div`
  flex: 0 0 300px; /* Fixed width for sidebar */
  margin-right: 16px;

`;

const Content = styled.div`
  flex: 1; /* Takes the remaining width for content */
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


const ProductPage = () => {
  const [isShowSideBar, setIsShowSideBar] = useState(window.innerWidth > 1247 ? true : false)
  const [isShowOverlay, setIsShowOverlay] = useState(false)
  const sideBarEle = useRef(null)

  useEffect(() => {
    const handleWindowResize = () => {
      setIsShowOverlay(false)
      if (window.innerWidth > 1247) {
        setIsShowSideBar(true)

        sideBarEle.current.style.position = "static"
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




  const breadcrumbItems = [
    { path: '/', label: 'Trang Chủ' },
    { path: `/product/${type}`, label: type },
  ];

  const checkboxState = useSelector((state) => state.checkbox);



  const { products, status2, error2 } = useSelector((state) => state.products);

  useEffect(() => {
    if (type) {
      dispatch(fetchProductsByType(type)); // Gọi API với type
    }
  }, [type, dispatch]);  // Chạy lại khi type thay đổi




  console.log(products)
  const activeProducts = products.filter(product => product.active);

  const productNew = filterProductsByAttributes(activeProducts, checkboxState[type] || [])

  const filteredAttributes = attributes
    .filter(attr => attr.active) // Lọc các attribute có active: true
    .map(attr => ({
      ...attr,
      values: attr.values.filter(value => value.active), // Lọc các value có active: true
    }))
    .filter(attr => attr.values.length > 0); // Loại bỏ các attribute không có value nào active


  return (
    <div>
      <CustomBreadcrumb items={breadcrumbItems} />
      <div>

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
            <FilterSideBarComponent filters={filteredAttributes} typeNe={type} />
          </Sidebar>


          {/* Main Content */}
          <Content>
            <ProductGridComponent title={type} products={productNew} />
          </Content>
        </PageContainer>
      </div>
    </div>
  );
};

export default ProductPage;
