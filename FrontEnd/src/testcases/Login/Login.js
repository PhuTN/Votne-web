// Import các module cần thiết từ TestCafe
import { jwtDecode } from 'jwt-decode';
import { Selector } from 'testcafe';

// URL của trang đăng nhập
const URL = 'http://localhost:3000/login'; // Thay bằng URL thực tế

// Các selector cần dùng trong test
const emailInput = Selector('input').withAttribute('placeholder', 'Email');
const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
const loginButton = Selector('button').withText('ĐĂNG NHẬP');
const errorMessage = Selector('p').withText('Email người dùng hoặc mật khẩu không đúng hoặc tài khoản bị khóa!');
// B1
fixture('Test chức năng Người dùng đăng nhập hệ thống')
    .page(URL);

test('[Login-] Không nhập email', async t => {
    
    await t
        .expect(Selector('h2').withText('ĐĂNG NHẬP').exists).ok('Không tìm thấy tiêu đề "ĐĂNG NHẬP"')
        .expect(emailInput.exists).ok('Không tìm thấy trường nhập email')
        .expect(passwordInput.exists).ok('Không tìm thấy trường nhập mật khẩu')
        .expect(loginButton.exists).ok('Không tìm thấy nút ĐĂNG NHẬP');

    // B2
    await t
        
        .typeText(passwordInput, 'Password123!')
        .click(loginButton);

        // B3
        await t 
        .expect(Selector('.ant-message').withText("Vui lòng nhập email!").exists).ok()
   
});


test('[Login-1] Không nhập mật khẩu', async t => {
    
    await t
        .expect(Selector('h2').withText('ĐĂNG NHẬP').exists).ok('Không tìm thấy tiêu đề "ĐĂNG NHẬP"')
        .expect(emailInput.exists).ok('Không tìm thấy trường nhập email')
        .expect(passwordInput.exists).ok('Không tìm thấy trường nhập mật khẩu')
        .expect(loginButton.exists).ok('Không tìm thấy nút ĐĂNG NHẬP');

    // B2
    await t
        .typeText(emailInput, '225@gm.uit.edu.vn')
        .click(loginButton);

        // B3
        await t
        .wait(500)
        .expect(Selector('.ant-message').withText("Vui lòng nhập mật khẩu!").exists).ok()
   
});

test('[Login-2] Kiểm tra đăng nhập với tài khoản không tồn tại hoặc bị khóa', async t => {
    
    await t
        .expect(Selector('h2').withText('ĐĂNG NHẬP').exists).ok('Không tìm thấy tiêu đề "ĐĂNG NHẬP"')
        .expect(emailInput.exists).ok('Không tìm thấy trường nhập email')
        .expect(passwordInput.exists).ok('Không tìm thấy trường nhập mật khẩu')
        .expect(loginButton.exists).ok('Không tìm thấy nút ĐĂNG NHẬP');

    // B2
    await t
        .typeText(emailInput, '225@gm.uit.edu.vn')
        .typeText(passwordInput, 'Password123!')
        .click(loginButton);

        // B3
        await t
        .wait(500)
        .expect(Selector('.ant-message').withText('Email người dùng hoặc mật khẩu không đúng hoặc tài khoản bị khóa!').exists).ok()
   
});






test('[Login-3] Kiểm tra đăng nhập với tài khoản admin và trả về token có role là Admin', async t => {
    
    await t
        .expect(Selector('h2').withText('ĐĂNG NHẬP').exists).ok('Không tìm thấy tiêu đề "ĐĂNG NHẬP"')
        .expect(emailInput.exists).ok('Không tìm thấy trường nhập email')
        .expect(passwordInput.exists).ok('Không tìm thấy trường nhập mật khẩu')
        .expect(loginButton.exists).ok('Không tìm thấy nút ĐĂNG NHẬP');

    // B2
    await t
        .typeText(emailInput, 'nguyenvane@gmail.com')
        .typeText(passwordInput, 'Strong@2024')
        .click(loginButton);

        // B3
        await t
     
        .expect(Selector('.ant-message').withText("Đăng nhập thành công!").exists).ok()
   

        const token = await t.eval(() => localStorage.getItem('token'));

        // Decode token
        const decodedToken = jwtDecode(token);
    
        // Assert decoded token fields
        await t.expect(decodedToken).ok();
        await t.expect(decodedToken.role).eql('Admin');
});

test('[Login-4] Kiểm tra đăng nhập với tài khoản nhân viên bán hàng và trả về token có role là Seller', async t => {
    
    await t
        .expect(Selector('h2').withText('ĐĂNG NHẬP').exists).ok('Không tìm thấy tiêu đề "ĐĂNG NHẬP"')
        .expect(emailInput.exists).ok('Không tìm thấy trường nhập email')
        .expect(passwordInput.exists).ok('Không tìm thấy trường nhập mật khẩu')
        .expect(loginButton.exists).ok('Không tìm thấy nút ĐĂNG NHẬP');

    // B2
    await t
        .typeText(emailInput, 'tranthif@gmail.com')
        .typeText(passwordInput, 'Password123!')
        .click(loginButton);

        // B3
        await t
      
        .expect(Selector('.ant-message').withText("Đăng nhập thành công!").exists).ok()
   

        const token = await t.eval(() => localStorage.getItem('token'));

        // Decode token
        const decodedToken = jwtDecode(token);
    
        // Assert decoded token fields
        await t.expect(decodedToken).ok();
        await t.expect(decodedToken.role).eql('Seller');
});

test('[Login-5] Kiểm tra đăng nhập với tài khoản nhân viên kho và trả về token có role là WarehouseStaff', async t => {
    
    await t
        .expect(Selector('h2').withText('ĐĂNG NHẬP').exists).ok('Không tìm thấy tiêu đề "ĐĂNG NHẬP"')
        .expect(emailInput.exists).ok('Không tìm thấy trường nhập email')
        .expect(passwordInput.exists).ok('Không tìm thấy trường nhập mật khẩu')
        .expect(loginButton.exists).ok('Không tìm thấy nút ĐĂNG NHẬP');

    // B2
    await t
        .typeText(emailInput, 'phamvang@gmail.com')
        .typeText(passwordInput, 'GoodLuck#99')
        .click(loginButton);

        // B3
        await t
    
     
        .expect(Selector('.ant-message').withText("Đăng nhập thành công!").exists).ok()
   

        const token = await t.eval(() => localStorage.getItem('token'));

        // Decode token
        const decodedToken = jwtDecode(token);
    
        // Assert decoded token fields
        await t.expect(decodedToken).ok();
        await t.expect(decodedToken.role).eql('WarehouseStaff');
});

test('[Login-6] Kiểm tra đăng nhập với tài khoản khách hàng và trả về token có role là Customer', async t => {
    
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

        // B3
        await t
       
        .expect(Selector('.ant-message').withText("Đăng nhập thành công!").exists).ok()
   

        const token = await t.eval(() => localStorage.getItem('token'));

        // Decode token
        const decodedToken = jwtDecode(token);
    
        // Assert decoded token fields
        await t.expect(decodedToken).ok();
        await t.expect(decodedToken.role).eql('Customer');
});





