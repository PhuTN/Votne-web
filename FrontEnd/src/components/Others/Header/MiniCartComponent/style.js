import React, { useState } from 'react';
import { Button, InputNumber, Card, Row, Col } from 'antd';
import styled from 'styled-components';

const CartContainer = styled.div`
  width: 390px;
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
  flex: 1;
  margin-left: 15px;
  width: fit-content;
  
`;

const ItemPrice = styled.div`
  color: red;
  font-weight: bold;
  margin-right: -50px;
  margin-top:35px
   
`;

const TotalContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
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
    background-color: #e64a19;
  }
`;

const ItemName = styled.p`
  text-align: left;
  width: 150px;
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
`
const deleteI = styled.svg`
cursor: pointer; 
margin-top: -10px;
 margin-right: -100px; 
`


export {deleteI,ItemName,CartContainer,CartHeader,CartItemContainer ,ItemPrice,TotalContainer,CheckoutButtonStyled,ItemDetails}