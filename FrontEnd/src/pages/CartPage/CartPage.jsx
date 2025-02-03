import { useEffect } from "react";
import CartComponent from "../../components/CartPageC/CartComponent/CartComponent";
import CustomBreadcrumb from "../../components/Others/CustomBreadScumb/CustomBreadScumb";
import ChatBot from "../../components/ChatBot/ChatBot";
import ChatBot2 from "../../components/ChatBot/ChatBot2";


const CartPage = () => {
    const breadcrumbItems = [
        { path: '/', label: 'Trang Chủ' },
        { path: '/cart', label: 'Giỏ hàng' },
    ];
    const initialItems = [
        {
            id: 1,
            name: 'Vợt Cầu Lông Lining Turbo Charging Marshal',
            price: 529000,
            quantity: 2,
            image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp'
        },
        {
            id: 2,
            name: 'Vợt cầu lông VNB V200 Xanh chính hãng',
            price: 529000,
            quantity: 3,
            image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp'
        }
    ];

    


    return (
        <div>
           <div style={{backgroundColor:"rgb(245, 245, 245)"}}>
      <div style={{maxWidth: '1200px', margin:' 0 auto' }}>
      <CustomBreadcrumb   items={breadcrumbItems} />
      </div>
      </div>
            <ChatBot></ChatBot>
             <ChatBot2></ChatBot2>
            <div style={{
                maxWidth: '1200px', 
                margin: '0 auto'
            }}>
                <CartComponent  />
            </div>
        </div>
    );
}

export default CartPage;
