import React from 'react';
import { Breadcrumb } from 'antd';
import styled from 'styled-components';

const BreadcrumbWrapper = styled.div`
  padding: 16px 0 16px 15px;
  background-color: rgb(245, 245, 245);
  display: flex; /* Sử dụng flexbox */
  justify-content: center; /* Căn giữa nội dung */
`;

const StyledBreadcrumb = styled(Breadcrumb)`
  font-size: 16px;
  width: 1200px;
  margin-left: 10px;

  /* Đặt màu chữ cho các mục breadcrumb */
  .ant-breadcrumb-link {
    color: black !important; /* Đảm bảo màu chữ là đen */
  }

  .ant-breadcrumb-separator {
    color: black !important; /* Đặt màu cho dấu phân cách cũng là đen */
  }
`;

const CustomBreadcrumb = ({ items }) => {
  return (
    <BreadcrumbWrapper>
      <StyledBreadcrumb separator=">">
        {items.map((item, index) => (
          <Breadcrumb.Item key={index}>
            <a href={item.path} style={{ color: 'black' }}>{item.label}</a> {/* Đặt màu chữ của liên kết tại đây */}
          </Breadcrumb.Item>
        ))}
      </StyledBreadcrumb>
    </BreadcrumbWrapper>
  );
};

export default CustomBreadcrumb;
