import { Selector } from 'testcafe';

//B1
fixture `Test chức năng khách hàng đăng ký tài khoản`
    .page `http://localhost:3000/signup`; // Thay URL bằng URL thực tế của trang


   

test('[Signup-] Xác minh người dùng có đăng kí thành công với thông tin chính xác không ', async t => {
    // B2
    await t
        .typeText(Selector('input[placeholder="Nhập tên của bạn (*)"]'), 'Nguyễn Văn A')
        .wait(500)
        .typeText(Selector('input[placeholder="Nhập email của bạn (*)"]'), '22521107@gm.uit.edu.vn')
        .wait(500)
        .typeText(Selector('input[placeholder="Nhập số điện thoại"]'), '0346728349')
        .wait(500)
        .typeText(Selector('input[placeholder="Mật khẩu"]'), 'Quyenanh20@4')
        .wait(500)
        .typeText(Selector('input[placeholder="Nhập lại mật khẩu"]'), 'Quyenanh20@4')
        .wait(500)
        //B3
        .click(Selector('button').withText('ĐĂNG KÝ'));


    await t
  .wait(2000)
    .expect(Selector('.ant-message').withText('Vui lòng kiểm tra email để xác thực tài khoản.').exists, { timeout: 50000 })
    .ok()
       
        //B4
        .expect(Selector('input[placeholder="Nhập mã xác thực"]').exists).ok();

  
    await t.debug();

    await t
        .wait(500)
        //B5
        .click(Selector('button').withText('XÁC THỰC'))
        .wait(500)
        .expect(Selector('.ant-message').withText('Xác thực tài khoản thành công!').exists).ok();
});




test('[Signup-1] Xác minh rằng hệ thống chỉ chấp nhận tên chứa các ký tự chữ cái và không có chữ số', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2

    await t
        .typeText(userNameInput, 'John123')
        .typeText(emailInput, 'john.doe@example.com')
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, 'Password123')
        .typeText(password2Input, 'Password123')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Tên không được chứa chữ số.').exists).ok();
});


test('[Signup-2] Xác minh rằng hệ thống chỉ chấp nhận tên chứa các ký tự chữ cái và không có ký tự đặc biệt', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    await t
        .typeText(userNameInput, 'John@Doe')
        .typeText(emailInput, 'john.doe@example.com')
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, 'Password123')
        .typeText(password2Input, 'Password123')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Tên không được chứa ký tự đặc biệt.').exists).ok();
});


test('[Signup-3] Xác minh rằng hệ thống từ chối tên có độ dài dưới 2 ký tự', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
   
    await t
        .typeText(userNameInput, 'J')
        .typeText(emailInput, 'john.doe@example.com')
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, 'Password123')
        .typeText(password2Input, 'Password123')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Tên phải có ít nhất 2 ký tự.').exists).ok();
});


test('[Signup-4] Xác minh rằng hệ thống từ chối tên có độ dài vượt quá 50 ký tự', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
   
    const longUserName = 'A'.repeat(51);  // 51 characters long
    await t
        .typeText(userNameInput, longUserName)
        .typeText(emailInput, 'john.doe@example.com')
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, 'Password123')
        .typeText(password2Input, 'Password123')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Tên không được vượt quá 50 ký tự.').exists).ok();
});


test('[Signup-5] Xác minh rằng hệ thống từ chối số điện thoại chứa ký tự không phải số', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    await t
        .typeText(userNameInput, 'John Doe')
        .typeText(emailInput, 'john.doe@example.com')
        .typeText(phoneInput, '01234abcde') // Phone number contains non-digit characters
        .typeText(passwordInput, 'Password123')
        .typeText(password2Input, 'Password123')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Số điện thoại chỉ được chứa chữ số.').exists).ok();
});


test('[Signup-6] Xác minh rằng hệ thống từ chối số điện thoại có ít hơn 10 ký tự', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    await t
        .typeText(userNameInput, 'John Doe')
        .typeText(emailInput, 'john.doe@example.com')
        .typeText(phoneInput, '012345678') // Phone number with less than 10 digits
        .typeText(passwordInput, 'Password123')
        .typeText(password2Input, 'Password123')
        //B3
     
        .click(submitButton)
        .expect(Selector('div').withText('Số điện thoại phải có ít nhất 10 chữ số.').exists).ok();
});

