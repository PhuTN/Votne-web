import { Button, Card } from "antd";
import styled from "styled-components";

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .ant-card-body {
    display: flex;
    align-items: center;
    padding: 12px;
  }

  @media (max-width: 768px) {
    .ant-card-body {
      padding: 8px;
    }
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 16px;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const SuggestWrapper = styled.div`
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #d9d9d9;
  position: absolute;
  width: 500px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    width: 350px;
   margin-top: 35px;
   left: 50%;
  transform: translateX(-52%);
  }
`;

const ItemName = styled.h3`
  text-align: left;
  max-width: 300px;
  line-height: 1.5;
  max-height: 3em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;

  &:hover {
    color: #1DA0F1;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    max-width: 250px;
  }
`;

const TagButton = styled(Button)`
  margin: 5px;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

export { TagButton, ItemName, SuggestWrapper, StyledCard, ProductImage };
