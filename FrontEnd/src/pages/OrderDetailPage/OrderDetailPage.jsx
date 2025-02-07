import React, {useEffect, useState} from 'react'
import OrderDetailComponent from '../../components/OrderDetailPageC/OrderDetailComponent/OrderDetailComponent';
import axios from 'axios';
import { useParams } from "react-router"
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../../redux/Slicer/orderSlice';
const OrderDetailPage = () => {
 
      const params = useParams();
      const [orderInfo, setOrderInfo] = useState([])

      useEffect(() => {
        axios.get(`http://localhost:8081/v1/api/getOrder/` + params.orderID)

            .then(res => {
              setOrderInfo(res.data)


            })
            .catch(err => {
                console.log(err)
            })


    }, [params.orderID]);

      const personalInfo = {
        orderId: 'DH123456',
        fullName: 'Nguyễn Văn A',
        phoneNumber: '0123456789',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        status: 'Đang xử lý'
      };


      const { orderID } = useParams();



      const dispatch = useDispatch();
  
  // Truy xuất trạng thái từ Redux store
  const selectedOrder = useSelector((state) => state.orders.selectedOrder);
  useEffect(() => {
    if (orderID ) {
      dispatch(fetchOrderById(orderID ));
    }
  }, [dispatch, orderID ]);
  console.log("HELLLLLO")
  console.log(selectedOrder)
  console.log("HELLLLLO")

  let personalInfo2 = {}
  if(selectedOrder) {
  personalInfo2 = {
       orderId: selectedOrder.id,
       order_Id: selectedOrder._id,
        fullName: selectedOrder.name,
        phoneNumber: selectedOrder.phonumber,
        email: selectedOrder.email,
        address: selectedOrder.address,
        status: selectedOrder.status,
        dayorder: selectedOrder.dayorder,
        decription: selectedOrder.decription,
        location: selectedOrder.location,
        paymentMethod: selectedOrder.paymentMethod,
        paymentStatus: selectedOrder.paymentStatus,
        
iduser:selectedOrder.iduser

  }
} 
console.log(personalInfo2)




const extractProductDetails = (products) => {
  let counter = 1; // Bắt đầu từ 1
    return products?.map((product) => {
        const { idproduct, colorid, idattributevalue, number ,
          price,review} = product;
        const color = idproduct.colors.find((c) => c.id === colorid);
        console.log("HELLO0",product)
        return {
            _id: idproduct._id,
            id: counter++,
            name: idproduct.name,
            quantity: number,
            price: price,
            image: color && color.images?.length > 0 ? color.images[0] : null,
            attributeValue: idattributevalue ? idattributevalue.value : null,
            attributeId: idattributevalue ? idattributevalue._id : null,
            colorid: colorid,
            colorName: color?.colorName,
            review:review
            
        

        };
    });
};

const result = extractProductDetails(selectedOrder?.products);
console.log("HELLO",result)
      


  return (
    <div style={{width: '90%', 
                margin: '10px auto', }}>
        <OrderDetailComponent personalInfo={personalInfo2} orderData={result} order = {selectedOrder} />
    </div>
  )
}

export default OrderDetailPage