import { Row, Col, Menu } from "antd";
import styled from "styled-components";

export const WrapperMenu = styled(Row)`
  background-color: #1da0f1;
  padding: 10px;

  @media (max-width: 1046px) {
    padding: 5px;
  }
          @media (max-width: 768px) {
    display: none;  }
`;

const SubMenu = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
  position: relative;
  font-size: 18px;
  font-weight: 500;
  color: white;

  @media (max-width: 1046px) {
    margin-left: 20px;
    margin-right: 20px;
  }

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 12px;
    font-weight: 500;
    
  }
 @media screen and (max-width: 768px) {
    margin: 0; /* Bỏ margin để tiết kiệm không gian */
    font-size: 15px;
    font-weight: 500;
  font-weight: 450;
    padding: 10px; /* Thêm khoảng cách cho vùng bấm */
    text-align: left; /* Căn trái nội dung */
    padding-left: 35px;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1); /* Màu nền khi hover */
      
    }
  }

  
  &:hover {
    color: black;
    cursor: pointer;

    #productMenu {
      display: block;
      opacity: 1;
    }

    #menuDowArrow {
      stroke: black;
    }
    #sgvMenuDowArrow {
      /* Sử dụng lớp để chỉ định kiểu cho SVG */

      transform-origin: center; /* Đặt gốc xoay ở giữa hình */
      transform: rotate(180deg); /* Xoay SVG 180 độ */
      transition: transform 0.3s ease; /* Thêm hiệu ứng chuyển động */
    }
  }

  /* Hiển thị menu sản phẩm khi hover */

  /* Ẩn ProductMenuComponent khi không hover */
`;
export const MobileNavBar = styled.div`
  display: none; /* Mặc định ẩn */
  background-color: #1da0f1;
  padding: 10px;

  @media screen and (max-width: 768px) {
    display: block;
    justify-content: space-between;
    align-items: center;
  }

.menu-toggle {
  cursor: pointer;
  font-size: 20px;
  color: white;
  transition: color 0.3s ease, transform 0.2s ease;

  &::before {
    content: "☰"; 
  }

  &:hover {
    color: black;
  }

  &.active::before {
    content: "✖";
    font-size: 25px;
  }

  &.active:hover {
    color: black; 
  }
}




  .menu-items {
    position: relative;
    left: 0;
    width: 100%;
    background-color: #1da0f1;
    flex-direction: column;
    display: none;
    transition: all 0.3s ease;


    &.active {
      display: flex;
    }

    
  }
`;


const ProductMenu = styled.div`
  border-radius: 10px;

  display: none; /* Ẩn menu mặc định */
  position: absolute; /* Định vị tuyệt đối so với FunCol */

  left: 50%; /* Canh giữa */
  transform: translateX(-40%); /* Đưa menu về giữa */
  background-color: white; /* Màu nền menu */

   @media (max-width: 768px) {
  left: 0%; /* Canh giữa */
  transform: translateX(0%); /* Đưa menu về giữa */
  background-color: white; /* Màu nền menu */
  width: 90vw;
  }

  box-shadow: 0 2px 15px rgba(0, 0, 0, 1); /* Đổ bóng cho menu */
  z-index: 10;

  opacity: 0;
  transition: opacity 0.3s ease; /* Thêm hiệu ứng chuyển tiếp */
  margin-top: 30px;
  width: 70vw;
`;

const MenuItem2 = styled.div`
  border-radius: 10px;
  padding: 20px 10px; /* Padding cho mỗi item */
  cursor: pointer; /* Con trỏ khi hover vào item */
  width: 150px;
  &:hover {
    background-color: #1da0f1; /* Màu nền khi hover vào item */
  }
`;

const MenuSpan = styled.span`
  font-size: 14px;
  color: #000;
  font-weight: bold;
`;

const NewMenu = styled(Menu)`
  border-radius: 10px;

  padding: 5px;
  background-color: #f5f6f7;

  display: none; /* Ẩn menu mặc định */
  position: absolute; /* Định vị tuyệt đối so với FunCol */

  left: 50%; /* Canh giữa */
  transform: translateX(-50%); /* Đưa menu về giữa */
   @media (max-width: 768px) {
  left: 5%; /* Canh giữa */
  transform: translateX(0%); /* Đưa menu về giữa */
  // width: 85vw;

  }
  /* Màu nền menu */

  box-shadow: 0px 0px 15px rgba(0, 0, 0, 1); /* Đổ bóng cho menu */
  z-index: 9999; 

  opacity: 0;
  transition: opacity 0.3s ease; /* Thêm hiệu ứng chuyển tiếp */
  margin-top: 30px;
`;

export { NewMenu, MenuItem2, MenuSpan, SubMenu, ProductMenu };
