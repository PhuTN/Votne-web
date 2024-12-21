import React, { useEffect, useState } from 'react';
import {deleteI,ItemName, CartContainer, CartHeader, CartItemContainer, ItemPrice, TotalContainer, CheckoutButtonStyled, ItemDetails } from './style';
import { Image, InputNumber } from 'antd';
import './style.css'
import Bag from '../../../../images/Bag.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MiniCartComponent = () => {
   
    const cart = localStorage.getItem("cart");
    let parsedCart ={}
    if (cart) {
       
        parsedCart = JSON.parse(cart); // Chuyển chuỗi JSON thành đối tượng
        
      } else {
        console.log("Giỏ hàng trống");
      }

      const navigate = useNavigate(); // Tạo hàm điều hướng
      const handleProductClick = (id) => {
        navigate(`/product-detail/${id}`); // Điều hướng tới trang chi tiết sản phẩm
    };
     

const extractProductDetails = (products) => {
    let counter = 1; // Bắt đầu từ 1
      return products?.map((product) => {
          const { idproduct, colorid, idattributevalue, number } = product;
          const color = idproduct.colors.find((c) => c.id === colorid);

          return {
              _id: idproduct._id,
              id: counter++,
              name: idproduct.name,
              quantity: number,
              price: color ? color.price : null,
              image: color && color.images?.length > 0 ? color.images[0] : null,
              attributeValue: idattributevalue ? idattributevalue.value : null,
              attributeId: idattributevalue ? idattributevalue._id : null,
              colorid: colorid,
              colorName: color?.colorName,
          

          };
      });
  };

  const result = extractProductDetails(parsedCart?.products);

  const initialCartItems = () => {
    const localCartItems = localStorage.getItem("cartItems");
    if (JSON.parse(localCartItems) && JSON.parse(localCartItems)?.length !== 0) {
        console.log("DCCCCM")
        return JSON.parse(localCartItems);
    }
    localStorage.setItem("cartItems", JSON.stringify(result || []));
    return result || [];
};


  

    const [cartItems, setCartItems] = useState(initialCartItems());

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);
    const updateQuantity = (id, value) => {
        const newCartItems = cartItems.map(item => 
            item.id === id ? { ...item, quantity: value } : item
        );
        setCartItems(newCartItems);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const removeItem = (id) => {
        const newCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(newCartItems);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const newCartItems = JSON.parse(localStorage.getItem("cartItems"));
            setCartItems(newCartItems || []);
          
        };
    
        // Lắng nghe sự thay đổi trong localStorage
        window.addEventListener("storage", handleStorageChange);
    
        // Dọn dẹp khi component bị hủy
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);
   
    return (
        <CartContainer>
            <CartHeader>GIỎ HÀNG </CartHeader>
            {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', margin: '20px 0', color: '#888' }}>
                <Image 
                                width={100} 
                                src={Bag} 
                                style={{marginRight:'50px'}}
                            />
                    Chưa có sản phẩm trong giỏ hàng
                </div>
            ) : (
                cartItems.map(item => (
                    
                    <CartItemContainer key={item.id}>
                    
                    <Link to={`/product/product-detail/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img src={item.image} alt={item.name} width={'50px'} />
                        </Link>
                        <ItemDetails>
                        <Link to={`/product/product-detail/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ItemName >
                                {item.name} 
                            </ItemName>
                            <ItemName style={{margin:"-15px 0"}}>
                                {item.colorName} 
                            </ItemName>
                            <ItemName >
                                 {item.attributeValue}
                            </ItemName>
                            </Link>
                            <InputNumber 
                                min={1} 
                                defaultValue={item.quantity} 
                                onChange={value => updateQuantity(item.id, value)} 
                                style = {{marginRight:'55px'}}
                            />
                        </ItemDetails>
                        <ItemDetails>
                            
                            <svg id='miniDeleteIcon' onClick={() => removeItem(item.id)}  width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id='miniDeletePath' d="M11 10L15 14M11 14L15 10M2.7716 13.5185L7.43827 17.5185C7.80075 17.8292 8.26243 18 8.73985 18H18C19.1046 18 20 17.1046 20 16V8C20 6.89543 19.1046 6 18 6H8.73985C8.26243 6 7.80075 6.17078 7.43827 6.48149L2.7716 10.4815C1.84038 11.2797 1.84038 12.7203 2.7716 13.5185Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            
                            <ItemPrice>{(item.price * item.quantity).toLocaleString()} đ</ItemPrice>
                        </ItemDetails>
                        
                    </CartItemContainer>
                  
                ))
            )}
            {cartItems.length > 0 && (
                <>
                    <TotalContainer>
                        Tổng tiền: <span style={{ color: 'red' }}>{calculateTotal().toLocaleString()} đ</span>
                    </TotalContainer>
                    <Link style={{textDecoration:'none'}} to = '/order-detail/payment'>
                    <CheckoutButtonStyled >
                        ĐẶT HÀNG
                    </CheckoutButtonStyled>
                    </Link>
                </>
            )}
        </CartContainer>
    );
}

export default MiniCartComponent;
