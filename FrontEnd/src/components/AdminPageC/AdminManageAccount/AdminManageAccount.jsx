import React, { useEffect, useState } from 'react';  
import { Modal, Table, Button, Select, Input, Row, Col, Form, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, updateAllUsers, addStaff } from '../../../redux/Slicer/userSlice'; // Import addStaff action
import AdminTableComponent from '../AdminTableComponent/AdminTableComponent';
import { validateProductInfoModule } from '../../../modules/validateProductInfoModule';
import { validateAddStaffModule } from '../../../modules/validateAddStaffModule';

const AdminManageAccount = () => {
  const dispatch = useDispatch();
   const [errorMessage, setErrorMessage] = useState('');
  const { users, status, error } = useSelector((state) => state.user);
  const validateUsername = (username) => {
    // Kiểm tra nếu tên chứa chữ số
    if (/\d/.test(username)) {
      return "Tên không được chứa chữ số.";
    }
  
    // Định nghĩa dãy ký tự hợp lệ (chữ cái không dấu và có dấu, khoảng trắng)
    const specialChars = /[!@#$%^~&*(),.?":{}|<>/+=_\-\\|;'\[\]<>`]/;
  
    // Kiểm tra nếu tên chứa ký tự đặc biệt
    if (specialChars.test(username)) {
      return "Tên không được chứa ký tự đặc biệt.";
    }
  
    // Kiểm tra độ dài tên
    if (username.length < 2) {
      return "Tên phải có ít nhất 2 ký tự.";
    }
    if (username.length > 50) {
      return "Tên không được vượt quá 50 ký tự.";
    }
  
    return ""; // Tên hợp lệ
  };
  
  
  
  
  const validatePhonenumber = (phoneNumber) => {
    if (/[^0-9]/.test(phoneNumber)) {
      return "Số điện thoại chỉ được chứa chữ số.";
    }
    if (phoneNumber.length < 10) {
      return "Số điện thoại phải có ít nhất 10 chữ số.";
    }
    if (phoneNumber.length > 10) {
      return "Số điện thoại không được vượt quá 10 chữ số.";
    }
    return ""; // Trả về chuỗi rỗng nếu hợp lệ
  };
  
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const orderCategories = [
    { label: 'ID', value: 'id' },
    { label: 'Loại', value: 'role' },
    { label: 'Tên tài khoản', value: 'username' },
    { label: 'Số điện thoại', value: 'phoneNumber' },
    { label: 'Địa chỉ', value: 'address' },
    { label: 'Email', value: 'email' },
    { label: 'Giới Tính', value: 'gender' },
    { label: 'Ngày Sinh', value: 'birthDate' },
    { label: 'Hoạt động', value: 'status' },
  ];

  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    setFilteredData(users);
  }, [users]);

  const [selectedCategory, setSelectedCategory] = useState(orderCategories[0].value);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Form instance for handling new user data

  const handleCategoryChange = (value) => { 
    setSelectedCategory(value); 
  };

  const handleSearch = (searchText) => {
    const filtered = users.filter((item) => {
      const columnKey = selectedCategory;
  
      // Dữ liệu thô
      let columnValue = item[columnKey];
  
      // Xử lý theo `render` nếu cần thiết
      if (columnKey === "gender") {
        columnValue = item[columnKey] === "Male" ? "Nam" : "Nữ";
      } else if (columnKey === "isActive") {
        columnValue = item[columnKey] ? "Hoạt động" : "Không hoạt động";
      } else if (columnKey === "role") {
        switch (item[columnKey]) {
          case "Admin":
            columnValue = "Quản trị viên";
            break;
          case "Customer":
            columnValue = "Khách hàng";
            break;
          case "Seller":
            columnValue = "Nhân viên bán hàng";
            break;
          case "WarehouseStaff":
            columnValue = "Nhân viên kho";
            break;
          default:
            columnValue = "Không xác định";
        }
      } else if (columnKey === "dateOfBirth") {
        columnValue = item[columnKey] ? new Date(item[columnKey]).toLocaleDateString() : "";
      }
  
      return columnValue && columnValue.toString().toLowerCase().includes(searchText.toLowerCase());
    });
  
    setFilteredData(filtered);
  };

  const handleStatusChange = (userId, status) => {
    const updatedStatus = status === 'Hoạt động' ? true : false;
    const updatedUsers = filteredData.map((user) => {
      if (user.id === userId) {
        return { ...user, isActive: updatedStatus };
      }
      return user;
    });
    setFilteredData(updatedUsers);
    if(status !== 'Hoạt động'){
      message.success('Vô hiệu hóa tài khoản thành công!');
    }
  };
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  const columnsOrder = [
    { title: 'ID', dataIndex: 'id', key: 'id', align: 'left' },
    {
      title: 'Loại',
      dataIndex: 'role',
      key: 'role',
      align: 'left',
      render: (role) => {
        switch (role) {
          case 'Admin':
            return 'Quản trị viên';
          case 'Customer':
            return 'Khách hàng';
          case 'Seller':
            return 'Nhân viên bán hàng';
          case 'WarehouseStaff':
            return 'Nhân viên kho';
          default:
            return 'Không xác định';
        }
      },
    }
    ,
    { title: 'Tên tài khoản', dataIndex: 'username', key: 'username', align: 'left' },
    { title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber', align: 'left' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address', align: 'left' },
    { title: 'Email', dataIndex: 'email', key: 'email', align: 'left' },
    {
      title: 'Giới Tính',
      dataIndex: 'gender',
      key: 'gender',
      align: 'left',
      render: (gender) => (gender === 'Male' ? 'Nam' : 'Nữ'),
    },
    {
      title: 'Ngày Sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      align: 'left',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Hoạt động',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'left',
      render: (isActive, record) => (
        <Select
          defaultValue={isActive ? 'Hoạt động' : 'Không hoạt động'}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record.id, value)}
          data-testid = {record.id}
        >
          <Select.Option value="active">Hoạt động</Select.Option>
          <Select.Option data-testid = "unactive" value="inactive">Không hoạt động</Select.Option>
        </Select>
      ),
    },
  ];

  const handleSave = async () => {
    try {
      await dispatch(updateAllUsers(filteredData)); 
      message.success("Lưu thành công");
    } catch (error) {
      console.error("Failed to update users:", error);
    }
  };

  // Modal logic for adding a user
  const handleAddUser = async (values) => {
    const usernameError = validateUsername(values.username|| '' );
    if (usernameError) {
      setErrorMessage(usernameError)
      return;
    }
  
    
    const  phoneError = validatePhonenumber(values.phoneNumber || '');
    if(phoneError){
      setErrorMessage(phoneError)
      return;
    }
  
    
    if (!validateEmail(values.email)) {
      setErrorMessage('Email không hợp lệ!');
      console.log('Email không hợp lệ!')
      return;
    }

    if(!validateAddStaffModule(values.username,values.phoneNumber,values.email,values.role || "Admin")){
      return;
    }
    try {
      const newUser = {
        id: Date.now(),  // Tạo ID tự động bằng cách sử dụng thời gian hiện tại
        email: values.email,
        username: values.username,
        password: 'Password@123',  // Mật khẩu mặc định
        role: values.role || "Admin",
        phoneNumber: values.phoneNumber || '',  // Nếu không có số điện thoại thì để trống
      };
     
      // Dispatch addStaff to add a new user
      const result = await dispatch(addStaff(newUser)).unwrap()
      
      if(result === "er"){
        setErrorMessage('Email đã được tài khoản khác đăng ký');
        form.resetFields();
        console.log("RE", result)
      // Reload the user list to reflect the newly added user
      //dispatch(fetchAllUsers()); // Refresh user list
        return ;
      }

      setIsModalVisible(false);
      message.success('Thêm nhân viên thành công!');
      form.resetFields();

      // Reload the user list to reflect the newly added user
      dispatch(fetchAllUsers()); // Refresh user list
    } catch (error) {
      console.error("Failed to add user:", error);
      message.error('Failed to add user');
    }
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <Row justify="end" style={{ marginBottom: '-100px', marginRight: '30px' }}>
        <Col>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '10px', 
            borderRadius: '8px', 
            display: 'flex', 
            gap: '8px',
          }}>
            <Select
  defaultValue={orderCategories[0].value}
  style={{ width: 150 }}
  onChange={handleCategoryChange}
  data-testid="category-select"
