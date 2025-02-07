import React, { useState, useEffect } from "react";
import { Modal, Table, Button, Select, Input, Row, Col, Tooltip, Form, message, DatePicker, Slider } from "antd";
import { EditOutlined, UndoOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrder } from "../../../redux/Slicer/orderSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const { RangePicker } = DatePicker;
const AdminOrdersComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("id");
  const [isUpdateShippingModalVisible, setIsUpdateShippingModalVisible] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [shippingForm] = Form.useForm();
  const dispatch = useDispatch();
  const { ordersAll, status, error } = useSelector((state) => state.orders);

  function transformToDesiredFormat(inputData) {
    return inputData.map(order => {
      return {
        _id: order._id,
        id: order.id,
        iduser: order.iduser,
        name: order.name,
        phonumber: order.phonumber,
        address: order.address,
        email: order.email,
        description: order.description || '',
        status: order.status,
        location: order.location || '',
        cancelReason: order.cancelReason || '',
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        products: order.products.map(product => {
          return {
            idproduct: product.idproduct._id,
            colorid: product.colorid,
            idattributevalue: product.idattributevalue._id,
            price: product.price,
            number: product.number,
            _id: product._id
          };
        }),
        dayorder: order.dayorder, // Directly assigning the date
        createdAt: order.createdAt, // Directly assigning the date
        updatedAt: order.updatedAt, // Directly assigning the date
        
      };
    });
  }

  console.log("HELLO")
  console.log(selectedOrder)
  
  console.log("HELLO")
  useEffect(() => {
    // Fetch orders on component mount
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    // Update filteredData whenever ordersAll changes
    setFilteredData(ordersAll);
  }, [ordersAll]);

  const handleViewProducts = (orderId) => {
    const order = filteredData.find((order) => order._id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleSearch = (searchText) => {
    const filtered = ordersAll.filter((order) =>
      order[selectedCategory]?.toString().toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleUpdateShipping = (orderId) => {
    setCurrentOrderId(orderId);
    const order = filteredData.find((order) => order._id === orderId);
    setSelectedOrder(order);
    shippingForm.setFieldsValue({ shippingStatus: order?.status || "" });
    setIsUpdateShippingModalVisible(true);
  };
  const orderStatusOptions = ["Chờ xử lý", "Đang xử lý", "Đang giao hàng", "Đã giao", "Đã hủy"];
  const handleUpdateShippingSubmit = () => {
    shippingForm.validateFields()
      .then((values) => {
        const updatedOrders = filteredData.map((order) => {
          if (order._id === currentOrderId) {
            return { ...order, status: values.shippingStatus };
          }
          return order;
        });
        setFilteredData(updatedOrders);
        message.success("Cập nhật trạng thái thành công!");
        setIsUpdateShippingModalVisible(false);
        shippingForm.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const handleStatusChange = (orderId, newStatus) => {
    setSelectedOrder(filteredData.find((order) => order._id === orderId));
    if (newStatus === "Đã hủy") {
      // Open the cancel reason modal
     
      setIsCancelModalVisible(true);
    } else {
      // Otherwise, update the order status directly
      const updatedOrders = filteredData.map((order) => {
        if (order._id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      });
      setFilteredData(updatedOrders);
      message.success(`Cập nhật trạng thái đơn hàng thành công!`);
    }
  };
  const handleCancelReasonSubmit = (orderId) => {
    if (!cancelReason) return;
  
    const updatedOrders = filteredData.map((order) => {
      if (order._id === orderId) {
        return { ...order, status: "Đã hủy", cancelReason };
      }
      return order;
    });
  
    setFilteredData(updatedOrders);
    message.success("Lý do hủy đã được cập nhật!");
    setIsCancelModalVisible(false);
    setCancelReason(""); // Clear the reason input
  };
  
  const handleCancelReasonChange = (orderId, newReason) => {
    const updatedOrders = filteredData.map((order) => {
      if (order._id === orderId) {
        return { ...order, location: newReason };
      }
      return order;
    });
    setFilteredData(updatedOrders);
  };
  const handleRowClick = (record) => {
    // Xử lý khi người dùng click vào hàng
    console.log("Clicked row:", record);
    // Ví dụ: Mở modal chi tiết sản phẩm
    setSelectedOrder(record);
   navigate(`/order-detail/${record._id}`)
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleDateFilterChange = (dates, dateStrings) => {
    setSelectedDateRange(dateStrings);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ngày đặt",
      dataIndex: "dayorder",
      key: "dayorder",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <RangePicker
            onChange={(dates, dateStrings) => {
              setSelectedKeys(dateStrings[0] && dateStrings[1] ? [dateStrings] : []);
              confirm();
            }}
            format="YYYY-MM-DD"
            value={
              selectedKeys.length ? [moment(selectedKeys[0][0]), moment(selectedKeys[0][1])] : null
            }
            style={{ width: "100%" }}
          />
          {/* <Button
            onClick={() => {
              clearFilters();
              setSelectedDateRange(null);
            }}
            size="small"
            style={{ width: "100%", marginTop: 8 }}
          >
            Xóa bộ lọc
          </Button> */}
        </div>
      ),
      onFilter: (value, record) => {
        if (!value.length) return true;
        const [start, end] = value;
        const recordDate = moment(record.dayorder).format("YYYY-MM-DD");
        return recordDate >= start && recordDate <= end;
      },
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => a.total - b.total, // Sắp xếp tăng/giảm theo total
      // filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
       
      //   <div style={{ padding: 8, width: 220 }}>
      //     <Slider
      //       range
      //       min={0}
      //       max={50000000}
      //       step={1000000}
      //       value={selectedKeys.length ? selectedKeys : [0, 50000000]} // Giữ giá trị là mảng
      //       onChange={(value) => setSelectedKeys(value)}  // Set giá trị là mảng
      //       tooltip={{ formatter: (value) => value.toLocaleString("vi-VN") + " ₫" }}
      //     />
      //     <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
      //       <Button size="small" type="primary" onClick={() => confirm()}>
      //         Áp dụng
      //       </Button>
      //       <Button size="small" onClick={() => clearFilters()}>
      //         Xóa lọc
      //       </Button>
      //     </div>
      //   </div>
      // ),
      // onFilter: (value, record) => {
        
      //   const total = Number(record.total);  // Đảm bảo giá trị là số
      //   if (Array.isArray(value) && value.length === 2) {
      //     return total >= value[0] && total <= value[1];  // Lọc theo mảng giá trị
      //   }
      //   return true;  // Nếu không phải mảng hoặc không đủ 2 phần tử, không lọc
      // },
      render: (total) => total.toLocaleString("vi-VN") + " ₫", // Format tiền VND
    },
    
    
    
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phonumber",
      key: "phonumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: orderStatusOptions.map((status) => ({ text: status, value: status })),
      onFilter: (value, record) => record.status === value,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
  <Select
    placeholder="Chọn trạng thái"
    onChange={(value) => setSelectedKeys(value ? [value] : [])}
    value={selectedKeys[0] || null}
    style={{ width: "100%", marginBottom: 8 }}
  >
    {orderStatusOptions.map((status) => (
      <Select.Option key={status} value={status}>
        {status}
      </Select.Option>
    ))}
  </Select>
  <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
    <Button onClick={() => confirm()} type="primary" size="small" style={{ flex: 1 }}>
      Áp dụng
    </Button>
    <Button onClick={() => clearFilters()} size="small" style={{ flex: 1 }}>
      Xóa bộ lọc
    </Button>
  </div>
</div>

      ),
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ width: 150 }}
          onChange={(value) => handleStatusChange(record._id, value)}
          data-testid={record.id}
        >
          {orderStatusOptions.map((status) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          
          <Tooltip title="Xem chi tiết sản phẩm">
            <Button onClick={() => handleViewProducts(record._id) } style={{ marginRight: 10 }}>Xem sản phẩm</Button>
          </Tooltip>
          <Tooltip   title="Xem chi tiết đơn hàng">
            <Button data-testid = {`xem ${record.id}`} onClick={() => handleRowClick(record)}>Xem đơn hàng</Button>
          </Tooltip>
        </>
      ),
    },
    {
      title: "Lý do hủy khách hàng",
      dataIndex: "location",
      key: "location",
     
    },
    {
      title: "Lý do hủy của shop",
      dataIndex: "cancelReason",
      key: "cancelReason",
     
    },
    
  ];

  const productColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "idproduct",
      key: "productName",
      render: (idproduct) => idproduct?.name || "No Name",
    },
    {
      title: "Số lượng",
      dataIndex: "number",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
  ];
  const navigate = useNavigate();
 
  const handleSave =  async ( updatedOrderData) => {
    // Your save logic here

    try {
      await dispatch(updateOrder({  orderData: updatedOrderData }));
      // You can handle any post-update actions here
    } catch (error) {
      console.error("Failed to update order:", error);
    }
    message.success("Lưu thành công!");
  };
  return (
    <div>
      <Row gutter={16}>
        <Col span={2}>
          <Select defaultValue="id" onChange={handleCategoryChange} style={{ width: "100%" }}>
            <Select.Option value="id">ID</Select.Option>
            <Select.Option value="name">Tên khách hàng</Select.Option>
            <Select.Option value="phonumber">Số điện thoại</Select.Option>
            <Select.Option value="address">Địa chỉ</Select.Option>
          </Select>
        </Col>
        <Col span={5}>
          <Input.Search
            placeholder="Tìm kiếm..."
            onSearch={handleSearch}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={2}>
          <Button data-testid = "luu" onClick={() => handleSave(transformToDesiredFormat(filteredData))} type="primary" style={{ width: "100%" }}>
            Lưu
          </Button>
        </Col>
        <Col span={6}>

        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="_id"
        style={{ marginTop: 20 }}
        scroll={{ x: 1000 }}

      />
      <Modal
        title="Chi tiết sản phẩm"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Table 
  columns={productColumns}
  dataSource={selectedOrder?.products || []}
  rowKey="_id"
  pagination={false}
  onRow={(record) => ({
    onClick: () => {
      // Chuyển hướng khi click vào một record
      console.log(record)
      window.location.href = `/product/product-detail/${record?.idproduct?._id}`;
    },
  })}
/>
      </Modal>
      <Modal
        title="Cập nhật trạng thái giao hàng"
        visible={isUpdateShippingModalVisible}
        onCancel={() => setIsUpdateShippingModalVisible(false)}
        onOk={handleUpdateShippingSubmit}
      >
        <Form form={shippingForm}>
          <Form.Item
            label="Trạng thái giao hàng"
            name="shippingStatus"
            rules={[{ required: true, message: "Vui lòng nhập trạng thái!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>


      <Modal
  title="Lý do hủy"
  visible={isCancelModalVisible}
  onCancel={() => setIsCancelModalVisible(false)}
  onOk={() => handleCancelReasonSubmit(selectedOrder?._id)}
  okButtonProps={{ "data-testid": "ok" }}
>
  <Form>
    <Form.Item
      label="Lý do hủy"
      name="cancelReason"
      rules={[{ required: true, message: "Vui lòng nhập lý do hủy!" }]}
      
    >
      <Input.TextArea
        value={cancelReason}
        onChange={(e) => setCancelReason(e.target.value)}
        rows={4}
        data-testid = "liDo"
      />
    </Form.Item>
  </Form>
</Modal>

    </div>
  );
};

export default AdminOrdersComponent;
