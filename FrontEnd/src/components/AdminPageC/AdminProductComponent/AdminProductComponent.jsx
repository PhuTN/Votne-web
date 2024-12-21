import React, { useEffect, useState } from 'react'; 
import { Row, Col, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttributesByType } from '../../../redux/Slicer/attributeSlice';
import { fetchProductsByType, createProduct } from '../../../redux/Slicer/productSlice';
import AdminTableComponent from '../AdminTableComponent/AdminTableComponent';
import FilterSideBarComponent from '../../ProductPageC/FilterSideBarCombonent/FilterSideBarCombonent';
import { categories, columnsProduct, dataProduct } from '../../../models/fake-data';

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
      await dispatch(createProduct(title));
      setLoading(false); // Dừng loading khi hoàn thành
      message.success('Tạo sản phẩm mới thành công!'); // Hiển thị thông báo thành công
    } catch (error) {
      setLoading(false); // Dừng loading nếu có lỗi
      message.error('Failed to create product'); // Hiển thị thông báo lỗi
    }
  };

  return (
    <Row gutter={16} style={{ marginTop: '-30px' }}>
      <Col span={20}> 
        <AdminTableComponent
          title={title}
          //onChange={() => {}}
          columns={columnsProduct}
          data={updatedProducts}
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
          <FilterSideBarComponent filters={attributes} typeNe={title} />
        </div>
      </Col>
    </Row>
  );
};

export default AdminProductComponent;
