import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Divider, Typography, Radio, Image, message } from 'antd';
import { LeftOutlined, MinusOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import Gift from '../../../images/gift.gif';

// Import các styled components
import {
  HighlightText, 
  StyledRadioButton, 
  CardWrapper, 
  ImageBlock, 
  ImageWrapper, 
  ThumbnailList, 
  ThumbnailWrapper, 
  Thumbnail, 
  NavButton, 
  InfoBlock, 
  Price, 
  Price2, 
  DiscountedPrice, 
  OfferSection, 
  OfferTitle, 
  BenefitList, 
  BenefitItem, 
  ActionsWrapper, 
  CustomButton, 
  OptionWrapper, 
  ChoiceBlock, 
  ChoiceImage, 
  RightSide, 
  QuantityWrapper, 
  QuantityButton, 
  QuantityDisplay
} from './style';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartByUserId, updateCart } from '../../../redux/Slicer/cartSlice';
import { jwtDecode } from 'jwt-decode';

const { Title, Text } = Typography;

const ProductDetailComponent = ({ product, brand }) => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [shouldRender, setShouldRender] = useState(false);
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };
  const [cartUpdated, setCartUpdated] = useState(false);
  const [color, setColor] = useState(product.colors[0]);
  const [selectedImage, setSelectedImage] = useState(color.images[0]);
  const [startIndex, setStartIndex] = useState(0);
  const [size, setSize] = useState(color.inventory[0]?.attribute.value || '');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  // Theo dõi sự thay đổi của product và cập nhật lại selectedImage và color
  useEffect(() => {
    setColor(product.colors[0]); // Đặt lại màu sắc mặc định từ product mới
    setSelectedImage(product.colors[0].images[0]); // Cập nhật lại hình ảnh khi thay đổi product
    setSize(product.colors[0].inventory[0]?.attribute || ''); // Cập nhật size mặc định
    setQuantity(1); // Đặt lại số lượng về 1
  }, [product]);

  const getAvailableStock = () => {
    const selectedSizeStock = color.inventory.find(option => option.attribute.value === size.value)?.number || 0;
    return selectedSizeStock;
  };

  const availableStock = getAvailableStock();

  const increaseQuantity = () => {
    if (quantity < availableStock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const visibleThumbnails = color.images.slice(startIndex, startIndex + 5);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex < color.images.length - 5) setStartIndex(startIndex + 1);
  };


 
  const localCartItems1 =  JSON.parse(localStorage.getItem("cartItems"));
 let localCartItems = localCartItems1
 console.log(localCartItems)
  const handleUpdateCart = () => {
    
    const token = localStorage.getItem("token");
    if(!token){
      navigate('/login');
      localStorage.setItem("previousURL", location.pathname);
      return
    }
    


    if (localCartItems && product ) {

      const productdat = { 
        _id: product._id || "", // Tham chiếu đến Product
        id :1 ,
        name:product.name,
        quantity: quantity,
        price: color.discountPrice, // Giá sản phẩm
       
        image: color.images[0],
        attributeValue:size.value,
        attributeId: size._id, // Tham chiếu đến AttributeValue
        colorid: color.id, // Mã màu sản phẩm
        colorName: color.colorName
         // Số lượng sản phẩm
      };
      
      // Kiểm tra sản phẩm đã tồn tại trong mảng `products` hay chưa
      const existingProductIndex = localCartItems?.findIndex(
        (item) =>
          item._id === productdat._id &&
          item.colorid === productdat.colorid &&
          item.attributeId === productdat.attributeId
          
          
      );
      
      let updatedProducts;
      
      if (existingProductIndex !== -1) {
        // Nếu tồn tại, tạo bản sao của đối tượng và cập nhật số lượng
        updatedProducts = localCartItems.map((item, index) => {
          if (index === existingProductIndex) {
            return {
              ...item,  // Sao chép tất cả các thuộc tính cũ
              quantity: item.quantity + productdat.quantity,  // Cập nhật số lượng
            };
          }
          return item;
        });
      } else {
        // Nếu chưa tồn tại, thêm sản phẩm mới vào mảng
        updatedProducts = [...(localCartItems || []), productdat];
      }
      
      // Cập nhật cart với mảng products mới
      const updatedCart = updatedProducts
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  console.log( updatedCart)
  setCartUpdated((prevState) => !prevState);
  
  window.location.reload()
  message.success(`Thêm vào giỏ hàng thành công`);
  
    }
  };
 

  useEffect(() => {
    // Bạn có thể thực hiện bất kỳ logic nào khác nếu cần khi giỏ hàng được cập nhật
    console.log("Cart updated, component re-rendered");
  }, [cartUpdated])
  return (
    <CardWrapper>
      <ImageBlock>
        <ImageWrapper>
          <Image src={selectedImage} alt="Vợt cầu lông" />
        </ImageWrapper>
        <ThumbnailList>
          {startIndex > 0 && (
            <NavButton onClick={handlePrev}>
              <LeftOutlined />
            </NavButton>
          )}
          <ThumbnailWrapper>
            {visibleThumbnails.map((img, index) => (
              <Thumbnail
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                active={selectedImage === img}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </ThumbnailWrapper>
          {startIndex < color.images.length - 5 && (
            <NavButton onClick={handleNext}>
              <RightOutlined />
            </NavButton>
          )}
        </ThumbnailList>
      </ImageBlock>

      <InfoBlock>
        <Title level={4}>{product.name}</Title>
        <Text type="secondary">Mã: <HighlightText>{product.id}</HighlightText></Text>
        <br />
        <Text>Thương hiệu: <HighlightText>{brand}</HighlightText> | Tình trạng: <HighlightText>Còn {availableStock} sản phẩm</HighlightText></Text>

        <Price>
          {formatPrice(color.discountPrice)} 
          <DiscountedPrice>{formatPrice( color.price)}</DiscountedPrice>
        </Price>

        <OfferSection>
          <OfferTitle style={{ margin: '0px' }} orientation="left">
            <img width={25} src={Gift} style={{ margin: '-10px 0px 0px -10px', padding: '10px 0 0 0' }} alt="gift icon" />
            <span style={{ color: 'blue', fontSize: '20px', margin: '5px 0px 0px 5px' }}>ƯU ĐÃI</span>
          </OfferTitle>
          <BenefitList>
            {product.endows.map((benefit, index) => (
              <BenefitItem key={index}>{benefit.description}</BenefitItem>
            ))}
          </BenefitList>
        </OfferSection>

        {product.colors.length > 1 && (
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '0 10px', width: '600px', margin: '20px 0' }}>
            <Divider style={{ marginTop: '5px' }} orientation="left">Chọn Màu sắc</Divider>
            <OptionWrapper>
              {product.colors.map((option) => (
                <ChoiceBlock key={option.id} isSelected={color.id === option.id}>
                  <ChoiceImage src={option.images[0]} alt={option.colorName} />
                  <RightSide>
                    <Radio.Group onChange={() => {setColor(option); setSize(option.inventory[0]?.attribute.value); setSelectedImage(option.images[0])}} value={color.id}>
                      <Radio style={{ width: '100px', fontSize: '12px' }} value={option.id}>{option.colorName}</Radio>
                    </Radio.Group>
                    <Price2>{ formatPrice( option.discountPrice)}</Price2>
                  </RightSide>
                </ChoiceBlock>
              ))}
            </OptionWrapper>
          </div>
        )}

        {color.inventory.length > 1 && (
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '10px 10px 20px 10px', width: '600px', margin: '20px 0' }}>
            <Divider style={{ marginTop: '-5px' }} orientation="left">Chọn Size</Divider>
            <Radio.Group
              onChange={(e) => setSize(e.target.value)}
              value={size}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
            >
              {color.inventory.filter(sizeOption => sizeOption.number > 0).map((sizeOption) => (
                <Radio.Button
                  key={sizeOption.attribute.value}
                  value={sizeOption.attribute}
                  style={{
                    textAlign: 'center',
                    border: '2px solid #e0e0e0',
                    backgroundColor: size.value === sizeOption.attribute.value ? '#f7fcfe' : 'white',
                    border: size.value === sizeOption.attribute.value ? '2px solid #1DA0F1' : '2px solid #e0e0e0',
                  }}
                >
                  {sizeOption.attribute.value}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
        )}

        <ActionsWrapper>
          <QuantityWrapper>
            <QuantityButton onClick={decreaseQuantity} icon={<MinusOutlined />} />
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <QuantityButton data-testid = "addBtn" onClick={increaseQuantity} icon={<PlusOutlined />} />
          </QuantityWrapper>
        </ActionsWrapper>
        {/* <Link to='/order-detail/payment' style={{ textDecoration: 'none' }}>
          <CustomButton type="primary" danger disabled={availableStock === 0}>Mua Ngay</CustomButton>
        </Link> */}
        <CustomButton
  type="default"
  disabled={availableStock === 0}
  onClick={handleUpdateCart}
  data-testid = "cartBtn"
>
  Thêm vào Giỏ hàng
</CustomButton>
      </InfoBlock>
    </CardWrapper>
  );
};

export default ProductDetailComponent;
