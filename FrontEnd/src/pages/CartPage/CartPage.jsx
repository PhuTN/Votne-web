import { useEffect } from "react";
import CartComponent from "../../components/CartPageC/CartComponent/CartComponent";
import CustomBreadcrumb from "../../components/Others/CustomBreadScumb/CustomBreadScumb";

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
            <CustomBreadcrumb items={breadcrumbItems} />
        
            <div style={{
                width: '1200px', 
                margin: '50px auto 50px auto', 
                
            }}>
                <CartComponent  />
            </div>
        </div>
    );
}

export default CartPage;
