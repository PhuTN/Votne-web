import React, { useState } from 'react'; 
import styled from 'styled-components';
import { Input, Button, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { createUser, verifyUser, resendVerificationCode } from '../../../redux/Slicer/userSlice'; // Import các hàm từ slice của bạn
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { validateSignupModule } from '../../../modules/validateSignupModule';

const { Link } = Typography;

const RegisterWrapper = styled.div`
  max-width: 320px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  color: #1DA0F1;
  font-size: 24px;
  font-weight: bold;
`;

const Divider = styled.div`
  width: 50%;
  height: 4px;
  background-color: #1DA0F1;
  margin: 8px auto 10px;
  border-radius: 2px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 16px;
  border-radius: 4px;
  padding: 8px;
`;

const StyledButton = styled(Button)`
  background-color: #1DA0F1;
  border-color: #1DA0F1;
  color: white;
  font-weight: bold;
  width: 100%;
  height: 40px;
  &:hover {
    background-color: #1DA0F1;
    border-color:#1DA0F1;
  }
`;

const RegisterText = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  color: #f4511e;
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

const validatePassword = (password) => {
  // Kiểm tra độ dài mật khẩu
  if (password.length < 8) {
    return "Mật khẩu phải có ít nhất 8 ký tự.";
  }
  if (password.length > 128) {
    return "Mật khẩu không được vượt quá 128 ký tự.";
  }
  
  // Kiểm tra mật khẩu không chứa ký tự đặc biệt
  if (!/[!@#$%^~&*(),.?":{}|<>/+=_\-\\|;'\[\]<>`]/.test(password)) {
    return "Mật khẩu phải chứa ít nhất một ký tự đặc biệt.";
  }

  // Kiểm tra mật khẩu không chứa chữ cái in hoa
  if (!/[A-Z]/.test(password)) {
    return "Mật khẩu phải chứa ít nhất một chữ cái in hoa.";
  }

  // Kiểm tra mật khẩu không chứa chữ cái thường
  if (!/[a-z]/.test(password)) {
    return "Mật khẩu phải chứa ít nhất một chữ cái thường.";
  }

  // Kiểm tra mật khẩu không chứa số
  if (!/[0-9]/.test(password)) {
    return "Mật khẩu phải chứa ít nhất một số.";
  }

  return ""; // Trả về chuỗi rỗng nếu mật khẩu hợp lệ
};


const SigninPageComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Khai báo useNavigate

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassWord] = useState('');
  const [password2, setPassWord2] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false); // Trạng thái xác thực

  // Tạo ID duy nhất (Có thể thay đổi logic tạo ID tùy vào nhu cầu)
  const generateUserId = () => {
    return `user_${new Date().getTime()}_${Math.floor(Math.random() * 1000)}`;
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSignUp = async () => {
    // Reset trạng thái lỗi trước khi xử lý
    setErrorMessage('');


 

    const usernameError = validateUsername(userName);
  if (usernameError) {
    setErrorMessage(usernameError)
    return;
  }

  
  const  phoneError = validatePhonenumber(phone);
  if(phoneError){
    setErrorMessage(phoneError)
    return;
  }

  
  if (!validateEmail(email)) {
    setErrorMessage('Email không hợp lệ!');
    return;
  }
    
  const  passwordError = validatePassword(password);
  if(passwordError){
    setErrorMessage(passwordError)
    return;
  }

  

    if (password !== password2) {
      setErrorMessage('Mật khẩu không khớp!');
      return;
    }
  


    if(!validateSignupModule(userName,phone,email,password,password2)){
      
      return;
    }

    setLoading(true);
  



    const newUser = { 
      id: generateUserId(), 
      
      email,
      phone,
      username: userName,
      password
    };
  
    try {
      const result = await dispatch(createUser(newUser)).unwrap(); // unwrap để lấy dữ liệu trực tiếp
      message.success('Vui lòng kiểm tra email để xác thực tài khoản.');
      setLoading(false);
      setIsVerified(true); // Hiển thị form xác thực chỉ khi đăng ký thành công
      
     
    } catch (error) {
      setLoading(false);
      setErrorMessage(error?.message || 'Đã xảy ra lỗi khi đăng ký.');
      setIsVerified(false); // Đảm bảo không chuyển sang form xác thực nếu có lỗi
    }
  };
  

  const handleVerify = async () => {
    setVerificationLoading(true);
    try {
      const result = await dispatch(verifyUser({ email, verificationCode })).unwrap();
      console.log(result)
      if(result === "err"){
        setErrorMessage('Mã xác thực không đúng!');
        setVerificationLoading(false);
        return ;
      }

      setVerificationLoading(false);
      message.success('Xác thực tài khoản thành công!');
      navigate('/login'); // Chuyển hướng đến trang đăng nhập khi xác thực thành công
    } catch (error) {
      setVerificationLoading(false);
      setErrorMessage(error.message || 'Lỗi xác thực.');
   
    }
  };

  const handleResendVerificationCode = async () => {
    setVerificationLoading(true);
    try {
      await dispatch(resendVerificationCode(email));
      setVerificationLoading(false);
      message.success('Mã xác thực đã được gửi lại!');
    } catch (error) {
      setVerificationLoading(false);
      setErrorMessage(error.message || 'Lỗi khi gửi lại mã xác thực.');
      
    }
  };

  return (
    <RegisterWrapper>
      <Title>ĐĂNG KÝ</Title>
      <Divider />
      <RegisterText>
        Đã có tài khoản, đăng nhập <StyledLink href="#">tại đây</StyledLink>
      </RegisterText>

      {/* Form đăng ký */}
      {!isVerified ? (
        <>
          <StyledInput value={userName} onChange={(e) => setUsername(e.target.value)} placeholder="Nhập tên của bạn (*)" />
          <StyledInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email của bạn (*)" />
          <StyledInput value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nhập số điện thoại" />
      
          <StyledInput value={password} onChange={(e) => setPassWord(e.target.value)} type="password" placeholder="Mật khẩu" />
          <StyledInput value={password2} onChange={(e) => setPassWord2(e.target.value)} type="password" placeholder="Nhập lại mật khẩu" />
          <StyledButton type="primary" onClick={handleSignUp} loading={loading}> ĐĂNG KÝ</StyledButton>
        </>
      ) : (
        <>
          {/* Form xác thực */}
          <StyledInput 
            value={verificationCode} 
            onChange={(e) => setVerificationCode(e.target.value)} 
            placeholder="Nhập mã xác thực" 
          />
          <StyledButton type="primary" onClick={handleVerify} loading={verificationLoading}>
            XÁC THỰC
          </StyledButton>
          <StyledButton type="link" onClick={handleResendVerificationCode} loading={verificationLoading}>
            Gửi lại mã xác thực
          </StyledButton>
        </>
      )}
      
      {/* Hiển thị thông báo lỗi nếu có */}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </RegisterWrapper>
  );
};

export default SigninPageComponent;
