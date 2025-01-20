import styled from "styled-components"



export const SlideItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-size:  100vw 50vh;
background-repeat: no-repeat;
  height: 50vh;
  background-image: ${({ background }) => `url(${background})`};
  &:hover{
    cursor:pointer;
  }
`