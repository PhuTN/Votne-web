import { Button, Divider, Radio } from "antd";
import styled from "styled-components";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  max-width: 900px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const ImageBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 24px;
`;

const ImageWrapper = styled.div`
  width: 250px;

  img {
    width: 100%;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-bottom: 10px;
  }
`;

const ThumbnailList = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const ThumbnailWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 240px;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 40px;
  border: 1px solid ${(props) => (props.active ? '#1890ff' : '#e0e0e0')};
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.3s ease;
  scroll-snap-align: start;
  margin:5px;
  &:hover {
    border-color: #1890ff;
  }
`;

const NavButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: none;
`;

const InfoBlock = styled.div`
  flex: 1;
  margin-top: -30px;
`;

const Price = styled.div`
  font-size: 20px; /* Giảm kích thước font */
  font-weight: bold;
  color: #f5222d;
  margin: 8px 0;
`;

const Price2 = styled.div`
  font-size: 12px; /* Giảm kích thước font */
  font-weight: bold;
  color: #f5222d;
  margin: 8px 0;
`;

const DiscountedPrice = styled.span`
  font-size: 16px; /* Giảm kích thước font */
  color: #999;
  text-decoration: line-through;
  margin-left: 8px;
`;

const OfferSection = styled.div`
  
  border: 1px dashed #1DA0F1; /* Border for definition */
  border-radius: 8px; /* Rounded corners */
  padding: 10px 25px 0 25px; /* Padding for spacing */
  margin-top: 20px; /* Space above the offer section */
  
  width: 570px;
`;

const OfferTitle = styled(Divider)`
  font-size: 20px; /* Larger title font size */
  font-weight: bold; /* Bold title */
  color: green; /* A contrasting color for visibility */
  text-align: left; /* Align title to the left */
  margin-bottom: 16px; /* Space below title */
  
  
`;

const BenefitList = styled.ul`
  list-style-type: none; /* Remove default list style */
  padding: 0; /* Remove default padding */
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 18px; /* Font size */
  color: black !important; /* Default text color */
  margin: 8px 0; /* Spacing between items */
  position: relative; /* Positioning for icon */
  padding-left: 24px; /* Space for icon */
  transition: transform 0.2s; /* Animation effect */

  &:before {
    content: '✔'; /* Check mark icon */
    position: absolute; /* Position absolute for icon */
    left: 0; /* Align to the left */
    color: #1DA0F1; /* Icon color */
    font-size: 16px; /* Icon size */
  }

  /* Hover effect */
  &:hover {
    transform: translateY(-2px); /* Slight lift on hover */
    color: black; /* Darker text color on hover */
  }
`;


const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 16px 0;
`;

const CustomButton = styled(Button)`
  width: 150px;
  height: 40px;
  font-weight: bold;
  margin-right: 20px;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* Cho phép các khối xuống hàng */
  margin-bottom: 16px;
  
`;

const ChoiceBlock = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 16px; /* Khoảng cách giữa các khối */
  margin-bottom: 8px; /* Khoảng cách dưới cho các khối xuống hàng */
  flex: 0 0 100px; /* Chiều rộng cố định cho các khối */
  justify-content: center; /* Canh giữa */
  width: 300px;
  border: 1px solid #e0e0e0;
  border: ${({ isSelected }) => (isSelected ? '2px solid #1DA0F1' : '2px solid #e0e0e0')};
  background-color: ${({ isSelected }) => (isSelected ? '#f7fcfe' : 'white')};
`;



const ChoiceImage = styled.img`
  width: 50px; /* Kích thước hình ảnh nhỏ hơn */
  height: 50px;
  margin-right: 10px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Canh trái cho văn bản */
`;

const RadioGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityButton = styled(Button)`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const QuantityDisplay = styled.div`
  width: 50px;
  text-align: center;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  line-height: 30px;
`;

const HighlightText = styled.span`
  color: #1DA0F1;
`;

// Điều chỉnh màu nền và viền cho Radio Button của size khi chọn
const StyledRadioButton = styled(Radio.Button)`
  width: 60px;
  text-align: center;
  border: 2px solid #e0e0e0;
  background-color: ${({ isSelected }) => (isSelected ? '#89c2f7' : 'white')}; // xanh nhạt hơn khi được chọn
  color: ${({ isSelected }) => (isSelected ? 'white' : 'black')}; // đổi màu chữ khi chọn
`;

export { 
    HighlightText,
    StyledRadioButton,
    CardWrapper, 
    ImageBlock, 
    ImageWrapper, 
    ThumbnailList, 
    ThumbnailWrapper, 
    Thumbnail, 
    NavButton, 
    InfoBlock, 
    Price, 
    Price2, 
    DiscountedPrice, 
    OfferSection, 
    OfferTitle, 
    BenefitList, 
    BenefitItem, 
    ActionsWrapper, 
    CustomButton, 
    OptionWrapper, 
    ChoiceBlock, 
    ChoiceImage, 
    RightSide, 
    RadioGroupWrapper, 
    QuantityWrapper, 
    QuantityButton, 
    QuantityDisplay 
  } 