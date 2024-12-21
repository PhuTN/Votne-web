import React from 'react';
import { Layout, Row, Col } from 'antd';
import { ShoppingCartOutlined, DollarCircleOutlined, ProductOutlined, UserOutlined, GiftOutlined } from '@ant-design/icons';
import DashboardBox from './DashboardBox';
import { categories, columnsProduct, dataProduct } from '../../../models/fake-data';
import AdminTableComponent from '../AdminTableComponent/AdminTableComponent';
import { Bar, Pie } from 'react-chartjs-2';  // Import Pie Chart
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';

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
  { id: 10, month: 'Tháng 10', year: 2024, revenue: 2600000, quantitySold: 380 },
];

// Chart configuration for Bar chart
const dataBar = {
  labels: reportData.map(item => item.month), // Months on the X-axis
  datasets: [
    {
      label: 'Doanh thu',
      data: reportData.map(item => item.revenue), // Revenue data on the Y-axis
      backgroundColor: 'rgb(75, 192, 192)', // Bar color
      borderColor: 'rgb(75, 192, 192)', // Border color
      borderWidth: 1,
    },
    {
      label: 'Số lượng bán được',
      data: reportData.map(item => item.quantitySold), // Quantity sold data on the Y-axis
      backgroundColor: 'rgb(255, 159, 64)', // Bar color for quantity sold
      borderColor: 'rgb(255, 159, 64)', // Border color
      borderWidth: 1,
      yAxisID: 'right-y', // Thêm ID cho y-axis của số lượng bán được
    },
  ],
};

const optionsBar = {
 
  plugins: {
    title: {
      display: true,
      text: 'Biểu đồ Doanh thu và Số lượng bán được 2024', // Tiêu đề của biểu đồ
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
      label: 'Tỷ lệ bán được 2024',
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
      text: 'Tỷ lệ bán các sản phẩm năm 2024', // Tiêu đề cho biểu đồ Pie
      font: {
        size: 18, // Kích thước font tiêu đề
      },
    },
    legend: {
      position: 'top',
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
};


const totalData = [
  {
    title: "Tổng khách hàng",
    value: 10,
    icon: <UserOutlined />,
    color: ["#1da256", "#48d483"],
  },
  {
    title: "Tổng đơn hàng",
    value: 10,
    icon: <ShoppingCartOutlined />,
    color: ["#c012e2", "#eb64fe"],
  },
  
  {
    title: "Tổng sản phẩm",
    value: 10,
    icon: <GiftOutlined />,
    color: ["#e1950e", "#f3cd29"],
  },
  {
    title: "Doanh thu",
    value: 10,
    icon: <DollarCircleOutlined />,
    color: ["#1da256", "#48d483"],
  },
];

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
  const handleChange = (value) => {
    // Đổi dữ liệu hiển thị trên table
  };

  return (
    <div>
      <Row gutter={[20, 20]} style={{ margin: "5px 30px" }}>
        {totalData.map((item) => (
          <Col span={6} key={item.title}>
            <DashboardBox title={item.title} value={item.value} icon={item.icon} color={item.color} />
          </Col>
        ))}
      </Row>

      <Row gutter={[30, 10]} style={{ margin: '100px 25px 100px 10px', display: 'flex', justifyContent: 'space-between' }}>
        <Col span={10}> {/* Điều chỉnh span để thu nhỏ biểu đồ */}
          <div style={{
            width: '100%',
            height: '500px', // Giới hạn chiều cao của biểu đồ Bar
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Bar data={dataBar} options={optionsBar} style={{ width: '100%', height: '100%' }} />
          </div>
        </Col>
        <Col span={10}>
          <div style={{
            width: '100%',
            height: '500px', // Giới hạn chiều cao của biểu đồ Pie
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Pie data={pieData} options={optionsPie} style={{ width: '100%', height: '100%' }} />
          </div>
        </Col>
      </Row>

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
