// style.js
import styled from 'styled-components';
import { Button, Input } from 'antd';

export const ImageBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 24px;
`;

export const ImageWrapper = styled.div`
  width: 250px;
  img {
    width: 100%;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-bottom: 10px;
  }
`;

export const ThumbnailList = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

export const ThumbnailWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 240px;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
`;

export const Thumbnail = styled.img`
  width: 50px;
  height: 40px;
  border: ${({ active }) => (active ? '2px solid #1890ff' : '1px solid #e0e0e0')};
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.3s ease;
  scroll-snap-align: start;
  margin: 5px;

  &:hover {
    border-color: #1890ff;
  }
`;

export const NavButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: none;
`;

export const Wrapper = styled.div`
  padding: 20px;
  
  width: 80%;
  margin: 0 auto;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px; /* Thêm margin cho Container */
  padding: 30px; /* Khoảng cách bên trong cho nội dung */
  border-radius: 8px; /* Thêm bo tròn góc */
  background-color: #ffffff; /* Màu nền cho Container */
  border: 0.1px solid #dce1e3;
  box-shadow:0px 0px 2px black;
`;

export const LeftSection = styled.div`
  flex: 1;
  margin-right: 20px;
`;

export const RightSection = styled.div`
  flex: 2;
`;

export const Title = styled.h2`
  text-align: center;
  color: #1890ff;
  margin-top: 0px;
`;

export const StyledInput = styled(Input)`
  margin-bottom: 15px;
  width: 100%;
`;

export const TableWrapper = styled.div`
  width: 48%; /* Adjust the width of each table */
  border: 0.1px solid #dce1e3;
  box-shadow:0px 0px 2px black;
  border-radius: 8px; /* Thêm bo tròn góc */
  padding: 20px;
`;
