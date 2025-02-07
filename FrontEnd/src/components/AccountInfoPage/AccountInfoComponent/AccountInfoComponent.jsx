import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Select, DatePicker, Form, Typography, Row, Col, message, Card, Upload, notification, Modal } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, updateUser, updatePassword } from '../../../redux/Slicer/userSlice';
import moment from 'moment';
import {validateUserInfoModule} from "../../../modules/validateUserInfoModule"
import { uploadFile } from '../../../redux/Slicer/uploadSlice';
import { PlusOneOutlined } from '@mui/icons-material';
import TextArea from 'antd/es/input/TextArea';
import { EnvironmentOutlined } from '@ant-design/icons';
import LocationPicker from '../../locationPicker/LocationPicker';
import { createLocation } from '../../../redux/Slicer/locationSlice';
const { Title } = Typography;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 15px;
  background-color: #1DA0F1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
  color: #fff;
  &:hover {
    background-color: #d3541b;
    border-color: #1DA0F1;
    opacity: 0.9;
  }

  @media (max-width: 1024px) {
    padding: 25px 0;
  }
`;
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


const validateAddress = (address) => {
  if (address.length < 10) {
    return "Địa chỉ phải có ít nhất 10 ký tự.";
  }
  if (address.length > 500) {
    return "Địa chỉ không được vượt quá 500 ký tự.";
  }
  return ""; // Địa chỉ hợp lệ
};

const validateBirthDay = (birthDay) => {
  const today = new Date(); // Ngày hiện tại
  const birthDate = new Date(birthDay); // Ngày sinh

  if (birthDate >= today) {
    return "Ngày sinh phải trước ngày hôm nay.";
  }
  return ""; // Ngày sinh hợp lệ
};


const AccountInfoComponent = () => {
 
  const [form] = Form.useForm(); // Sử dụng form instance của Ant Design
  const [passwordForm] = Form.useForm(); // Form cho phần đổi mật khẩu
  const dispatch = useDispatch();
const [errorMessage, setErrorMessage] = useState('');
  
  const [loading, setLoading] = useState(false); // Để kiểm soát trạng thái loading khi cập nhật
  const [loadingPassword, setLoadingPassword] = useState(false); // Để kiểm soát trạng thái loading khi đổi mật khẩu
  const { user, status, error } = useSelector((state) => state.user);
  console.log("MAAAAAA",user)
  const [uploadedImage, setUploadedImage] = useState(user?.avatar || null  ); // State to store uploaded image URL
  // Gọi API lấy thông tin user khi load trang

  useEffect(()=>{
    setUploadedImage(user?.avatar || null )
  },[dispatch,user])
  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        if (decodedToken?.userId) {
          dispatch(fetchUserById(decodedToken.userId));
        } else {
          console.warn('Không tìm thấy userId trong token.');
        }
      } catch (error) {
        console.error('Lỗi khi giải mã token:', error);
      }
    } else {
      console.warn('Không tìm thấy token trong LocalStorage.');
    }
  }, [dispatch]);
  const [selectedLocation, setSelectedLocation] = useState(user?.locationId || {
    locationName:''})

  // Cập nhật giá trị trong form khi `user` thay đổi
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        address: user?.address || '',
        username: user?.username || '',
        phoneNumber: user?.phoneNumber || '',
        gender: user?.gender || '',
        dateOfBirth: user?.dateOfBirth ? moment(user.dateOfBirth) : null,
      });

      setSelectedLocation(user?.locationId || {
        locationName:''})
    }
  }, [user, form]);

  // Hàm xử lý cập nhật thông tin người dùng
  const handleUpdate = async () => {
    setLoading(true); // Bắt đầu loading khi thực hiện cập nhật
    try {
      const values = await form.validateFields(); // Validate các trường trong form
      const userId = user?._id; // Lấy userId từ dữ liệu user đã có


      const usernameError = validateUsername(values.username);
  
  
  const  phoneError = validatePhonenumber(values.phoneNumber);
  
  
  if(!uploadedImage ){
    return;
  }
  
      if (userId) {
        const updatedUserData = {
          ...values, // Các trường thông tin từ form
          id: userId, // Thêm userId vào dữ liệu
          role: "Customer", // Thêm role nếu không thay đổi
          isActive: true, // Giả sử trạng thái isActive luôn là true khi cập nhật
          createdAt: user?.createdAt || new Date().toISOString(), // Sử dụng thời gian tạo ban đầu hoặc tạo mới
          updatedAt: new Date().toISOString(), // Thời gian cập nhật
          _id: user?._id, // Giữ lại _id từ dữ liệu ban đầu nếu có
          // Đảm bảo password được xử lý đúng (nếu có thay đổi)
          password: user?.password , // Nếu không có thay đổi thì giữ nguyên
          address: values.address || user?.address || "", // Địa chỉ
           avatar: uploadedImage || "",
           locationId:  selectedLocation?._id,

        };
  
        // Gửi thông tin cập nhật tới API
        dispatch(updateUser({ userId, userData: updatedUserData })   ).unwrap()
        .then(() => {
          message.success("Cập nhật thông tin thành công");

          const token = localStorage.getItem('token'); 
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        if (decodedToken?.userId) {
          dispatch(fetchUserById(decodedToken.userId));
        } else {
          console.warn('Không tìm thấy userId trong token.');
        }
      } catch (error) {
        console.error('Lỗi khi giải mã token:', error);
      }
    } else {
      console.warn('Không tìm thấy token trong LocalStorage.');
    }
        })
        .catch(() => {
          message.error("Cập nhật thông tin thất bại");
        });;
      }
    } catch (error) {
      console.error("Cập nhật thông tin thất bại:", error);
    } finally {
      setLoading(false); // Dừng loading khi đã xong
    }
  };

  // Hàm xử lý đổi mật khẩu
  const handleChangePassword = async () => {
    setLoadingPassword(true); // Bắt đầu loading khi đổi mật khẩu
    try {
      const values = await passwordForm.validateFields(); // Validate các trường trong form đổi mật khẩu
      if (values.newPassword !== values.confirmPassword) {
        message.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
        return;
      }
      
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;


      console.log(values.oldPassword , values.newPassword)
      // Gửi yêu cầu đổi mật khẩu
      dispatch(updatePassword({ userId, currentPassword: values.oldPassword, newPassword: values.newPassword }))
        .unwrap()
        .then(() => {
          message.success("Đổi mật khẩu thành công!");
        })
        .catch(() => {
          message.error("Đổi mật khẩu thất bại!");
        });
    } catch (error) {
      console.error("Đổi mật khẩu thất bại:", error);
      message.error("Đổi mật khẩu thất bại!");
    } finally {
      setLoadingPassword(false); // Dừng loading khi đã xong
    }
  };
console.log(user)
  const [isModalVisible, setIsModalVisible] = useState(false);
  
const handleImageUpload = async (options) => {
  const { file, onSuccess, onError } = options;

  try {
    // Dispatch action upload file từ Redux slice
    const response = await dispatch(uploadFile(file));

    // Lấy URL từ dữ liệu trả về
    const uploadedFileUrl = response.payload.data.path;
    console.log('URL ảnh đã upload:', uploadedFileUrl);

    // Hiển thị thông báo thành công
    notification.success({
      message: 'Upload thành công!',
      description: 'Ảnh đã được tải lên Cloudinary.',
    });

    // Cập nhật lại ảnh đã tải lên (thay thế ảnh cũ nếu có)
    setUploadedImage(uploadedFileUrl); // Cập nhật state với URL ảnh mới

    onSuccess();
  } catch (error) {
    notification.error({
      message: 'Upload thất bại!',
      description: error.message,
    });
    onError(error);
  }
};




const getGoogleMapsUrl = (placeId) => {
  return `https://www.google.com/maps/place/?q=place_id:${user?.locationId?.description}`;
};

