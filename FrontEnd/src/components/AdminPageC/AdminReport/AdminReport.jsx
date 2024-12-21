import React, { useState } from 'react';
import { Button, Row, Col, Table, Select } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { filtersData } from '../../../models/fake-data'; // Assuming filtersData is imported from a separate file

const AdminReport = () => {
    // Dữ liệu mẫu cho bảng report
    const reportData = [
        { id: 1, month: 'Tháng 1', year: 2023, revenue: 1000000, productsSold: 150 },
        { id: 2, month: 'Tháng 2', year: 2023, revenue: 1200000, productsSold: 180 },
        { id: 3, month: 'Tháng 3', year: 2023, revenue: 1300000, productsSold: 200 },
    ];

    // Dữ liệu mẫu cho bảng sản phẩm
    const productData = {
        1: [
            { id: 101, productName: 'Vợt cầu lông A', category: 'Vợt', brand: 'Yonex', price: 200000, discountPrice: 180000, rating: 4.5, monthlySales: 30 },
            { id: 102, productName: 'Vợt cầu lông B', category: 'Vợt', brand: 'Li-Ning', price: 250000, discountPrice: 230000, rating: 4.0, monthlySales: 20 },
        ],
        2: [
            { id: 103, productName: 'Giày cầu lông C', category: 'Giày', brand: 'Victor', price: 150000, discountPrice: 140000, rating: 4.2, monthlySales: 25 },
        ],
        3: [
            { id: 104, productName: 'Áo cầu lông D', category: 'Áo', brand: 'Yonex', price: 100000, discountPrice: 95000, rating: 4.3, monthlySales: 15 },
        ],
    };

    const [selectedMonthProducts, setSelectedMonthProducts] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    // Extract the brand filter items from filtersData
    const brandFilters = filtersData.find(filter => filter.key === 'brand')?.items || [];

    // Định nghĩa các cột cho bảng báo cáo
    const reportColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id', align: 'left' },
        { 
            title: 'Tháng', 
            dataIndex: 'month', 
            key: 'month', 
            align: 'left',
            filters: [
                { text: 'Tháng 1', value: 'Tháng 1' },
                { text: 'Tháng 2', value: 'Tháng 2' },
                { text: 'Tháng 3', value: 'Tháng 3' },
                { text: 'Tháng 4', value: 'Tháng 4' },
                { text: 'Tháng 5', value: 'Tháng 5' },
                { text: 'Tháng 6', value: 'Tháng 6' },
                { text: 'Tháng 7', value: 'Tháng 7' },
                { text: 'Tháng 8', value: 'Tháng 8' },
                { text: 'Tháng 9', value: 'Tháng 9' },
                { text: 'Tháng 10', value: 'Tháng 10' },
                { text: 'Tháng 11', value: 'Tháng 11' },
                { text: 'Tháng 12', value: 'Tháng 12' },
            ],
            onFilter: (value, record) => record.month.includes(value),
        },
        { 
            title: 'Năm', 
            dataIndex: 'year', 
            key: 'year', 
            align: 'left',
            filters: [
                { text: '2023', value: '2023' },
                { text: '2024', value: '2024' },
            ],
            onFilter: (value, record) => record.year.toString().includes(value),
        },
        { 
            title: 'Doanh số', 
            dataIndex: 'revenue', 
            key: 'revenue', 
            align: 'right',
            sorter: (a, b) => a.revenue - b.revenue,
        },
        { 
            title: 'Sản phẩm bán được', 
            dataIndex: 'productsSold', 
            key: 'productsSold', 
            align: 'right',
            sorter: (a, b) => a.productsSold - b.productsSold,
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: () => (
                <Button icon={<FileExcelOutlined />} type="primary">
                    Xuất Excel
                </Button>
            ),
        },
    ];

    // Định nghĩa các cột cho bảng sản phẩm
    const productColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id', align: 'left' },
        { 
            title: 'Tên sản phẩm', 
            dataIndex: 'productName', 
            key: 'productName', 
            align: 'left',
        },
        { 
            title: 'Loại sản phẩm', 
            dataIndex: 'category', 
            key: 'category', 
            align: 'left',
            filters: [
                { text: 'Vợt', value: 'Vợt' },
                { text: 'Giày', value: 'Giày' },
                { text: 'Áo', value: 'Áo' },
                { text: 'Váy', value: 'Váy' },
                { text: 'Quần', value: 'Quần' },
                { text: 'Túi vợt', value: 'Túi vợt' },
                { text: 'Ba lô', value: 'Ba lô' },
                { text: 'Phụ kiện', value: 'Phụ kiện' },
            ],
            onFilter: (value, record) => record.category.includes(value),
        },
        { 
            title: 'Thương hiệu', 
            dataIndex: 'brand', 
            key: 'brand', 
            align: 'left',
            filters: brandFilters.map(brand => ({ text: brand, value: brand })),
            onFilter: (value, record) => record.brand.includes(value),
        },
        { 
            title: 'Giá', 
            dataIndex: 'price', 
            key: 'price', 
            align: 'right',
            sorter: (a, b) => a.price - b.price,
        },
        { 
            title: 'Giá giảm', 
            dataIndex: 'discountPrice', 
            key: 'discountPrice', 
            align: 'right',
            sorter: (a, b) => a.discountPrice - b.discountPrice,
        },
        // { title: 'Đánh giá', dataIndex: 'rating', key: 'rating', align: 'center', 
        //     sorter: (a, b) => a.rating - b.rating,
        // },
        { 
            title: 'Số lượng bán trong tháng', 
            dataIndex: 'monthlySales', 
            key: 'monthlySales', 
            align: 'right',
            sorter: (a, b) => a.monthlySales - b.monthlySales,
        },
    ];

    // Xử lý khi nhấn vào hàng trong bảng báo cáo
    const onReportRowClick = (record) => {
        setSelectedMonth(record.month);
        setSelectedYear(record.year);
        setSelectedMonthProducts(productData[record.id] || []);
    };

    return (
        <div style={{ marginTop: '50px' }}>
            <h2 style={{ marginBottom: '70px' }}>Doanh thu</h2>
            <Row gutter={16}>
                <Col span={12}>
                    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                        <Table
                            columns={reportColumns}
                            dataSource={reportData}
                            onRow={(record) => ({
                                onClick: () => onReportRowClick(record),
                            })}
                            rowKey="id"
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                        <div style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '16px' }}>
                            {selectedMonth && selectedYear ? `${selectedMonth} / ${selectedYear}` : 'Chọn tháng'}
                        </div>
                        <Table
                            columns={productColumns}
                            dataSource={selectedMonthProducts}
                            rowKey="id"
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AdminReport;
