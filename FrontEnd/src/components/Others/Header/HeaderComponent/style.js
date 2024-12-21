import { Row ,Col, Menu,MenuItem} from "antd";
import styled from "styled-components"

export const WrapperHeader = styled(Row)`
    padding: 10px 10%;
    background-color: white; 
    

    
    @media (max-width: 1500px) {
      margin: 0;
  }

 
`

const HotlineContainer = styled.div`
  
  align-items: center;
  justify-content: space-between;
  font-family: Arial, sans-serif;
`;

const Icon = styled.span`
  color: #e74c3c; 
  font-size: 20px;
  margin-right: 5px;
`;

const Label = styled.span`
  color: black;
  font-weight: bold;
  margin-right: 5px;
  margin-top: 3px;
`;

const PhoneNumber = styled.span`
  color: #ff3b52; 
  font-weight: bold;
  font-size: 18px;
  margin-right: 5px;
`;

const Separator = styled.span`
  color: #ff3b52; 
  font-weight: bold;
  margin-right: 5px;
  font-size: 18px;
`;

const SearchCol = styled(Col)`
    display: flex;              
  justify-content: center;    
  align-items: center; 
    
`

const LowText = styled.span`
  display: block;
  margin-top: 8px; 
  font-size: 14px; 
  color: #000; 
  font-weight: bold; 
  &:hover{
    color: #1DA0F1;
  }
`;

const FunCol = styled(Col)`
    text-align: center;
    position: relative; /* Để menu con được định vị chính xác */
    &:hover .menu {
    display: block; 
    opacity: 1; 
  }  
`


const NewMenu = styled(Menu)`
border-radius: 10px; 


  

  
  display: none; /* Ẩn menu mặc định */
  position: absolute; /* Định vị tuyệt đối so với FunCol */
  
  left: 50%; /* Canh giữa */
  transform: translateX(-50%); /* Đưa menu về giữa */
  padding:5px;
  background-color:#F5F6F7;
  
  box-shadow: 0 2px 15px rgba(0, 0, 0, 1); /* Đổ bóng cho menu */
  z-index: 10; 
 
  opacity: 0; 
  transition: opacity 0.3s ease; /* Thêm hiệu ứng chuyển tiếp */
  margin-top: -10px;
 
  &::before {
    content: '';
    position: absolute; /* Định vị tam giác */
    top: -10px; /* Đưa tam giác lên trên menu */
    left: 50%; /* Canh giữa tam giác */
    transform: translateX(-50%); /* Đưa tam giác về giữa */
    border-left: 10px solid transparent; /* Cạnh trái */
    border-right: 10px solid transparent; /* Cạnh phải */
    border-bottom: 10px solid #1DA0F1; /* Màu tam giác (trùng với màu nền menu) */
  }
`;

const NewMenu2 = styled(Menu)`
border-radius: 10px; 
  //display: none; /* Ẩn menu mặc định */
  position: absolute; /* Định vị tuyệt đối so với FunCol */
  
  left: 50%; /* Canh giữa */
  transform: translateX(-50%); /* Đưa menu về giữa */
  background-color: white; /* Màu nền menu */
  
  box-shadow: 0 2px 15px rgba(0, 0, 0, 1); /* Đổ bóng cho menu */
  z-index: 10; 
 
  //opacity: 0; 
  transition: opacity 0.3s ease; /* Thêm hiệu ứng chuyển tiếp */
  margin-top: 0px;

  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  
`;

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
export {NewMenu2,HotlineContainer, Icon, Label,PhoneNumber,Separator,SearchCol,LowText,FunCol,NewMenu,MenuItem2,MenuSpan} 