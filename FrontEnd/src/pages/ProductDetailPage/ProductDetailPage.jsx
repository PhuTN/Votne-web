import React, { useEffect } from 'react';  
import styled from 'styled-components';

import ProductDetailComponent from '../../components/ProductDetailPageC/ProductDetailComponent/ProductDetailComponent';
import SideBarProductType from '../../components/ProductDetailPageC/SideBarProductType/SideBarProductType';
import ProductDetails from '../../components/ProductDetailPageC/ProductDecriptionComponent/ProductDecriptionComponent';
import CustomBreadcrumb from '../../components/Others/CustomBreadScumb/CustomBreadScumb';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../redux/Slicer/productSlice';
import { fetchAttributesByType } from '../../redux/Slicer/attributeSlice';
import ChatBot from '../../components/ChatBot/ChatBot';
import ChatBot2 from '../../components/ChatBot/ChatBot2';

import ProductReview from '../../components/ProductReview/ProductReview';
import { fetchReviewsByProductId } from '../../redux/Slicer/reviewSlice';

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  @media (max-width: 450px) {
  width: 100%;

  }
`;

const Container = styled.div`
  // display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
`;

const LeftSection = styled.div`
  flex: 3;
  margin-right: 20px;
`;

const RightSection = styled.div`
  flex: 1;
`;

const StyledProductDetails = styled(ProductDetails)`
  margin-bottom: 15px;
`;

const ProductDetailPage = () => {
  const { productName } = useParams();
  const dispatch = useDispatch();
  
  const { product, status, error } = useSelector((state) => state.products);
  const { attributes, status2, error2 } = useSelector((state) => state.attributes);

console.log("PRODCUT",product)


  const filteredAttributes = attributes
  .filter(attr => attr.active) // Lọc các attribute có active: true
  .map(attr => ({
    ...attr,
    values: attr.values.filter(value => value.active), // Lọc các value có active: true
  }))
  .filter(attr => attr.values.length > 0); // Loại bỏ các attribute không có value nào active



  useEffect(() => {
    dispatch(fetchProductById(productName));  
  }, [dispatch, productName]);

  useEffect(() => {
    if (product?.type) {
      dispatch(fetchAttributesByType(product.type)); // Fetch attributes when the 'type' changes
    }
  }, [dispatch, product?.type]);

  
  const { reviews } = useSelector((state) => state.reviews);


  useEffect(() => {
    if (product?._id) {
      dispatch(fetchReviewsByProductId(product?._id));
    }
  }, [dispatch, product?._id]);
console.log("REVIEW",reviews)

  if (!product) {
    return <div>Loading...</div>; // Render loading if product is null or undefined
  }

  function mapAttributesToValues(product, attributeList) { 
    return attributeList?.map(attribute => {
      const matchedValues = product?.attributeValues?.filter(attributeValue => 
        attribute?.values?.some(val => val?.value === attributeValue?.value && val?.active)
      )?.map(attributeValue => ({
        _id: attributeValue._id,
        id: attributeValue.id,
        value: attributeValue.value,
        active: attributeValue.active
      }));

      if (matchedValues?.length > 0) {
        return {
          attribute: {
            _id: attribute._id,
            id: attribute.id,
            name: attribute.name,
            type: attribute.type,
            values: attribute.values
          },
          attributeValue: matchedValues
        };
      }
      return null;
    }).filter(item => item !== null) || [];
  }

  const result = mapAttributesToValues(product, filteredAttributes);

  const transformedData = result?.map((item) => ({
    label: item.attribute.name,
    value: item.attributeValue?.map(val => val.value) || [], // Ensure `value` is an array or fallback
  })) || [];

  const productData = {
    description: product?.description || '',
    specifications: transformedData
  };

  const brand = result?.find(item => item.attribute.name === "Thương hiệu")?.attributeValue?.[0]?.value || "";
  const breadcrumbItems = [
    { path: '/', label: 'Trang Chủ' },
    { path: `/product/${product.type}`, label: product.type },
    { path: `/product/product-detail/${product._id}`, label: product.id }, 
  ];


  

  // Lấy dữ liệu từ Redux store
  let mappedReviews = reviews?.map((review, index) => ({
    id: index + 1, // Tạo ID dựa trên thứ tự
    customerName: review.userId.username, // Lấy tên khách hàng từ userId
    avatar: review.userId.avatar, // Lấy avatar từ userId
    comment: review.comment, // Nội dung đánh giá
    rating: review.star, // Số sao
    date: new Date(review.date).toISOString().split("T")[0], // Chuyển ngày thành định dạng YYYY-MM-DD
  }));
  
  console.log(mappedReviews);
  if(!mappedReviews) mappedReviews=[]
  return (
    <div>
    <ChatBot></ChatBot>
    <ChatBot2></ChatBot2>

     <div style={{backgroundColor:"rgb(245, 245, 245)"}}>
      <div style={{maxWidth: '1150px', margin:' 0 auto' }}>
      <CustomBreadcrumb   items={breadcrumbItems} />
      </div>
      </div>
      <ContainerWrapper>
        <Container>
          <LeftSection>
            <ProductDetailComponent 
              product={product || {}} 
              brand={brand || ""} 
            />
            <StyledProductDetails product={productData} />
            <ProductReview reviewss = {mappedReviews}></ProductReview>
          </LeftSection>
          {/* <RightSection>
            <SideBarProductType defaultActiveKey={[0]} />
          </RightSection> */}
        </Container>
      </ContainerWrapper>
    </div>
  );
};

export default ProductDetailPage;
