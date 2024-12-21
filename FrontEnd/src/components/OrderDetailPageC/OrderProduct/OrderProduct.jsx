import React, { useState } from 'react';
import { deleteI, ItemName, CartContainer, CartHeader, CartItemContainer, ItemPrice, TotalContainer, CheckoutButtonStyled, ItemDetails } from './style';
import { Image } from 'antd';
import './style.css';
import Bag from '../../../images/Bag.svg';

const OrderProduct = (orderData2) => {
    console.log(  "ORDER" )
    console.log( orderData2.orderData2    )
    console.log(  "ORDER" )
   

    const calculateTotal = () => {
        return orderData2.orderData2.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContainer>
            {orderData2.orderData2?.length === 0 ? (
                <div style={{ textAlign: 'center', margin: '20px 0', color: '#888' }}>
                    <Image 
                        width={100} 
                        src={Bag} 
                        style={{ marginRight: '50px' }}
                    />
                    Chưa có sản phẩm trong giỏ hàng
                </div>
            ) : (
                orderData2.orderData2?.map(item => (
                    <CartItemContainer key={item.id}>
                        <img src={item.image} alt={item.name} width={'50px'} />
                        <ItemDetails>
                            <ItemName>{item.name}, {item.colorName}, {item.attributeValue}</ItemName>
                            <div style={{ marginRight: '55px' }}>Số lượng: {item.quantity}</div>
                        </ItemDetails>
                        <ItemDetails>
                            <ItemPrice>{(item.price * item.quantity).toLocaleString()} đ</ItemPrice>
                        </ItemDetails>
                    </CartItemContainer>
                ))
            )}
            {orderData2.orderData2?.length > 0 && (
                <TotalContainer>
                    Tổng tiền: <span style={{ color: 'red' }}>{calculateTotal().toLocaleString()} đ</span>
                </TotalContainer>
                
            )}
            
        </CartContainer>
    );
};

export default OrderProduct;
