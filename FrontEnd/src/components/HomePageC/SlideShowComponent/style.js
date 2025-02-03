import styled from "styled-components";

export const SlideItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 100vw 50vh;
  background-repeat: no-repeat;
  height: 50vh;
  background-image: ${({ background }) => `url(${background})`};
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 1024px) { /* Máy tính bảng */
    background-size: 100vw 40vh;
    height: 40vh;
  }

  @media (max-width: 768px) { /* Điện thoại ngang */
    background-size: 100vw 30vh;
    height: 30vh;
  }

  @media (max-width: 480px) { /* Điện thoại dọc */
    background-size: 100vw 25vh;
    height: 25vh;
  }
`;