const handleModalOpen = () => {
  setIsModalVisible(true);
};

// Đóng modal
const handleCancel = () => {
  setIsModalVisible(false);
};

const handleOk = () => {
    // if (selectedLocation) {
    //   setSettings((prevSettings) => ({
    //     ...prevSettings,
    //     location: selectedLocation,
    //   }));
    // }
    setIsModalVisible(false);
  };

  // Khi chọn địa điểm từ LocationPicker
 

 


const handleLocationSelect = (place) => {
  

    const newPLACE = {
        description: place.description,
        latitude: place.latitude,
        longitude: place.longitude,
        locationName: place.des,
        locationID: place.description,

    }
  dispatch(createLocation(newPLACE))
    .unwrap()
    .then((newLocation) => {
      setSelectedLocation(newLocation); // Store temporarily
    })
    .catch((error) => {
      console.error("Error creating location:", error);
    });
};
  return (
    <Container>
      <Title level={3}>Thông tin tài khoản</Title>
      <Form 
        form={form} 
        layout="vertical"
        initialValues={{
          address: '',
          username: '',
          phoneNumber: '',
          gender: '',
          dateOfBirth: null,
        }}
      >
        
        <Form.Item label="Họ tên" name="username">
          <Input placeholder="Họ tên" />
        </Form.Item>
        
        <Form.Item label="Số điện thoại" name="phoneNumber">
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item label="Địa chỉ kho">
            <TextArea
              value={`${selectedLocation?.locationName}`}
              rows={2}
              readOnly
              style={{ pointerEvents: "none" }}
            />
            <Button style={{ marginTop: "8px" }} onClick={handleModalOpen}>
              Chỉnh địa chỉ
            </Button>
            <Button
  style={{ marginTop: '8px', marginLeft: '8px' }}
  href={getGoogleMapsUrl(selectedLocation?.description)}
  target="_blank"
  icon={<EnvironmentOutlined />}
/>
          </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Giới tính" name="gender">
              <Select placeholder="Chọn giới tính">
                <Select.Option value="Male">Nam</Select.Option>
                <Select.Option value="Female">Nữ</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày sinh" name="dateOfBirth">
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
                placeholder="Chọn ngày sinh"
              />
            </Form.Item>
          </Col>
        </Row>
        <Card title="Avartar" bordered>
            <Upload
              style={{ marginBottom: "10px" }}
              customRequest={handleImageUpload}
              showUploadList={false}
              accept="image/*"
            //  beforeUpload={() => !uploadedImage} // Không cho phép tải ảnh nếu đã có ảnh
            >
              <Button icon={<PlusOneOutlined />} data-testid="inputanh">
                Tải lên avatar
              </Button>
            </Upload>

            {
  (uploadedImage || user?.avatar) && (
    <div style={{ marginTop: 10 }}>
      <p>Ảnh đã tải lên:</p>
      <img
        src={uploadedImage || user.avatar }  // Nếu có uploadedImage, sử dụng nó; nếu không, dùng user.avatar
        alt="Avatar"
        style={{ width: 150, height: 150, objectFit: 'cover' }}
      />
    </div>
  )
}


            
          </Card>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <div style={{ display: "flex", justifyContent: "center" }}>
  <StyledButton 
    type="primary" 
    loading={loading || status === 'loading'}
    onClick={handleUpdate}
    style={{ width: '35%' }}
  >
    CẬP NHẬT
  </StyledButton>
</div>

       
      </Form>

      <Title level={4} style={{ marginTop: '30px' }}>Đổi mật khẩu</Title>
      <Form form={passwordForm} layout="vertical">
        <Form.Item 
          label="Mật khẩu hiện tại" 
          name="oldPassword" 
          rules={[{ required: true, message: 'Mật khẩu hiện tại là bắt buộc!' }]}>
          <Input.Password placeholder="Mật khẩu hiện tại" />
        </Form.Item>
        <Form.Item 
          label="Mật khẩu mới" 
          name="newPassword" 
          rules={[{ required: true, message: 'Mật khẩu mới là bắt buộc!' }]}>
          <Input.Password placeholder="Mật khẩu mới" />
        </Form.Item>
        <Form.Item 
          label="Nhập lại mật khẩu mới" 
          name="confirmPassword" 
          rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu mới!' }]}>
          <Input.Password placeholder="Nhập lại mật khẩu mới" />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <StyledButton 
          type="primary" 
          loading={loadingPassword} 
          onClick={handleChangePassword}
          style={{ width: '35%' }}

        >
          ĐỔI MẬT KHẨU
        </StyledButton>
        </div>
      </Form>
      <Modal
        title="Chỉnh địa chỉ"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
        width={800}
      >
        <LocationPicker onLocationSelect={handleLocationSelect} />
      </Modal>
    </Container>
  );
};

export default AccountInfoComponent;
