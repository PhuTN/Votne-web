import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px auto;
  max-width: 1500px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 10px;
  width: 275px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const IconWrapper = styled.div`
  font-size: 24px;
  color: #1DA0F1;
  margin-bottom: 10px;
`;

export const Title = styled.h3`
  font-size: 16px;
  color: #1DA0F1;
  font-weight: bold;
  margin: 0;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #757575;
  text-align: center;
  margin-top: 5px;
`;