// Test case 3: Xác minh rằng hệ thống từ chối số điện thoại có nhiều hơn 10 ký tự
test('[Signup-7] Xác minh rằng hệ thống từ chối số điện thoại có nhiều hơn 10 ký tự', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    await t
        .typeText(userNameInput, 'John Doe')
        .typeText(emailInput, 'john.doe@example.com')
        .typeText(phoneInput, '01234567890') // Phone number with more than 10 digits
        .typeText(passwordInput, 'Password123')
        .typeText(password2Input, 'Password123')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Số điện thoại không được vượt quá 10 chữ số.').exists).ok();
});


test('[Signup-8] Xác minh rằng hệ thống từ chối email không có dấu "@"', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    await t
        .typeText(userNameInput, 'John Doe')
        .typeText(emailInput, 'john.doeexample.com') 
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, 'Password123')
        .typeText(password2Input, 'Password123')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Email không hợp lệ!').exists).ok();
});

test('[Signup-9] Xác minh rằng hệ thống từ chối email không có phần miền (domain)', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    await t
        .typeText(userNameInput, 'John Doe')
        .typeText(emailInput, 'john.doe@') 
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, 'Password123')
        .typeText(password2Input, 'Password123')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Email không hợp lệ!').exists).ok();
});


test('[Signup-10] Xác minh rằng hệ thống từ chối email có dấu "@" nhưng thiếu phần tên miền', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    await t
        .typeText(userNameInput, 'John Doe')
        .typeText(emailInput, 'john.doe@com') 
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, 'Password123')
        .typeText(password2Input, 'Password123')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Email không hợp lệ!').exists).ok();
});

test('[Signup-11] Xác minh rằng hệ thống từ chối mật khẩu quá ngắn (ít hơn 8 ký tự)', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    await t
        .typeText(userNameInput, 'John Doe')
        .typeText(emailInput, 'john.doe@example.com')
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, 'Pass1!') 
        .typeText(password2Input, 'Pass1!')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Mật khẩu phải có ít nhất 8 ký tự.').exists).ok(); 
});

test('[Signup-12] Xác minh rằng hệ thống từ chối mật khẩu quá dài (quá 128 ký tự)', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    const longPassword = 'A'.repeat(129); 
    
    await t
        .typeText(userNameInput, 'John Doe')
        .typeText(emailInput, 'john.doe@example.com')
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, longPassword) 
        .typeText(password2Input, longPassword)
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Mật khẩu không được vượt quá 128 ký tự.').exists).ok();
});

test('[Signup-13] Xác minh rằng hệ thống từ chối mật khẩu không chứa ký tự đặc biệt', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    await t
        .typeText(userNameInput, 'John Doe')
        .typeText(emailInput, 'john.doe@example.com')
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, 'Password123') 
        .typeText(password2Input, 'Password123')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Mật khẩu phải chứa ít nhất một ký tự đặc biệt.').exists).ok(); 
});

test('[Signup-14] Xác minh rằng hệ thống từ chối mật khẩu không có chữ cái in hoa', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    await t
        .typeText(userNameInput, 'John Doe')
        .typeText(emailInput, 'john.doe@example.com')
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, 'password123!') 
        .typeText(password2Input, 'password123!')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Mật khẩu phải chứa ít nhất một chữ cái in hoa.').exists).ok(); 
});

test('[Signup-15] Xác minh rằng hệ thống từ chối mật khẩu không có chữ cái thường', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    await t
        .typeText(userNameInput, 'John Doe')
        .typeText(emailInput, 'john.doe@example.com')
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, 'PASSWORD123!')
        .typeText(password2Input, 'PASSWORD123!')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Mật khẩu phải chứa ít nhất một chữ cái thường.').exists).ok(); 
});

test('[Signup-16] Xác minh rằng hệ thống từ chối mật khẩu không có số', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    await t
        .typeText(userNameInput, 'John Doe')
        .typeText(emailInput, 'john.doe@example.com')
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, 'Password!') 
        .typeText(password2Input, 'Password!')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Mật khẩu phải chứa ít nhất một số.').exists).ok();
});