>
  {orderCategories.map((category) => (
    <Select.Option
      key={category.value}
      value={category.value}
      data-testid={`category-option-${category.value}`}
    >
      {category.label}
    </Select.Option>
  ))}
</Select>

            <Input.Search
              placeholder="Tìm kiếm..."
              allowClear
              onSearch={handleSearch}
              style={{ width: 200 }}
               data-testid="search-input"
            />
            <Button type="primary" style={{ width: "100px" }} onClick={handleSave} data-testid = "luu">Lưu</Button>
            <Button 
              type="primary" 
              style={{ width: "150px", backgroundColor: "green" }} 
              onClick={() => setIsModalVisible(true)}
            >
              Thêm nhân viên
            </Button>
          </div>
        </Col>
      </Row>

      <AdminTableComponent 
        title="Tài khoản" 
        columns={columnsOrder} 
        data={filteredData} 
      />

      {/* Add User Modal */}
      <Modal
        title="Thêm nhân viên"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddUser}>
          <Form.Item name="username" label="Họ tên" >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" >
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Vai trò">
            <Select defaultValue="Admin" data-testid="type-user-button">
              <Select.Option value="Admin">Quản trị viên</Select.Option>
              <Select.Option value="Seller">Nhân viên bán hàng</Select.Option>
              <Select.Option value="WarehouseStaff">Nhân viên kho</Select.Option>
            </Select>
          </Form.Item>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <Form.Item>
            <Button type="primary" htmlType="submit"  data-testid="add-user-button">Thêm</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManageAccount;
