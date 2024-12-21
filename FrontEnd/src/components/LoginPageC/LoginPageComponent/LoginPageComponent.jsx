// import React from "react";
// import styled from "styled-components";
// import { Input, Button, message } from "antd";
// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// const LoginWrapper = styled.div`
//   max-width: 300px;
//   margin: 50px auto;
//   padding: 30px;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   text-align: center;
// `;

// const Title = styled.h2`
//   color: #1da0f1;
//   font-size: 24px;
//   font-weight: bold;
// `;

// const Divider = styled.div`
//   width: 50%;
//   height: 4px;
//   background-color: #1da0f1;
//   margin: 8px auto 20px;
//   border-radius: 2px;
// `;

// const StyledInput = styled(Input)`
//   margin-bottom: 16px;
//   border-radius: 4px;
//   padding: 8px;
// `;

// const StyledButton = styled(Button)`
//   background-color: #1da0f1;
//   border-color: #1da0f1;
//   color: white;
//   font-weight: bold;
//   width: 100%;
//   height: 40px;
//   &:hover {
//     background-color: white;
//     border-color: #1da0f1;
//   }
// `;

// const Link = styled.a`
//   color: #1da0f1;
//   display: block;
//   margin-top: 10px;
//   font-size: 14px;
// `;

// const LoginPageComponent = () => {
//   const [account, setAccount] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate()
//   const handleClick = () => {
//     if (!account){
//       message.warning("Vui lòng nhập tên đăng nhập")
//       return
//     }
//     if (!password){
//       message.warning("Vui lòng nhập mật khẩu")
//       return
//     }
    
//     fetch("http://localhost:8081/v1/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: account,
//         password: password,
//       }),
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res, account, password);
//         if (res.success === false) {
//           localStorage.clear();
//           alert("Moi dang nhap lai");
//         } else {

//           localStorage.setItem("id", res.id);
//           navigate("/");
//         }
//       })
//       .catch((err) => console(err));
//   };

//   return (
//     <LoginWrapper>
//       <Title>ĐĂNG NHẬP</Title>
//       <Divider />
//       <StyledInput
//         placeholder="Tên đăng ngập"
//         value={account}
//         onChange={(e) => setAccount(e.target.value)}
//       />
//       <StyledInput
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Mật khẩu"
//       />
//       <StyledButton onClick={handleClick} type="primary">
//         ĐĂNG NHẬP
//       </StyledButton>
      
//       <Link href="/">Quên mật khẩu</Link>
//       <Link href="/signin">Đăng ký tại đây</Link>
//     </LoginWrapper>
//   );
// };

// export default LoginPageComponent;
