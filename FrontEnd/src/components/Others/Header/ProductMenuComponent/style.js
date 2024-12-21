import styled from "styled-components";

const CategoryContainer = styled.div`
    padding: 10px;
 
  text-align: left;
 background-color: white;
 color: black;
 border: 1px solid #ccc; 
 
 
 

`;

const CategoryTitle = styled.h3`
  color: #1DA0F1; 
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 30px;
`;

const BrandList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BrandItem = styled.li`
  margin-bottom: 5px;
  &:hover{
    color: #1DA0F1;
    cursor: pointer;
  }
`;

const SeeMore = styled.a`
  color: #1DA0F1;
  font-weight: bold;
  cursor: pointer;
`;

export { CategoryContainer, BrandItem, BrandList, CategoryTitle, SeeMore };
