import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  overflow: hidden;
  border: 1px solid #ccc;
  
`;

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 110%; // Tăng kích thước ban đầu lên 110%
  height: 110%;
  object-fit: cover;
  transform: translate(-50%, -50%) scale(1); // Căn giữa và phóng to ban đầu
  transition: transform 0.3s ease, opacity 0.3s ease;
  
  ${ImageContainer}:hover & {
    transform: translate(-50%, -50%) scale(0.91); // Thu nhỏ và vẫn căn giữa
    opacity: 0.7;
  }
`;

const DiagonalText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-10deg);
  color: white;
  font-size: 23px;
  font-weight: bold;
  background: rgba(29, 160, 241, 0.7)
  ;
  padding: 5px 5px;
  text-align: center;
  pointer-events: none;
  width: 230px;
`;

const CatagoryComponent = ({ src, text, url }) => {
  return (
    <Link to = {`/product/${url}`} style={{textDecoration:'none'}} data-testid = {text}>
    <ImageContainer>
      <Image src={src} alt="Image" />
      <DiagonalText>{text}</DiagonalText>
    </ImageContainer>
    </Link>
  );
};

export default CatagoryComponent;
