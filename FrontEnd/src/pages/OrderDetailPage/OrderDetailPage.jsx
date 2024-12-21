import React, {useEffect, useState} from 'react'
import OrderDetailComponent from '../../components/OrderDetailPageC/OrderDetailComponent/OrderDetailComponent';
import axios from 'axios';
import { useParams } from "react-router"
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../../redux/Slicer/orderSlice';
const OrderDetailPage = () => {
    const data = [
        {
          key: '1',
          orderNumber: 'DH001',
          date: '2024-10-01',
          address: '123 Đường ABC, Quận XYZ',
          price: '500.000 VNĐ',
          status: 'Đang xử lý',
        },
        {
          key: '2',
          orderNumber: 'DH002',
          date: '2024-10-02',
          address: '456 Đường DEF, Quận ABC',
          price: '300.000 VNĐ',
          status: 'Đã giao',
        },
        {
          key: '3',
          orderNumber: 'DH003',
          date: '2024-10-03',
          address: '789 Đường GHI, Quận DEF',
          price: '400.000 VNĐ',
          status: 'Đang xử lý',
        },
        {
          key: '4',
          orderNumber: 'DH004',
          date: '2024-10-04',
          address: '321 Đường JKL, Quận GHI',
          price: '600.000 VNĐ',
          status: 'Hoàn thành',
        },
        {
          key: '5',
          orderNumber: 'DH005',
          date: '2024-10-05',
          address: '654 Đường MNO, Quận JKL',
          price: '250.000 VNĐ',
          status: 'Đang xử lý',
        },
        {
          key: '6',
          orderNumber: 'DH006',
          date: '2024-10-06',
          address: '987 Đường PQR, Quận MNO',
          price: '700.000 VNĐ',
          status: 'Đã giao',
        },
        {
          key: '7',
          orderNumber: 'DH007',
          date: '2024-10-07',
          address: '135 Đường STU, Quận PQR',
          price: '350.000 VNĐ',
          status: 'Đang xử lý',
        },
        {
          key: '8',
          orderNumber: 'DH008',
          date: '2024-10-08',
          address: '246 Đường VWX, Quận STU',
          price: '450.000 VNĐ',
          status: 'Hoàn thành',
        },
        {
          key: '9',
          orderNumber: 'DH009',
          date: '2024-10-09',
          address: '369 Đường YZA, Quận VWX',
          price: '800.000 VNĐ',
          status: 'Đang xử lý',
        },
        {
          key: '10',
          orderNumber: 'DH010',
          date: '2024-10-10',
          address: '159 Đường BCD, Quận YZA',
          price: '900.000 VNĐ',
          status: 'Đã giao',
        },
      ];
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
        fullName: selectedOrder.name,
        phoneNumber: selectedOrder.phonumber,
        email: selectedOrder.email,
        address: selectedOrder.address,
        status: selectedOrder.status,
        dayorder: selectedOrder.dayorder,
        decription: selectedOrder.decription,
        location: selectedOrder.location,
        paymentMethod: selectedOrder.paymentMethod,
        paymentStatus: selectedOrder.paymentStatus


  }
} 
console.log(personalInfo2)




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

const result = extractProductDetails(selectedOrder?.products);
console.log(result)
      


  return (
    <div style={{width: '1200px', 
                margin: '30px auto 50px auto', }}>
        <OrderDetailComponent personalInfo={personalInfo2} orderData={result} />
    </div>
  )
}

export default OrderDetailPage