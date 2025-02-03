import { Row ,Col, Menu,MenuItem, Button} from "antd";
import styled from "styled-components"

export const WrapperHeader = styled(Row)`
    padding: 10px;
    background-color: white; 
    

    
    @media (max-width: 1500px) {
      margin: 0;
    }

    @media (max-width: 768px) {
  display: none;  // Hiển thị trên các thiết bị nhỏ hơn hoặc bằng iPad

  /* Cập nhật các kiểu khác cho header mobile */
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
const SearchIconButton = styled(Button)`
    //border-radius: 0 4px 4px 0; 
    border: 0;

    color: ${(props) => (props.className === 'listening' ? '#ff4d4f' : '#1890ff')};
background-color: ${(props) =>
  props.className === 'listening' ? '#fff1f0' : 'transparent'};

&:hover {
  color: #ff4d4f;
  background-color: #fff1f0;
}
`
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
     @media (max-width: 768px) {
    margin-top: 10px;  /* Giảm khoảng cách trên */
    text-align: center;
    width: 15%;  /* Đảm bảo chiếm toàn bộ chiều rộng */
  }

  @media (min-width: 1194px) and (max-width: 1329px)  {
    text-align: center;  /* Căn giữa cho màn hình nhỏ hơn */
    width: 10%;
      margin: 0;
  }

    @media (min-width: 768px) and (max-width: 1072px)  {
    text-align: center;  /* Căn giữa cho màn hình nhỏ hơn */
    width: 20%;
      margin: 0;
  }

  @media (max-width: 480px) {
    text-align: center;  /* Căn giữa cho màn hình nhỏ hơn */
    width: 25%;
      margin: 0;
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


  @media (max-width: 768px) {
    left: 135%; /* Canh giữa */
  transform: translateX(-50%); /* Đưa menu về giữa */
  margin-top: 0px;
    &::before {
    content: '';
    position: absolute; /* Định vị tam giác */
    top: -5px; /* Đưa tam giác lên trên menu */
    left: 50%; /* Canh giữa tam giác */
    transform: translateX(-50%); /* Đưa tam giác về giữa */
    border-left: 10px solid transparent; /* Cạnh trái */
    border-right: 10px solid transparent; /* Cạnh phải */
    border-bottom: 10px solid #1DA0F1; /* Màu tam giác (trùng với màu nền menu) */
  }
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

export const HeaderMobile = styled.div`
display: none;  // Ẩn mặc định trên màn hình lớn

@media (max-width: 768px) {
  display: block;  // Hiển thị trên các thiết bị nhỏ hơn hoặc bằng iPad
 
  padding: 10px;
  text-align: center;

  /* Cập nhật các kiểu khác cho header mobile */
}
`;
export {SearchIconButton ,NewMenu2,HotlineContainer, Icon, Label,PhoneNumber,Separator,SearchCol,LowText,FunCol,NewMenu,MenuItem2,MenuSpan} 