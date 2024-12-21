import { Role } from 'testcafe';
import { jwtDecode } from 'jwt-decode';
import { Selector } from 'testcafe';



const emailInput = Selector('input').withAttribute('placeholder', 'Email');
const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
const loginButton = Selector('button').withText('ĐĂNG NHẬP');
const errorMessage = Selector('p').withText('Email người dùng hoặc mật khẩu không đúng hoặc tài khoản bị khóa!');



export const customer = Role(`http://localhost:3000/login`, async t => {
    await t
           .expect(Selector('h2').withText('ĐĂNG NHẬP').exists).ok('Không tìm thấy tiêu đề "ĐĂNG NHẬP"')
           .expect(emailInput.exists).ok('Không tìm thấy trường nhập email')
           .expect(passwordInput.exists).ok('Không tìm thấy trường nhập mật khẩu')
           .expect(loginButton.exists).ok('Không tìm thấy nút ĐĂNG NHẬP');
   
       // B2
       await t
           .typeText(emailInput, 'lethih@gmail.com')
           .typeText(passwordInput, 'Secure$Pass1!')
           .click(loginButton);
});

export const customer2 = Role(`http://localhost:3000/login`, async t => {
    await t
           .expect(Selector('h2').withText('ĐĂNG NHẬP').exists).ok('Không tìm thấy tiêu đề "ĐĂNG NHẬP"')
           .expect(emailInput.exists).ok('Không tìm thấy trường nhập email')
           .expect(passwordInput.exists).ok('Không tìm thấy trường nhập mật khẩu')
           .expect(loginButton.exists).ok('Không tìm thấy nút ĐĂNG NHẬP');
   
       // B2
       await t
           .typeText(emailInput, 'nguyenvana@gmail.com')
           .typeText(passwordInput, '1234567890')
           .click(loginButton);
});



export const admin = Role(`http://localhost:3000/login`, async t => {
    await t
           .expect(Selector('h2').withText('ĐĂNG NHẬP').exists).ok('Không tìm thấy tiêu đề "ĐĂNG NHẬP"')
           .expect(emailInput.exists).ok('Không tìm thấy trường nhập email')
           .expect(passwordInput.exists).ok('Không tìm thấy trường nhập mật khẩu')
           .expect(loginButton.exists).ok('Không tìm thấy nút ĐĂNG NHẬP');
   
       // B2
       await t
           .typeText(emailInput, 'tranthij@gmail.com')
           .typeText(passwordInput, 'J12345678!')
           .click(loginButton);
});

export const warehouseStaff = Role(`http://localhost:3000/login`, async t => {
    await t
           .expect(Selector('h2').withText('ĐĂNG NHẬP').exists).ok('Không tìm thấy tiêu đề "ĐĂNG NHẬP"')
           .expect(emailInput.exists).ok('Không tìm thấy trường nhập email')
           .expect(passwordInput.exists).ok('Không tìm thấy trường nhập mật khẩu')
           .expect(loginButton.exists).ok('Không tìm thấy nút ĐĂNG NHẬP');
   
       // B2
       await t
           .typeText(emailInput, 'nguyenvani@gmail.com')
           .typeText(passwordInput, 'I89012345!')
           .click(loginButton);
});
