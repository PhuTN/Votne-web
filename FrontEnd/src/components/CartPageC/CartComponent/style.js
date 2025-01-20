import React, { useState } from 'react';
import { Button, InputNumber, Card, Row, Col } from 'antd';
import styled from 'styled-components';

const CartContainer = styled.div`
  padding: 10px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CartHeader = styled.div`
  padding: 10px;
  color: black;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 15px 10px;
  border: 1px solid #f0f0f0;
  
`;

const ItemDetails = styled.div`
  margin-left: 15px;
`;



const TotalContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: right; /* Dính sang phải */
`;

const ItemPrice = styled.div`
  color: red;
  font-weight: bold;
  text-align: right; /* Dính sang phải */
  margin-top: 35px;

    font-size:14px;

  @media (max-width: 1024px and min-width: 768px) {
    font-size:14px;
  }

  @media (max-width: 767px) {
    font-size:13px;
  }
`;

const deleteI = styled.svg`
  cursor: pointer;
  margin-top: -10px;
  margin-left: auto; /* Đẩy icon xóa sang cạnh phải */
`;
const CheckoutButtonStyled = styled(Button)`
  width: 100%;
  background-color: #1DA0F1;
  color: white;
  height: 45px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;

  &:hover {
    border-color: #1DA0F1;
    opacity: 0.9;
  }
`;

const ItemName = styled.p`
  text-align: left;
  line-height: 1.5;
  max-height: 3em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  &:hover {
    color: #1DA0F1;
  }

  font-size:14px;

  @media (max-width: 1024px and min-width: 768px) {
    font-size:14px;
  }

  @media (max-width: 767px) {
    font-size:13px;
  }
`



export { deleteI, ItemName, CartContainer, CartHeader, CartItemContainer, ItemPrice, TotalContainer, CheckoutButtonStyled, ItemDetails }