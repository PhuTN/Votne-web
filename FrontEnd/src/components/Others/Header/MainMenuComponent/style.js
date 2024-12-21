import { Row ,Col, Menu} from "antd";
import styled from "styled-components"

export const WrapperMenu = styled(Row)`
    
    background-color: #1DA0F1; 
    padding: 10px 10%;

    
    @media (max-width: 1500px) {
      margin: 0;
  }


 
`

const SubMenu = styled.div`
    margin-left: 30px;
    margin-right: 30px;
    text-align: center;
    position: relative; 
    font-size: 18px;
    font-weight: 500;
    color: white;

    &:hover {
        color: black;
        cursor: pointer;

        #productMenu {
            display: block; 
            opacity: 1; 
        }

        #menuDowArrow{
            stroke: black;
        }
        #sgvMenuDowArrow { /* Sử dụng lớp để chỉ định kiểu cho SVG */
            
            transform-origin: center; /* Đặt gốc xoay ở giữa hình */
    transform: rotate(180deg); /* Xoay SVG 180 độ */
    transition: transform 0.3s ease; /* Thêm hiệu ứng chuyển động */
           
        }
    }

    /* Hiển thị menu sản phẩm khi hover */
    

    /* Ẩn ProductMenuComponent khi không hover */
   
`


const ProductMenu = styled.div`
border-radius: 10px; 


  

  
display: none; /* Ẩn menu mặc định */
position: absolute; /* Định vị tuyệt đối so với FunCol */

left: 50%; /* Canh giữa */
transform: translateX(-40%); /* Đưa menu về giữa */
background-color: white; /* Màu nền menu */

box-shadow: 0 2px 15px rgba(0, 0, 0, 1); /* Đổ bóng cho menu */
z-index: 10; 

opacity: 0; 
transition: opacity 0.3s ease; /* Thêm hiệu ứng chuyển tiếp */
margin-top: 30px;
width: 70vw;
`

const MenuItem2 = styled.div`
border-radius: 10px; 
  padding: 20px 10px; /* Padding cho mỗi item */
  cursor: pointer; /* Con trỏ khi hover vào item */
  width: 150px;
  &:hover {
    background-color: #1DA0F1; /* Màu nền khi hover vào item */
  }

  
`;

const MenuSpan= styled.span`
  font-size: 14px; 
  color: #000; 
  font-weight: bold;
  `

const NewMenu = styled(Menu)`
border-radius: 10px; 


  padding:5px;
  background-color:#F5F6F7;
  
  display: none; /* Ẩn menu mặc định */
  position: absolute; /* Định vị tuyệt đối so với FunCol */
  
  left: 50%; /* Canh giữa */
  transform: translateX(-50%); /* Đưa menu về giữa */
  

/* Màu nền menu */
  
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 1); /* Đổ bóng cho menu */
  z-index: 10; 
  
  
  opacity: 0; 
  transition: opacity 0.3s ease; /* Thêm hiệu ứng chuyển tiếp */
 margin-top: 30px;


  
`;

export {NewMenu,MenuItem2,MenuSpan,SubMenu,ProductMenu}