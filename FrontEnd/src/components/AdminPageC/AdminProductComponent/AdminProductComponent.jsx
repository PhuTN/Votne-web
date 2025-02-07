import React, { useEffect, useState } from 'react'; 
import { Row, Col, Button, message, Slider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttributesByType } from '../../../redux/Slicer/attributeSlice';
import { fetchProductsByType, createProduct } from '../../../redux/Slicer/productSlice';
import AdminTableComponent from '../AdminTableComponent/AdminTableComponent';
import FilterSideBarComponent from '../../ProductPageC/FilterSideBarCombonent/FilterSideBarCombonent';
import { categories, columnsProduct, dataProduct } from '../../../models/fake-data';
import styled from 'styled-components';
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


const AdminProductComponent = ({ title, handleRowSelect, setSelectedRow }) => {
  const dispatch = useDispatch();

  const { attributes } = useSelector(state => state.attributes);
  const { products, newProductId } = useSelector(state => state.products);

  const [loading, setLoading] = useState(false);

  // Fetch attributes and products whenever 'title' changes
  useEffect(() => {
    if (title) {
      dispatch(fetchAttributesByType(title)); // Fetch attributes when type changes
    }
  }, [dispatch, title]);

  useEffect(() => {
    if (title) {
      dispatch(fetchProductsByType(title)); // Fetch products when type changes
    }
  }, [title, dispatch]);

  // Lắng nghe sự thay đổi của newProductId để re-render lại component
  // useEffect(() => {
  //   if (newProductId) {
  //     dispatch(fetchProductsByType(title));
  //     const newProduct = products.find(product => product.id === newProductId);
  //     if (newProduct) {
  //       if (handleRowSelect) {
  //         handleRowSelect(newProduct);
  //       }
  //       if (setSelectedRow) {
  //         setSelectedRow(newProduct); // Gửi sản phẩm mới lên AdminPage
  //       }
  //     }
  //   }
  // }, [newProductId, dispatch, title, products, handleRowSelect, setSelectedRow]);

  
  // Hàm lọc sản phẩm theo attributes
  function filterProductsByAttributes(products, attributeValues) {
    return products.filter(product => {
      return attributeValues.every(attributeValue =>
        product.attributeValues.includes(attributeValue)
      );
    });
  }

  const checkboxState = useSelector(state => state.checkbox);
  const filteredProducts = filterProductsByAttributes(products, checkboxState[title] || []);
  
  const updatedProducts = filteredProducts
    .map(product => ({
      ...product,
      _id: product._id,
      productID: product.id,
      product: product.name,
      brand: product.brand,
      price: product.colors[0]?.price || 0,
      discountPrice: product.colors[0]?.discountPrice || 0,
      soldQuantity: product.sold,
    }))
    .reverse(); // Reverse the order of the products

  // Hàm handle khi nhấn nút "Add"
  const handleAddProduct = async () => {
    setLoading(true); // Set trạng thái loading
    try {
      // Gọi action createProduct với type hiện tại
      const resultAction = await dispatch(createProduct(title));
      setLoading(false); // Dừng loading khi hoàn thành
  
      // Log ra _id của sản phẩm mới tạo
      if (createProduct.fulfilled.match(resultAction)) {
        console.log('ID của sản phẩm mới tạo:', resultAction.payload.productId);
      }
  
      message.success('Tạo sản phẩm mới thành công!'); // Hiển thị thông báo thành công
      handleRowSelect(resultAction.payload.productId)
    } catch (error) {
      setLoading(false); // Dừng loading nếu có lỗi
      message.error('Failed to create product'); // Hiển thị thông báo lỗi
    }
  };
  const [selectedRating, setSelectedRating] = useState(null); // Mặc định không lọc theo sao
const [priceRange, setPriceRange] = useState([0, 10000000]);
const handlePriceChange = (value) => {
  setPriceRange(value);
};
const filteredProducts2 = updatedProducts
  .filter(product => {
    const price = product.colors[0].discountPrice;
    return price >= priceRange[0] && price <= priceRange[1];
  })
  .filter(product => {
    if (selectedRating === null) return true; // Nếu không chọn sao nào, hiển thị tất cả sản phẩm
    return product.rating >= selectedRating && product.rating < selectedRating + 1;
  });
  
  return (
    <Row gutter={16} style={{ marginTop: '-30px' }}>
      <Col span={20}> 
        <AdminTableComponent
          title={title}
          //onChange={() => {}}
          columns={columnsProduct}
          data={filteredProducts2}
          onRowSelect={handleRowSelect}
        />
        <Button
          type="primary"
          style={{ width: "100px", marginLeft: "50px" }}
          loading={loading} // Hiển thị loading khi đang tạo sản phẩm
          onClick={handleAddProduct} // Khi nhấn nút "Add", sẽ gọi hàm tạo sản phẩm
          data-testid = "thembtn"
          
        >
          Thêm
        </Button>
      </Col>
      <Col span={4}> {/* Filter Sidebar */}
        <div style={{ marginTop: '160px' }}>
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
          <FilterSideBarComponent filters={attributes} typeNe={title} />
        </div>
      </Col>
    </Row>
  );
};

export default AdminProductComponent;