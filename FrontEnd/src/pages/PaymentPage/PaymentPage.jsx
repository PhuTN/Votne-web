import React from 'react'
import PaymentComponent from '../../components/PaymentPageC/PaymentComponent/PaymentComponent'

const PaymentPage = () => {
  const products = [
    {
      id: 1,
      name: 'Vợt cầu lông VNB V200 Xanh chính hãng',
      price: 529000,
      quantity: 1,
      image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp'
    },
    {
      id: 2,
      name: 'Vợt cầu lông VNB V300 Đỏ chính hãng',
      price: 629000,
      quantity: 2,
      image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp'
    }
  ];


  



  const localCartItems = localStorage.getItem("cartItems");
 const product2 = JSON.parse(localCartItems);
  return (
    <div>
        <PaymentComponent products={product2} />
    </div>
  )
}

export default PaymentPage