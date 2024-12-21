import { Button, Progress, Rate, Select, Space } from "antd";

import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';



export const columnsProduct = [
  {
      title: 'ID',
      dataIndex: 'productID',
      align: 'left',
  },
  {
      title: 'Tên sản phẩm',
      dataIndex: 'product',
      render: (text) => <span style={{ color: '#000' }}>{text}</span>,
      align: 'left',
  },
  
  {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      align: 'left',
  },
  {
      title: 'Giá',
      dataIndex: 'price',
      render: (price) => (
          <span>
              {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </span>
      ),
      align: 'left',
  },
  {
      title: 'Giá giảm',
      dataIndex: 'discountPrice',
      render: (discountPrice) => (
          <span>
              {discountPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </span>
      ),
      align: 'left',
  },
  // {
  //     title: 'Đánh giá',
  //     dataIndex: 'rating',
  //     render: (rating) => <Rate value={rating} disabled allowHalf />,
  // },
  {
      title: 'Số lượng bán được',
      dataIndex: 'soldQuantity',
      align: 'left',
  },
  {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (text, record) => (
          <Space>
              <Button
                  type="default"
                  icon={<EditOutlined />}
                  onClick={() => console.log('Edit', record)}
                  style={{ backgroundColor: '#2ecc71', borderColor: '#2ecc71', color: '#fff' }}
                  data-testid={`${record.productID}`} 
              />
          </Space>
      ),
  },
];

export const dataProduct = [
  {
      key: 1,
      productID: 'P001',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 2.7,
      discountPrice: 90000,
      soldQuantity: 50,
  },
  {
      key: 2,
      productID: 'P002',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 45,
  },
  {
      key: 3,
      productID: 'P003',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 60,
  },
  {
      key: 4,
      productID: 'P004',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 70,
  },
  {
      key: 5,
      productID: 'P005',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 55,
  },
  {
      key: 6,
      productID: 'P006',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 65,
  },
  {
      key: 7,
      productID: 'P007',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 75,
  },
  {
      key: 8,
      productID: 'P008',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 85,
  },
  {
      key: 9,
      productID: 'P009',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 90,
  },
  {
      key: 10,
      productID: 'P010',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 80,
  },
  {
      key: 11,
      productID: 'P011',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 95,
  },
  {
      key: 12,
      productID: 'P012',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 100,
  },
  {
      key: 13,
      productID: 'P013',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 105,
  },
  {
      key: 14,
      productID: 'P014',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 110,
  },
  {
      key: 15,
      productID: 'P015',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 115,
  },
  {
      key: 16,
      productID: 'P016',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 120,
  },
  {
      key: 17,
      productID: 'P017',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 125,
  },
  {
      key: 18,
      productID: 'P018',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 130,
  },
  {
      key: 19,
      productID: 'P019',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 135,
  },
  {
      key: 20,
      productID: 'P020',
      product: 'Vợt cầu lông loại 1',
      category: 'Vợt cầu lông',
      brand: 'Yonex',
      price: 100000,
      rating: 5,
      discountPrice: 90000,
      soldQuantity: 140,
  },
];


export const dataOrders = [
    {
        key: 1,
        orderId: 'ORD001',
        products: 'Xem sản phẩm',
        name: 'Nguyễn Văn A',
        phoneNumber: '0901234567',
        address: '123 Đường A, Quận B, TP.HCM',
        totalAmount: 500000,
        email: 'nguyenvana@example.com',
        userId: 'USER001',
        orderStatus: 'processing',
        dateCreated: '2023-10-01',
    },
    {
        key: 2,
        orderId: 'ORD002',
        products: 'Xem sản phẩm',
        name: 'Trần Thị B',
        phoneNumber: '0902345678',
        address: '456 Đường C, Quận D, Hà Nội',
        totalAmount: 750000,
        email: 'tranthib@example.com',
        userId: 'USER002',
        orderStatus: 'delivered',
        dateCreated: '2023-10-05',
    },
    {
        key: 3,
        orderId: 'ORD003',
        products: 'Xem sản phẩm',
        name: 'Lê Văn C',
        phoneNumber: '0903456789',
        address: '789 Đường E, Quận F, Đà Nẵng',
        totalAmount: 1200000,
        email: 'levanc@example.com',
        userId: 'USER003',
        orderStatus: 'cancelled',
        dateCreated: '2023-10-10',
    },
    {
        key: 4,
        orderId: 'ORD004',
        products: 'Xem sản phẩm',
        name: 'Phạm Thị D',
        phoneNumber: '0904567890',
        address: '101 Đường G, Quận H, TP.HCM',
        totalAmount: 320000,
        email: 'phamthid@example.com',
        userId: 'USER004',
        orderStatus: 'processing',
        dateCreated: '2023-10-12',
    },
    {
        key: 5,
        orderId: 'ORD005',
        products: 'Xem sản phẩm',
        name: 'Hoàng Văn E',
        phoneNumber: '0905678901',
        address: '112 Đường I, Quận J, Cần Thơ',
        totalAmount: 880000,
        email: 'hoangvane@example.com',
        userId: 'USER005',
        orderStatus: 'delivered',
        dateCreated: '2023-10-15',
    },
    {
        key: 6,
        orderId: 'ORD006',
        products: 'Xem sản phẩm',
        name: 'Đặng Thị F',
        phoneNumber: '0906789012',
        address: '113 Đường K, Quận L, Nha Trang',
        totalAmount: 450000,
        email: 'dangthif@example.com',
        userId: 'USER006',
        orderStatus: 'processing',
        dateCreated: '2023-10-20',
    },
];


export const columnsOrder = [
    {
        title: 'Mã đơn hàng',
        dataIndex: 'orderId',
        key: 'orderId',
        align: 'left',
        
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'products',
        key: 'products',
        render: () => (
            <Button type="link" >
                Xem sản phẩm
            </Button>
        ),
        align: 'left',
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'name',
        key: 'name',
        align: 'left',
        
        onFilter: (value, record) => record.name.includes(value),
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        align: 'left',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
        align: 'left',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        render: (amount) => `${amount.toLocaleString()} VND`,
        align: 'left',
        sorter: (a, b) => a.totalAmount - b.totalAmount, // Numeric sorting
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        align: 'left',
    },
    {
        title: 'Mã khách hàng',
        dataIndex: 'userId',
        key: 'userId',
        align: 'left',
    },
    {
        title: 'Trạng thái đơn hàng',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        align: 'left',
        filters: [
            { text: 'Đang xử lý', value: 'processing' },
            { text: 'Đã giao hàng', value: 'delivered' },
            { text: 'Đã hủy', value: 'cancelled' },
            { text: 'Xử lý đổi trả', value: 'returning' },
            { text: 'Hoàn tất', value: 'finish' },
        ],
        onFilter: (value, record) => record.orderStatus === value,
        render: (status) => (
            <Select
                defaultValue={status}
                style={{ width: 150 }}
                options={[
                    { label: 'Đang xử lý', value: 'processing' },
                    { label: 'Đã giao hàng', value: 'delivered' },
                    { label: 'Đã hủy', value: 'cancelled' },
                    { label: 'Xử lý đổi trả', value: 'returning' },
                    { label: 'Hoàn tất', value: 'finish' },
                ]}
                onChange={(value) => console.log('Order Status Changed:', value)}
            />
        ),
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'dateCreated',
        key: 'dateCreated',
        render: (date) => new Date(date).toLocaleDateString(),
        align: 'left',
        sorter: (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated), // Date sorting
    },
];
export const orderCategories = [
    {
        label: 'Mã đơn hàng',
        value: 'orderId',
    },
    
    {
        label: 'Tên khách hàng',
        value: 'name',
    },
    {
        label: 'Số điện thoại',
        value: 'phoneNumber',
    },
    {
        label: 'Địa chỉ',
        value: 'address',
    },
    {
        label: 'Tổng tiền',
        value: 'totalAmount',
    },
    {
        label: 'Email',
        value: 'email',
    },
    {
        label: 'Mã khách hàng',
        value: 'userId',
    },
    {
        label: 'Ngày tạo',
        value: 'dateCreated',
    },
];

export const categories = [
    {
        label: "Tất cả",
        value: 0,
    },
    {
        label: "Vợt Cầu Lông",
        value: 1,
    },
    {
        label: "Giày Cầu Lông",
        value: 2,
    },
    {
        label: "Áo Cầu Lông",
        value: 3,
    },
];
export const accounts = [
    {
        label: 'Tất cả',
        value: 0,
    },
    {
        label: 'Admin',
        value: 1,
    },
    {
        label: 'Nhân viên',
        options: [
            {
                label: 'Nhân viên',
                value: 2,
            },
            {
                label: 'Nhân viên kiểm kho',
                value: 3,
            },
            {
                label: 'Nhân viên chốt đơn',
                value: 4,
            },
            {
                label: 'Nhân viên tư vấn',
                value: 5,
            },
        ]
    },
    {
        label: 'Khách hàng',
        value: 6,
    },
]

// models/fake-data.js

export const attributes = [
  { id: '1', attribute: 'Mức giá', status: 'Hoạt động' },
  { id: '2', attribute: 'Thương hiệu', status: 'Hoạt động' },
  { id: '3', attribute: 'Chiều dài vợt', status: 'Hoạt động' },
  { id: '4', attribute: 'Chiều dài cán vợt', status: 'Hoạt động' },
  { id: '5', attribute: 'Swingweight', status: 'Hoạt động' },
  { id: '6', attribute: 'Size', status: 'Hoạt động' },
  { id: '7', attribute: 'Điểm cân bằng', status: 'Hoạt động' },
  { id: '8', attribute: 'Độ cứng đũa', status: 'Hoạt động' },
  { id: '9', attribute: 'Phong cách chơi', status: 'Hoạt động' },
  { id: '10', attribute: 'Nội dung chơi', status: 'Hoạt động' },
  { id: '11', attribute: 'Trình độ chơi', status: 'Hoạt động' },
  { id: '12', attribute: 'Màu sắc', status: 'Hoạt động' },
];

export const values = {
  '1': [
    { id: '1-1', value: 'Giá dưới 500.000đ', status: 'Hoạt động' },
    { id: '1-2', value: '500.000đ - 1 triệu', status: 'Hoạt động' },
    { id: '1-3', value: '1 - 2 triệu', status: 'Hoạt động' },
    { id: '1-4', value: '2 - 3 triệu', status: 'Hoạt động' },
    { id: '1-5', value: 'Giá trên 3 triệu', status: 'Hoạt động' },
  ],
  '2': [
    { id: '2-1', value: 'VNB', status: 'Hoạt động' },
    { id: '2-2', value: 'Yonex', status: 'Hoạt động' },
    { id: '2-3', value: 'Lining', status: 'Hoạt động' },
    { id: '2-4', value: 'Victor', status: 'Hoạt động' },
    { id: '2-5', value: 'Forza', status: 'Hoạt động' },
    { id: '2-6', value: 'Protech', status: 'Hoạt động' },
    { id: '2-7', value: 'Kumpoo', status: 'Hoạt động' },
    { id: '2-8', value: 'Kawasaki', status: 'Hoạt động' },
    { id: '2-9', value: 'Adonex', status: 'Hoạt động' },
    { id: '2-10', value: 'Babolat', status: 'Hoạt động' },
    { id: '2-11', value: 'Hãng khác', status: 'Hoạt động' },
    { id: '2-12', value: 'IXE', status: 'Hoạt động' },
  ],
  '3': [
    { id: '3-1', value: '665 mm', status: 'Hoạt động' },
    { id: '3-2', value: '670 mm', status: 'Hoạt động' },
    { id: '3-3', value: '675 mm', status: 'Hoạt động' },
  ],
  '4': [
    { id: '4-1', value: '200 mm', status: 'Hoạt động' },
    { id: '4-2', value: '205 mm', status: 'Hoạt động' },
    { id: '4-3', value: '210 mm', status: 'Hoạt động' },
  ],
  '5': [
    { id: '5-1', value: 'Dưới 82 kg/cm2', status: 'Hoạt động' },
    { id: '5-2', value: '82-84 kg/cm2', status: 'Hoạt động' },
    { id: '5-3', value: '84-86 kg/cm2', status: 'Hoạt động' },
    { id: '5-4', value: '86-88 kg/cm2', status: 'Hoạt động' },
    { id: '5-5', value: 'Trên 88 kg/cm2', status: 'Hoạt động' },
  ],
  '6': [
    { id: '6-1', value: '2U: 90 - 94g', status: 'Hoạt động' },
    { id: '6-2', value: '3U: 85 - 89g', status: 'Hoạt động' },
    { id: '6-3', value: '4U: 80 - 84g', status: 'Hoạt động' },
    { id: '6-4', value: '5U: 75 - 79g', status: 'Hoạt động' },
    { id: '6-5', value: 'F: 70 - 74g', status: 'Hoạt động' },
    { id: '6-6', value: '2F: 65 - 69g', status: 'Hoạt động' },
  ],
  '7': [
    { id: '7-1', value: 'Nhẹ Đầu', status: 'Hoạt động' },
    { id: '7-2', value: 'Cân Bằng', status: 'Hoạt động' },
    { id: '7-3', value: 'Hơi Nặng Đầu', status: 'Hoạt động' },
    { id: '7-4', value: 'Nặng Đầu', status: 'Hoạt động' },
    { id: '7-5', value: 'Siêu Nặng Đầu', status: 'Hoạt động' },
  ],
  '8': [
    { id: '8-1', value: 'Dẻo', status: 'Hoạt động' },
    { id: '8-2', value: 'Trung Bình', status: 'Hoạt động' },
    { id: '8-3', value: 'Cứng', status: 'Hoạt động' },
    { id: '8-4', value: 'Siêu Cứng', status: 'Hoạt động' },
  ],
  '9': [
    { id: '9-1', value: 'Tấn Công', status: 'Hoạt động' },
    { id: '9-2', value: 'Công Thủ Toàn Diện', status: 'Hoạt động' },
    { id: '9-3', value: 'Phản Tạt, Phòng Thủ', status: 'Hoạt động' },
  ],
  '10': [
    { id: '10-1', value: 'Đánh Đơn', status: 'Hoạt động' },
    { id: '10-2', value: 'Đánh Đôi', status: 'Hoạt động' },
    { id: '10-3', value: 'Cả Đơn và Đôi', status: 'Hoạt động' },
  ],
  '11': [
    { id: '11-1', value: 'Mới Chơi', status: 'Hoạt động' },
    { id: '11-2', value: 'Trung Bình', status: 'Hoạt động' },
    { id: '11-3', value: 'Khá Tốt', status: 'Hoạt động' },
  ],
  '12': [
    { id: '12-1', value: 'Đỏ', status: 'Hoạt động' },
    { id: '12-2', value: 'Xanh', status: 'Hoạt động' },
    { id: '12-3', value: 'Vàng', status: 'Hoạt động' },
    { id: '12-4', value: 'Tím', status: 'Hoạt động' },
    { id: '12-5', value: 'Hồng', status: 'Hoạt động' },
    { id: '12-6', value: 'Cam', status: 'Hoạt động' },
    { id: '12-7', value: 'Lam', status: 'Hoạt động' },
  ],
};

  

  export const productData = {
    description: "This is a sample product description for Mô Tả Sản Phẩm.",
    specifications: [
      { label: "Trình Độ Chơi", value: ["Mới Chơi", "Khá Tốt"] },
      { label: "Nội Dung Chơi", value: ["Đánh Đơn", "Đánh Đôi"] },
      { label: "Phong Cách Chơi", value: ["Công Thủ Toàn Diện", "Tấn Công"] },
      { label: "Độ Cứng Đũa", value: ["Dẻo", "Trung Bình"] },
      { label: "Điểm Cân Bằng", value: ["Hơi Nặng Đầu", "Cân Bằng"] },
      { label: "Swingweight", value: ["82-84 kg/cm2", "85-87 kg/cm2"] },
      { label: "Chiều Dài Vợt", value: ["665 mm", "670 mm"] },
      { label: "Chiều Dài Cán Vợt", value: ["200 mm", "205 mm"] },
      { label: "Mức Giá", value: ["Giá dưới 500.000đ", "500.000đ - 1 triệu"] },
    ],
  };

  export const product = { 
    name: "Vợt Cầu Lông VNB V200 Xanh Chính Hãng", 
    code: "VNB004563", 
    brand: "VNB", 
    status: "Hoạt động", 
   
    colorOptions: [ 
      {  
        id: "color1",
        label: 'Xanh',  
        price: '600.000 đ',  
        discountedPrice: "900.000 đ",
        images: [
          "https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp", 
          "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-nanoflare-002f-chinh-hang-1_1712621616.webp"
        ], 
        stock: [
          { id: "stock1", size: '37', stock: 5 },
          { id: "stock2", size: '38', stock: 3 },
          { id: "stock3", size: '39', stock: 10 },
          { id: "stock4", size: '40', stock: 4 }
        ]
      }, 
      {  
        id: "color2",
        label: 'Đỏ',  
        price: '650.000 đ',  
        discountedPrice: "900.000 đ",
        images: [
          "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-nanoflare-002f-chinh-hang-1_1712621616.webp", 
          "https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp"
        ],  
        stock: [
          { id: "stock5", size: '37', stock: 2 },
          { id: "stock6", size: '38', stock: 0 },
          { id: "stock7", size: '39', stock: 5 },
          { id: "stock8", size: '40', stock: 1 }
        ]
      }
    ],
    benefits: [
      { id: "benefit1", description: "Tặng 1 đôi vớ cầu lông VNB", status: "Hoạt động",  },
      { id: "benefit2", description: "Sản phẩm cam kết chính hãng", status: "Hoạt động",  },
      { id: "benefit3", description: "Thanh toán sau khi kiểm tra", status: "Hoạt động",  }
    ]
  };


  export const filtersData = [
    {
      key: 'price',
      label: 'MỨC GIÁ',
      items: [
        'Giá dưới 500.000đ',
        '500.000đ - 1 triệu',
        '1 - 2 triệu',
        '2 - 3 triệu',
        'Giá trên 3 triệu'
      ],
    },
    {
      key: 'brand',
      label: 'THƯƠNG HIỆU',
      items: [
        'VNB', 'Yonex', 'Lining', 'Victor', 'Forza', 'Protech', 'Kumpoo', 'Kawasaki',
        'Apacs', 'Adonex', 'Babolat', 'Pebble Beach', 'Proace', 'Adidas', 'VS', 'DonexPro',
        'Hãng khác', 'Joto', 'Iron Man', 'Ashaway', 'Mizuno', 'Sunbatta', 'FlyPower',
        'Paramount', 'Tenway', 'FYKYMI', 'FUKYMI', 'Fleet', 'Maxta', 'Lotus', 'Pro Kennex',
        'Kamito', 'The 3rd Game', 'Felet', 'Yuko', 'Kolt', 'Vicleo', 'Taro', 'IXE'
      ],
    },
    {
      key: 'length',
      label: 'CHIỀU DÀI VỢT',
      items: [
        '665 mm',
        '670 mm',
        '675 mm'
      ],
    },
    {
      key: 'shaftLength',
      label: 'CHIỀU DÀI CÁN VỢT',
      items: [
        '200 mm',
        '205 mm',
        '210 mm'
      ],
    },
    {
      key: 'swingweight',
      label: 'SWINGWEIGHT',
      items: [
        'Dưới 82 kg/cm2',
        '82-84 kg/cm2',
        '84-86 kg/cm2',
        '86-88 kg/cm2',
        'Trên 88 kg/cm2'
      ],
    },
    {
      key: 'size',
      label: 'SIZE',
      items: [
        '2U: 90 - 94g',
        '3U: 85 - 89g',
        '4U: 80 - 84g',
        '5U: 75 - 79g',
        'F: 70 - 74g',
        '2F: 65 - 69g'
      ],
    },
    {
      key: 'balancePoint',
      label: 'ĐIỂM CÂN BẰNG',
      items: [
        'Nhẹ Đầu',
        'Cân Bằng',
        'Hơi Nặng Đầu',
        'Nặng Đầu',
        'Siêu Nặng Đầu'
      ],
    },
    {
      key: 'shaftFlexibility',
      label: 'ĐỘ CỨNG ĐŨA',
      items: [
        'Dẻo',
        'Trung Bình',
        'Cứng',
        'Siêu Cứng'
      ],
    },
    {
      key: 'playStyle',
      label: 'PHONG CÁCH CHƠI',
      items: [
        'Tấn Công',
        'Công Thủ Toàn Diện',
        'Phản Tạt, Phòng Thủ'
      ],
    },
    {
      key: 'gameType',
      label: 'NỘI DUNG CHƠI',
      items: [
        'Đánh Đơn',
        'Đánh Đôi',
        'Cả Đơn và Đôi'
      ],
    },
    {
      key: 'skillLevel',
      label: 'TRÌNH ĐỘ CHƠI',
      items: [
        'Mới Chơi',
        'Trung Bình',
        'Khá Tốt'
      ],
    },
    {
      key:'color',
      label: 'MÀU',
      items:[
        'Xanh',
        'Đỏ',
        'Tím',
        'Vàng',
        'Hồng',
        'Cam',
        'Lam'
      ]
    }
  ];

  