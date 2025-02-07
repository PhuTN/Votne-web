import React, { useEffect, useState } from 'react';
import { Layout, Row, Col } from 'antd';
import { ShoppingCartOutlined, DollarCircleOutlined, ProductOutlined, UserOutlined, GiftOutlined } from '@ant-design/icons';
import DashboardBox from './DashboardBox';
import { categories, columnsProduct, dataProduct } from '../../../models/fake-data';
import AdminTableComponent from '../AdminTableComponent/AdminTableComponent';
import { Bar, Pie } from 'react-chartjs-2';  // Import Pie Chart
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { DashBoard } from './style'
import axios from "axios";

// Đăng ký các thành phần cần thiết cho cả Bar và Pie
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);

// Example data for the bar chart
const reportData = [
  { id: 1, month: 'Tháng 1', year: 2024, revenue: 1000000, quantitySold: 150 },
  { id: 2, month: 'Tháng 2', year: 2024, revenue: 1200000, quantitySold: 180 },
  { id: 3, month: 'Tháng 3', year: 2024, revenue: 1300000, quantitySold: 200 },
  { id: 4, month: 'Tháng 4', year: 2024, revenue: 1500000, quantitySold: 220 },
  { id: 5, month: 'Tháng 5', year: 2024, revenue: 1700000, quantitySold: 250 },
  { id: 6, month: 'Tháng 6', year: 2024, revenue: 1800000, quantitySold: 270 },
  { id: 7, month: 'Tháng 7', year: 2024, revenue: 2000000, quantitySold: 300 },
  { id: 8, month: 'Tháng 8', year: 2024, revenue: 2200000, quantitySold: 320 },
  { id: 9, month: 'Tháng 9', year: 2024, revenue: 2400000, quantitySold: 350 },
  
];

// Chart configuration for Bar chart


const optionsBar = {
  plugins: {
    title: {
      display: true,
      text: 'Biểu đồ Doanh thu và Số lượng bán được 2025', // Tiêu đề của biểu đồ
      font: {
        size: 24,  // Thay đổi kích thước của tiêu đề (có thể tăng giá trị này nếu cần)
        weight: 'bold',  // Để tiêu đề đậm
      },
    },
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          const label = tooltipItem.dataset.label;
          const value = tooltipItem.raw;
          if (label === 'Doanh thu') {
            return `${label}: ${value.toLocaleString()} VND`;
          } else if (label === 'Số lượng bán được') {
            return `${label}: ${value}`;
          }
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return value.toLocaleString(); // Format the Y-axis labels for revenue
        },
      },
    },
    'right-y': { // Thiết lập trục y thứ hai cho số lượng bán được
      position: 'right',
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return value.toLocaleString(); // Format the Y-axis labels for quantity sold
        },
      },
    },
  },
};


// Pie chart data
const pieData = {
  labels: ['Vợt', 'Giày', 'Áo', 'Váy', 'Quần', 'Túi vợt', 'Ba lô', 'Phụ kiện'], // Categories
  datasets: [
    {
      label: 'Tỷ lệ bán được 2025',
      data: [15, 20, 25, 10, 5, 8, 7, 10], // Example data for the percentage of sales
      backgroundColor: [
        '#ff5733', '#33ff57', '#3357ff', '#f7c15c', '#d1f7c1', '#fc85ae', '#c6f4ff', '#ffeb64'
      ],
      borderColor: '#fff',
      borderWidth: 1,
    },
  ],
};

