import React, { useState } from 'react';
import { Button, InputNumber, Card, Row, Col } from 'antd';
import styled from 'styled-components';

// Cart container with responsive width
const CartContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 8px;

  @media (max-width: 1200px) {
    width: 90%; 
  }

  @media (max-width: 768px) {
    width: 100%;
    
  }
`;

// Cart header with padding and font adjustments
const CartHeader = styled.div`
  padding: 10px;
  color: black;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 16px; 
  }
`;

// Cart item container with responsive design for small screens
const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 15px 10px;
  border: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically on small screens */
    align-items: flex-start;
  }
`;

// Item details area with a responsive layout
const ItemDetails = styled.div`
  flex: 1;
  margin-left: 15px;
  width: fit-content;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

// Total container, adjusts text size for small screens
const TotalContainer = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: right;

  @media (max-width: 768px) {
    font-size: 16px; 
    text-align: left;
  }
`;

// Item price, adjusts text size and alignment on smaller screens
const ItemPrice = styled.div`
  color: red;
  font-weight: bold;
  text-align: right;
  margin-top: 35px;

  @media (max-width: 768px) {
    text-align: left; 
    margin-top: 15px; 
  }
`;

// Delete icon with margin adjustments
const deleteI = styled.svg`
  cursor: pointer;
  margin-top: -10px;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const CheckoutButtonStyled = styled(Button)`
  width: 100px;
  background-color: #1DA0F1;
  color: white;
  height: 45px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
  margin-right: 0;
  margin-left: 700px;

  &:hover {
    background-color: #e64a19;
  }

  @media (max-width: 768px) {
    width: 100%; 
    margin-left: 0;
  }
`;

// Item name with line clamp for overflow text
const ItemName = styled.p`
  text-align: left;
  width: 100%;
  line-height: 1.5;
  max-height: 3em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;

  @media (max-width: 768px) {
    width: 100%; 
  }
`;

export {
  deleteI,
  ItemName,
  CartContainer,
  CartHeader,
  CartItemContainer,
  ItemPrice,
  TotalContainer,
  CheckoutButtonStyled,
  ItemDetails,
};
