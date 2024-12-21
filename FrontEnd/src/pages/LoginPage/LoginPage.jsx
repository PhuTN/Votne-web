import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/Slicer/authSlice"; // Đường dẫn phù hợp đến authSlice
import { forgotPassword, resetPassword } from "../../redux/Slicer/userSlice"; // Đường dẫn phù hợp đến userSlice
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// Styled Components
const Wrapper = styled.div`
  max-width: 300px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;
const Title = styled.h2`
  color: #1da0f1;
  font-size: 24px;
  font-weight: bold;
`;
const Divider = styled.div`
  width: 50%;
  height: 4px;
  background-color: #1da0f1;
  margin: 8px auto 20px;
  border-radius: 2px;
`;
const StyledInput = styled(Input)`
  margin-bottom: 16px;
  border-radius: 4px;
  padding: 8px;
`;
const StyledButton = styled(Button)`
  background-color: #1da0f1;
  border-color: #1da0f1;
  color: white;
  font-weight: bold;
  width: 100%;
  height: 40px;
  &:hover {
    background-color: white;
    border-color: #1da0f1;
  }
  &:disabled {
    background-color: #f0f0f0;
    border-color: #f0f0f0;
  }
`;
const LinksWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const Link = styled.a`
  color: #1da0f1;
  font-size: 14px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

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

const LoginPageComponent = () => {
    const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState("login"); // "login", "step1", "step2"
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const { resetPasswordStatus, resetPasswordError, verificationStatus, verificationError } = useSelector(
    (state) => state.user
  );

  const handleLogin = () => {
    if (!account) {
      message.warning("Vui lòng nhập email!");
      return;
    }
    if (!password) {
      message.warning("Vui lòng nhập mật khẩu!");
      return;
    }

    dispatch(loginUser({ username: account, password }))
      .unwrap()
      .then((response) => {
        if (response === "error") {
          message.error("Email người dùng hoặc mật khẩu không đúng hoặc tài khoản bị khóa!");
        } else {
          localStorage.setItem("token", response.token);
          const decodedToken = jwtDecode(response.token);
         
          // dispatch(fetchCartByUserId(decodedToken?.userId)).then((action) => {
            //   if (action.payload) {
            //     localStorage.setItem("cart", JSON.stringify(action.payload));
                
            //   }
            // });
          // Xử lý giỏ hàng
          navigate(localStorage.getItem("previousURL") || "/");
          
          setTimeout(() => window.location.reload(), 1000);
          message.success("Đăng nhập thành công!");

          axios
      .get(`http://localhost:8081/api/cart/${decodedToken?.userId}`, {
        headers: {
          Authorization: `Bearer ${response.token}`, // Gửi token trong header
        },
      })
      .then((response) => {
       
        localStorage.setItem("cart", JSON.stringify(response.data)); // Lưu vào localStorage
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
       
      });
        }
      })
      .catch(() => {
        message.error("Đăng nhập thất bại");
      });
  };

  const handleForgotPasswordStep1 = () => {
    if (!email) {
      setErrorMessage("Vui lòng nhập email!");
      return;
    }
    try{
      dispatch(forgotPassword(email)) // Gọi action forgotPassword
      .unwrap()
      .then((response) => {
        if(response?.er){
          setErrorMessage("Email người dùng không đúng hoặc tài khoản bị khóa!");
        }
        else{
       // console.log(response.response.data.message)
        message.success("Email xác nhận đã được gửi!");
        setCurrentStep("step2");
        }
      })
      .catch((err) => {
        
      });
    }
    catch(e){
      message.error(e);
    }
    
  };

  const handleForgotPasswordStep3 = () => {
    message.success("Đã gửi lại mã xác nhận!");
  }

  const handleForgotPasswordStep2 = () => {
    
    



    const  passwordError = validatePassword(newPassword);
    if(passwordError){
      setErrorMessage(passwordError)
      return;
    }
  
    

      if (newPassword !== confirmPassword) {
        setErrorMessage('Mật khẩu không khớp!');
        return;
      }
      if (!code ) {
        setErrorMessage('Mã xác nhận không được để trống');
        return;
      }

    dispatch(resetPassword({ email, resetCode: code, newPassword })) // Gọi action resetPassword
      .unwrap()
      .then(() => {
        try{
        message.success("Đổi mật khẩu thành công!");
        setCurrentStep("login");
        }
        catch(e){
          setErrorMessage('Mã xác nhận không chính xác');
        }
      })
      .catch((err) => {
        setErrorMessage('Mã xác nhận không chính xác');
      });
  };

  const renderContent = () => {
    switch (currentStep) {
      case "step1":
        return (
          <div>
            <Title>Nhập Email</Title>
            <Divider />
            <StyledInput
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
             {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <StyledButton
              onClick={handleForgotPasswordStep1}
              loading={verificationStatus === "loading"} // Hiển thị loading nếu đang gọi API
            >
              Gửi mã xác nhận
            </StyledButton>
            {verificationError && (
  <p style={{ color: "red", marginTop: "10px" }}>
    {verificationError?.message || verificationError}
  </p>
)}
          </div>
        );
      case "step2":
        return (
          <div>
            <Title>Nhập Mã Xác Nhận và Đổi Mật Khẩu</Title>
            <Divider />
            <StyledInput
              placeholder="Nhập mã xác nhận"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <StyledInput.Password
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <StyledInput.Password
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
             {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <StyledButton
              onClick={handleForgotPasswordStep2}
              loading={resetPasswordStatus === "loading"} // Hiển thị loading nếu đang gọi API
            >
              Đổi mật khẩu
            </StyledButton>

            <StyledButton
              onClick={handleForgotPasswordStep3}
              // Hiển thị loading nếu đang gọi API
            >
              Gửi lại mã xác nhận 
            </StyledButton>
           
          </div>
        );
      default:
        return (
          <div>
            <Title>ĐĂNG NHẬP</Title>
            <Divider />
            <StyledInput
              placeholder="Email"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <StyledInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
            />
             {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <StyledButton onClick={handleLogin} type="primary" loading={status === "loading"}>
              ĐĂNG NHẬP
            </StyledButton>
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            <LinksWrapper>
              <Link onClick={() => setCurrentStep("step1")}>Quên mật khẩu</Link>
              <Link href="/signup">Đăng ký tại đây</Link>
            </LinksWrapper>
          </div>
        );
    }
  };

  return <Wrapper>{renderContent()}</Wrapper>;
};

export default LoginPageComponent;
