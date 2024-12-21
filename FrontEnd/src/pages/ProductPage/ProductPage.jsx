import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import FilterSideBarComponent from '../../components/ProductPageC/FilterSideBarCombonent/FilterSideBarCombonent';
import ProductGridComponent from '../../components/ProductPageC/ProductGridComponen/ProductGridComponen';
import CustomBreadcrumb from '../../components/Others/CustomBreadScumb/CustomBreadScumb';

import { filtersData } from '../../models/fake-data';

import { AppContexts } from '../../contexts/AppContexts';
import { useParams 
    
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttributesByType } from '../../redux/Slicer/attributeSlice';
import { fetchProductsByType } from '../../redux/Slicer/productSlice';
const PageContainer = styled.div`
  display: flex;
  padding: 16px;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  flex: 0 0 300px; /* Fixed width for sidebar */
  margin-right: 16px;
`;

const Content = styled.div`
  flex: 1; /* Takes the remaining width for content */
`;



const ProductPage = () => {


  



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
    <div style={{width: '1200px', margin:' 0 auto' }}>
      
      
      <PageContainer>
        {/* Sidebar */}
        <Sidebar>
          <FilterSideBarComponent filters={filteredAttributes}  typeNe = {type}/>
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