test('[Signup-17] Xác minh rằng hệ thống từ chối mật khẩu và nhập lại mật khẩu khác nhau', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    await t
        .typeText(userNameInput, 'John Doe')
        .typeText(emailInput, 'john.doe@example.com')
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, 'Quyenanh20@4') 
        .typeText(password2Input, 'Quyenanh20@')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Mật khẩu không khớp!').exists).ok();
});


test('[Signup-18] Xác minh hệ thống không chấp nhận mã xác thực không đúng', async t => {
    //B2
    await t
        .typeText(Selector('input[placeholder="Nhập tên của bạn (*)"]'), 'Nguyễn Văn A')
        .wait(500)
        .typeText(Selector('input[placeholder="Nhập email của bạn (*)"]'), '22521107@gm.uit.edu.vn')
        .wait(500)
        .typeText(Selector('input[placeholder="Nhập số điện thoại"]'), '0346728349')
        .wait(500)
        .typeText(Selector('input[placeholder="Mật khẩu"]'), 'Quyenanh20@4')
        .wait(500)
        .typeText(Selector('input[placeholder="Nhập lại mật khẩu"]'), 'Quyenanh20@4')
        .wait(500)
        .click(Selector('button').withText('ĐĂNG KÝ'));

    await t
    .wait(2000)
       .expect(Selector('.ant-message').withText('Vui lòng kiểm tra email để xác thực tài khoản.').exists, { timeout: 50000 }).ok()
       
        .expect(Selector('input[placeholder="Nhập mã xác thực"]').exists).ok();

  
    await t.debug();
    await t
        .wait(500)
        .click(Selector('button').withText('XÁC THỰC'))
        .wait(500)
        .expect(Selector('div').withText('Mã xác thực không đúng!').exists).ok();
});


test('[Signup-19] Kiểm tra tính năng gửi lại mã xác thực', async t => {
    // B2
    await t
        .typeText(Selector('input[placeholder="Nhập tên của bạn (*)"]'), 'Nguyễn Văn A')
        .wait(500)
        .typeText(Selector('input[placeholder="Nhập email của bạn (*)"]'), '22521107@gm.uit.edu.vn')
        .wait(500)
        .typeText(Selector('input[placeholder="Nhập số điện thoại"]'), '0346728349')
        .wait(500)
        .typeText(Selector('input[placeholder="Mật khẩu"]'), 'Quyenanh20@4')
        .wait(500)
        .typeText(Selector('input[placeholder="Nhập lại mật khẩu"]'), 'Quyenanh20@4')
        .wait(500)
        .click(Selector('button').withText('ĐĂNG KÝ'));

    await t
      .wait(2000)
        .expect(Selector('.ant-message').withText('Vui lòng kiểm tra email để xác thực tài khoản.').exists, { timeout: 50000 }).ok()
        
        .expect(Selector('input[placeholder="Nhập mã xác thực"]').exists).ok();
    await t
        .wait(500)
        .click(Selector('button').withText('Gửi lại mã xác thực'))
        .wait(500)
        .expect(Selector('.ant-message').withText('Mã xác thực đã được gửi lại!').exists).ok()
});

test('[Signup-20] Xác minh rằng hệ thống từ chối email đã đăng ký từ trướctrước', async t => {
    const userNameInput = Selector('input').withAttribute('placeholder', 'Nhập tên của bạn (*)');
    const emailInput = Selector('input').withAttribute('placeholder', 'Nhập email của bạn (*)');
    const phoneInput = Selector('input').withAttribute('placeholder', 'Nhập số điện thoại');
    const passwordInput = Selector('input').withAttribute('placeholder', 'Mật khẩu');
    const password2Input = Selector('input').withAttribute('placeholder', 'Nhập lại mật khẩu');
    const submitButton = Selector('button').withText('ĐĂNG KÝ');
    //B2
    
    await t
        .typeText(userNameInput, 'John Doe')
        .typeText(emailInput, 'tranthij@gmail.com')
        .typeText(phoneInput, '0123456789')
        .typeText(passwordInput, 'Quyenanh20@4') 
        .typeText(password2Input, 'Quyenanh20@4')
        //B3
        .click(submitButton)
        .expect(Selector('div').withText('Email đã tồn tại.').exists).ok();
});