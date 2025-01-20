import { Button, Flex, Layout, Space } from "antd";
import styled from "styled-components";

const DashboardButton = styled(Button)`
    height: 120px;
    border-radius: 10px;
    
    display: flex; // Đảm bảo sử dụng flexbox
    justify-content: space-between; // Căn chỉnh nội dung
    @media (max-width: 1132px){
    flex-direction: column;
    
    }
`

const ButtonSpace = styled(Space)`
    color: #03045e;
    font-size: 30px;
    flex: 1;
    padding: 10px;
    text-align: left; // Căn chỉnh chữ sang bên trái
    @media (max-width: 1132px){
    flex: 1;
    flex-direction: column;
    padding: 0px;
    font-size: 30px;
    
}
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

const DashBoard = styled(Layout)`
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-between;
@media (max-width: 1200px){
flex-direction: column;
justify-content: center;
}
`
    
        
    

export {DashBoard,DataLayout,DashboardButton, ButtonSpace}
