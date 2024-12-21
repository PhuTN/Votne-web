// Gallery.js
import React from 'react';
import styled from 'styled-components';
import CatagoryComponent from './CatagoryComponent';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1500%;
`;

const CenteredSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: #1DA0F1;
  margin: 50px 0 30px 0;
  font-weight: bold;
`;

const Gallery = ({ itemsArray }) => {
  return (
    <div>
      <CenteredSpan>Danh mục</CenteredSpan>
      <Container>
        <ImageGrid>
          {itemsArray.map((item, index) => (
            <CatagoryComponent key={index} src={item.src} text={item.text}  url = {item.key}/>
          ))}
        </ImageGrid>
      </Container>
    </div>
  );
};

export default Gallery;
