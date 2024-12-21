import { Button, Layout, Space } from "antd";
import styled from "styled-components";

const DashboardButton = styled(Button)`
    width: 100%; // Thay đổi chiều rộng để chiếm toàn bộ không gian
    height: 120px;
    border-radius: 10px;
    display: flex; // Đảm bảo sử dụng flexbox
    justify-content: space-between; // Căn chỉnh nội dung
`

const ButtonSpace = styled(Space)`
    color: #03045e;
    font-size: 30px;
    flex: 1;
    padding: 10px;
    text-align: left; // Căn chỉnh chữ sang bên trái
`


const DataLayout = styled(Layout)`
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
    background-color: #ffffff;

    .ant-table-thead > tr > th {
        background-color: #1E90FF; // Blue header color
        color: #ffffff;            // White text color for header
        font-weight: bold;
        text-align: center;
    }

    .ant-table-row-light {
        background-color: #f9f9f9;
    }

    .ant-table-row-dark {
        background-color: #ffffff;
    }
`;


export {DataLayout,DashboardButton, ButtonSpace}
