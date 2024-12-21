import React from "react";
import styled from "styled-components";
import { Tabs, Typography, Table } from "antd";

const { TabPane } = Tabs;
const { Text, Title } = Typography;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav .ant-tabs-tab {
    flex: 1; /* Mỗi tab sẽ chiếm 50% chiều rộng */
    text-align: center; /* Căn giữa nội dung trong tab */
    font-size: 20px; /* Kích thước phông chữ */
  }
`;

const ProductDetails = ({ product }) => {
  const columns = [
    {
      title: "Thông Số",
      dataIndex: "label",
      key: "label",
      width: "30%",
      render: text => <Text strong>{text}:</Text>
    },
    {
      title: "Chi Tiết",
      dataIndex: "value",
      key: "value",
      width: "70%",
      render: value => (
        <Text>{Array.isArray(value) ? value.join("; ") : value}</Text>
      )
    }
  ];

  return (
    <StyledTabs defaultActiveKey="1">
      <TabPane tab="Mô Tả Sản Phẩm" key="1">
        <div>
          <Title level={5}>Mô Tả Sản Phẩm</Title>
          <Text>
          <div
        dangerouslySetInnerHTML={{
          __html: product.description.replace(/\n/g, '<br/>'),
        }}
      />
    </Text>
        </div>
      </TabPane>
      <TabPane tab="Thông Số" key="2">
        <div style={{ padding: "0px" }}>
          <Table 
            columns={columns} 
            dataSource={product.specifications} 
            pagination={false} 
            rowKey="label"
            bordered
            style={{ width: "100%" }} 
          />
        </div>
      </TabPane>
    </StyledTabs>
  );
};

export default ProductDetails;