// Pie chart options
const optionsPie = {
  plugins: {
    title: {
      display: true,
      text: 'Tỷ lệ bán các sản phẩm năm 2025', // Tiêu đề cho biểu đồ Pie
      font: {
        size: 25, // Kích thước font tiêu đề
      },
    },
    legend: {
      position: 'bottom', // Đặt legend ở dưới đáy biểu đồ
      labels: {
        font: {
          size: 12, // Thu nhỏ font của chú thích
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}%`;
        },
      },
    },
  },
  layout: {
    margin: {
      top: 50, // Tăng khoảng cách phía trên của biểu đồ
    },
  },
};



// Cập nhật cấu trúc bảng sản phẩm bán chạy với cột "Số lượng bán được"
const updatedColumnsProduct = [
  ...columnsProduct, // Các cột đã có
  {
    title: 'Số lượng bán được',
    dataIndex: 'quantitySold', // Dữ liệu sẽ lấy từ trường này trong data
    key: 'quantitySold',
    render: (text) => <span>{text}</span>, // Hiển thị số lượng
  }
];

const AdminDashboardComponent = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [report1, setReport1] = useState([]);
  const [report2, setReport2] = useState(pieData);


  useEffect(() => {
    const fetchData = async () => {
      try { 
        const [customersRes, ordersRes, productsRes, revenueRes,orders,pieData] = await Promise.all([
          axios.get("http://localhost:8081/api/users/count/customers"),
          axios.get("http://localhost:8081/api/users/count/orders"),
          axios.get("http://localhost:8081/api/users/count/products"),
          axios.get("http://localhost:8081/api/users/count/revenue"),
          axios.get("http://localhost:8081/api/users/report/report1"),
          axios.get("http://localhost:8081/api/users/api/pie-data-by-type"),
        ]);

        setTotalCustomers(customersRes.data.totalCustomers);
        setTotalOrders(ordersRes.data.totalOrders);
        setTotalProducts(productsRes.data.totalProducts);
        setTotalRevenue(revenueRes.data.totalRevenue);
        setReport1(orders.data)
        setReport2(pieData.data)
        console.log("UUUUUUUU",pieData.data)
      } catch (error) {
        console.error("Lỗi khi gọi API:", error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  const totalData = [
    {
      title: "Tổng khách hàng",
      value: totalCustomers,
      icon: <UserOutlined />,
      color: ["#1da256", "#48d483"],
    },
    {
      title: "Tổng đơn hàng",
      value: totalOrders,
      icon: <ShoppingCartOutlined />,
      color: ["#c012e2", "#eb64fe"],
    },
    {
      title: "Tổng sản phẩm",
      value: totalProducts,
      icon: <GiftOutlined />,
      color: ["#e1950e", "#f3cd29"],
    },
    {
      title: "Doanh thu",
      value: totalRevenue,
      icon: <DollarCircleOutlined />,
      color: ["#007bff", "#00aaff"], // Đổi màu xanh dương
    },
  ];
  
  console.log("REEEEEE",report1)
  const dataBar = {
    labels: report1?.map(item => item.month), // Months on the X-axis
    datasets: [
      {
        label: 'Doanh thu',
        data: report1?.map(item => item.revenue), // Revenue data on the Y-axis
        backgroundColor: 'rgb(75, 192, 192)', // Bar color
        borderColor: 'rgb(75, 192, 192)', // Border color
        borderWidth: 1,
      },
      {
        label: 'Số lượng bán được',
        data: report1?.map(item => item.quantitySold), // Quantity sold data on the Y-axis
        backgroundColor: 'rgb(255, 159, 64)', // Bar color for quantity sold
        borderColor: 'rgb(255, 159, 64)', // Border color
        borderWidth: 1,
        yAxisID: 'right-y', // Thêm ID cho y-axis của số lượng bán được
      },
    ],
  }; 
  console.log("REPORT",report2)
  return (
    <div>
      <Row gutter={[16, 16]} style={{ margin: "5px 15px" }}>
        {totalData?.map((item) => (
          <Col span={6} key={item.title}>
            <DashboardBox title={item.title} value={item.value} icon={item.icon} color={item.color} />
          </Col>
        ))}
      </Row>

      <DashBoard>
  <Col
    xs={{ span: 20 }}
    sm={{ span: 20 }}
    md={{ span: 20 }}
    lg={{ span: 20 }}
    xl={{ span: 10 }}
  >
    <div
      style={{
        width: "100%",
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Bar
        data={dataBar}
        options={optionsBar}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  </Col>
  <Col
    xs={{ span: 20 }}
    sm={{ span: 20 }}
    md={{ span: 20 }}
    lg={{ span: 20 }}
    xl={{ span: 10 }}
  >
    <div
      style={{
        width: "100%",
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"39px"
      }}
    >
      <Pie
        data={report2}
        options={optionsPie}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  </Col>
</DashBoard>


      {/* <Row gutter={[10, 10]} style={{ margin: '25px 10px' }}>
        <Col span={24}>
          <AdminTableComponent
            title={"Sản phẩm bán chạy"}
            onChange={handleChange}
            options={categories}
            defaultValue={categories[0].value}
            columns={updatedColumnsProduct}
            data={dataProduct}
          />
        </Col>
      </Row> */}
    </div>
  );
};

export default AdminDashboardComponent;
