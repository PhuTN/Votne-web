import styled from "styled-components"



export const SlideItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  height: 500px;
  background-image: ${({ background }) => `url(${background})`};
  &:hover{
    cursor:pointer;
  }
`