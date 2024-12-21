import { Selector } from 'testcafe';
//B1
fixture('Test chức năng người dùng thay đổi mật khẩu')
    .page('http://localhost:3000/login'); // Thay bằng URL của trang ứng dụng của bạn


test('[ResetPassword-] Kiểm tra chứ năng đổi mật khẩu khi mã xác nhận đúng và mật khẩu, nhập lại mật khẩu đúng format', async t => {
    
    await t
        //B2
        .click(Selector('a').withText('Quên mật khẩu')) 
        //B3
    
        .typeText(Selector('input[placeholder="Nhập email của bạn"]'), '22521107@gm.uit.edu.vn') // Nhập email
        //B4
        .click(Selector('button').withText('Gửi mã xác nhận')) // Nhấn nút "Gửi mã xác nhận"
        .wait(3000)
        .expect(Selector('.ant-message').withText('Email xác nhận đã được gửi!').exists).ok('Thông báo gửi email thành công không xuất hiện'); // Kiểm tra thông báo thành công

    
    await t
        .debug();

    
    await t
        //B5
        .typeText(Selector('input[placeholder="Nhập mật khẩu mới"]'), 'Quyenanh20@4') // Nhập mật khẩu mới
        .typeText(Selector('input[placeholder="Xác nhận mật khẩu"]'), 'Quyenanh20@4') // Xác nhận mật khẩu mới
        //B6
        .click(Selector('button').withText('Đổi mật khẩu')) // Nhấn nút "Đổi mật khẩu"
        .expect(Selector('.ant-message').withText('Đổi mật khẩu thành công!').exists, { timeout: 50000 }).ok()
});




test('[ResetPassword-1] Không nhập email', async t => {
    
    await t
        //B2
        .click(Selector('a').withText('Quên mật khẩu')) 

        //B4
        .click(Selector('button').withText('Gửi mã xác nhận')) // Nhấn nút "Gửi mã xác nhận"
        .expect(Selector('div').withText("Vui lòng nhập email!").exists).ok();

    
});



test('[ResetPassword-2] Email người dùng không đúng ', async t => {
    
    await t
        //B2
        .click(Selector('a').withText('Quên mật khẩu')) 
        //B3
        .typeText(Selector('input[placeholder="Nhập email của bạn"]'), '521107@gm.uit.edu.vn')
        //B4
        .click(Selector('button').withText('Gửi mã xác nhận')) // Nhấn nút "Gửi mã xác nhận"
        .wait(2000)
        .expect(Selector('div').withText("Email người dùng không đúng hoặc tài khoản bị khóa!").exists).ok();

    
});



test('[ResetPassword-3] Xác minh rằng hệ thống từ chối mật khẩu quá ngắn (ít hơn 8 ký tự)', async t => {
    
    await t
        //B2
        .click(Selector('a').withText('Quên mật khẩu')) 
        //B3
        .typeText(Selector('input[placeholder="Nhập email của bạn"]'), '22521107@gm.uit.edu.vn') // Nhập email
        //B4
        .click(Selector('button').withText('Gửi mã xác nhận')) // Nhấn nút "Gửi mã xác nhận"
        .wait(3000)
        .expect(Selector('.ant-message').withText('Email xác nhận đã được gửi!').exists).ok('Thông báo gửi email thành công không xuất hiện'); // Kiểm tra thông báo thành công

    
    

    
    await t
       
        //B5
        .typeText(Selector('input[placeholder="Nhập mật khẩu mới"]'), 'Pass1!') // Nhập mật khẩu mới
        .typeText(Selector('input[placeholder="Xác nhận mật khẩu"]'), 'Pass1!') // Xác nhận mật khẩu mới
        //B6
        .click(Selector('button').withText('Đổi mật khẩu')) // Nhấn nút "Đổi mật khẩu"
        .expect(Selector('div').withText('Mật khẩu phải có ít nhất 8 ký tự.').exists).ok(); 
});

test('[ResetPassword-4] Xác minh rằng hệ thống từ chối mật khẩu quá dài (quá 128 ký tự)', async t => {
    
    await t
        //B2
        .click(Selector('a').withText('Quên mật khẩu')) 
        //B3
        .typeText(Selector('input[placeholder="Nhập email của bạn"]'), '22521107@gm.uit.edu.vn') // Nhập email
        //B4
        .click(Selector('button').withText('Gửi mã xác nhận')) // Nhấn nút "Gửi mã xác nhận"
        .wait(3000)
        .expect(Selector('.ant-message').withText('Email xác nhận đã được gửi!').exists).ok('Thông báo gửi email thành công không xuất hiện'); // Kiểm tra thông báo thành công

    
    
    const longPassword = 'A'.repeat(129); 
    
    await t
       
        //B5
        .typeText(Selector('input[placeholder="Nhập mật khẩu mới"]'), longPassword ) // Nhập mật khẩu mới
        .typeText(Selector('input[placeholder="Xác nhận mật khẩu"]'), longPassword ) // Xác nhận mật khẩu mới
        //B6
        .click(Selector('button').withText('Đổi mật khẩu')) // Nhấn nút "Đổi mật khẩu"
        .expect(Selector('div').withText('Mật khẩu không được vượt quá 128 ký tự.').exists).ok(); 
});

test('[ResetPassword-5] Xác minh rằng hệ thống từ chối mật khẩu không chứa ký tự đặc biệt', async t => {
    
    await t
        //B2
        .click(Selector('a').withText('Quên mật khẩu')) 
        //B3
        .typeText(Selector('input[placeholder="Nhập email của bạn"]'), '22521107@gm.uit.edu.vn') // Nhập email
        //B4
        .click(Selector('button').withText('Gửi mã xác nhận')) // Nhấn nút "Gửi mã xác nhận"
        .wait(3000)
        .expect(Selector('.ant-message').withText('Email xác nhận đã được gửi!').exists).ok('Thông báo gửi email thành công không xuất hiện'); // Kiểm tra thông báo thành công

    
    

    
    await t
       
        //B5
        .typeText(Selector('input[placeholder="Nhập mật khẩu mới"]'), 'Password123') // Nhập mật khẩu mới
        .typeText(Selector('input[placeholder="Xác nhận mật khẩu"]'), 'Password123') // Xác nhận mật khẩu mới
        //B6
        .click(Selector('button').withText('Đổi mật khẩu')) // Nhấn nút "Đổi mật khẩu"
        .expect(Selector('div').withText('Mật khẩu phải chứa ít nhất một ký tự đặc biệt.').exists).ok(); 
});

test('[ResetPassword-6] Xác minh rằng hệ thống từ chối mật khẩu không có chữ cái in hoa', async t => {
    
    await t
        //B2
        .click(Selector('a').withText('Quên mật khẩu')) 
        //B3
        .typeText(Selector('input[placeholder="Nhập email của bạn"]'), '22521107@gm.uit.edu.vn') // Nhập email
        //B4
        .click(Selector('button').withText('Gửi mã xác nhận')) // Nhấn nút "Gửi mã xác nhận"
        .wait(3000)
        .expect(Selector('.ant-message').withText('Email xác nhận đã được gửi!').exists).ok('Thông báo gửi email thành công không xuất hiện'); // Kiểm tra thông báo thành công

    
    

    
    await t
       
        //B5
        .typeText(Selector('input[placeholder="Nhập mật khẩu mới"]'), 'password123!') // Nhập mật khẩu mới
        .typeText(Selector('input[placeholder="Xác nhận mật khẩu"]'), 'password123!') // Xác nhận mật khẩu mới
        //B6
        .click(Selector('button').withText('Đổi mật khẩu')) // Nhấn nút "Đổi mật khẩu"
        .expect(Selector('div').withText('Mật khẩu phải chứa ít nhất một chữ cái in hoa.').exists).ok(); 
});

test('[ResetPassword-7] Xác minh rằng hệ thống từ chối mật khẩu không có chữ cái thường', async t => {
    
    await t
        //B2
        .click(Selector('a').withText('Quên mật khẩu')) 
        //B3
        .typeText(Selector('input[placeholder="Nhập email của bạn"]'), '22521107@gm.uit.edu.vn') // Nhập email
        //B4
        .click(Selector('button').withText('Gửi mã xác nhận')) // Nhấn nút "Gửi mã xác nhận"
        .wait(3000)
        .expect(Selector('.ant-message').withText('Email xác nhận đã được gửi!').exists).ok('Thông báo gửi email thành công không xuất hiện'); // Kiểm tra thông báo thành công

    
    

    
    await t
       
        //B5
        .typeText(Selector('input[placeholder="Nhập mật khẩu mới"]'), 'PASSWORD123!') // Nhập mật khẩu mới
        .typeText(Selector('input[placeholder="Xác nhận mật khẩu"]'), 'PASSWORD123!') // Xác nhận mật khẩu mới
        //B6
        .click(Selector('button').withText('Đổi mật khẩu')) // Nhấn nút "Đổi mật khẩu"
        .expect(Selector('div').withText('Mật khẩu phải chứa ít nhất một chữ cái thường.').exists).ok();  
});


test('[ResetPassword-8] Xác minh rằng hệ thống từ chối mật khẩu không có số', async t => {
    
    await t
        //B2
        .click(Selector('a').withText('Quên mật khẩu')) 
        //B3
        .typeText(Selector('input[placeholder="Nhập email của bạn"]'), '22521107@gm.uit.edu.vn') // Nhập email
        //B4
        .click(Selector('button').withText('Gửi mã xác nhận')) // Nhấn nút "Gửi mã xác nhận"
        .wait(3000)
        .expect(Selector('.ant-message').withText('Email xác nhận đã được gửi!').exists).ok('Thông báo gửi email thành công không xuất hiện'); // Kiểm tra thông báo thành công

    
    

    
    await t
       
        //B5
        .typeText(Selector('input[placeholder="Nhập mật khẩu mới"]'), 'Password!') // Nhập mật khẩu mới
        .typeText(Selector('input[placeholder="Xác nhận mật khẩu"]'), 'Password!') // Xác nhận mật khẩu mới
        //B6
        .click(Selector('button').withText('Đổi mật khẩu')) // Nhấn nút "Đổi mật khẩu"
        .expect(Selector('div').withText('Mật khẩu phải chứa ít nhất một số.').exists).ok();
});

test('[ResetPassword-9] Xác minh rằng hệ thống từ chối mật khẩu và nhập lại mật khẩu khác nhau', async t => {
    
    await t
        //B2
        .click(Selector('a').withText('Quên mật khẩu')) 
        //B3
        .typeText(Selector('input[placeholder="Nhập email của bạn"]'), '22521107@gm.uit.edu.vn') // Nhập email
        //B4
        .click(Selector('button').withText('Gửi mã xác nhận')) // Nhấn nút "Gửi mã xác nhận"
        .wait(3000)
        .expect(Selector('.ant-message').withText('Email xác nhận đã được gửi!').exists).ok('Thông báo gửi email thành công không xuất hiện'); // Kiểm tra thông báo thành công

    
    

    
    await t
       
        //B5
        .typeText(Selector('input[placeholder="Nhập mật khẩu mới"]'), 'Quyenanh20@4') // Nhập mật khẩu mới
        .typeText(Selector('input[placeholder="Xác nhận mật khẩu"]'), 'Quyenanh20@') // Xác nhận mật khẩu mới
        //B6
        .click(Selector('button').withText('Đổi mật khẩu')) // Nhấn nút "Đổi mật khẩu"
        .expect(Selector('div').withText('Mật khẩu không khớp!').exists).ok();
});


test('[ResetPassword-10] Để trống mã xác nhận', async t => {
    
    await t
        //B2
        .click(Selector('a').withText('Quên mật khẩu')) 
        //B3
        .typeText(Selector('input[placeholder="Nhập email của bạn"]'), '22521107@gm.uit.edu.vn') // Nhập email
        //B4
        .click(Selector('button').withText('Gửi mã xác nhận')) // Nhấn nút "Gửi mã xác nhận"
        .wait(3000)
        .expect(Selector('.ant-message').withText('Email xác nhận đã được gửi!').exists).ok('Thông báo gửi email thành công không xuất hiện'); // Kiểm tra thông báo thành công

    
    

    
    await t
       
        //B5
        .typeText(Selector('input[placeholder="Nhập mật khẩu mới"]'), 'Quyenanh20@4') // Nhập mật khẩu mới
        .typeText(Selector('input[placeholder="Xác nhận mật khẩu"]'), 'Quyenanh20@4') // Xác nhận mật khẩu mới
        //B6
        .click(Selector('button').withText('Đổi mật khẩu')) // Nhấn nút "Đổi mật khẩu"
        .expect(Selector('div').withText('Mã xác nhận không được để trống').exists).ok();
});




test('[ResetPassword-11] Mã xác nhận không chính xác', async t => {
    
    await t
        //B2
        .click(Selector('a').withText('Quên mật khẩu')) 
        //B3
        .typeText(Selector('input[placeholder="Nhập email của bạn"]'), '22521107@gm.uit.edu.vn') // Nhập email
        //B4
        .click(Selector('button').withText('Gửi mã xác nhận')) // Nhấn nút "Gửi mã xác nhận"
        .wait(3000)
        .expect(Selector('.ant-message').withText('Email xác nhận đã được gửi!').exists).ok('Thông báo gửi email thành công không xuất hiện'); // Kiểm tra thông báo thành công

    
    

    
    await t
        .typeText(Selector('input[placeholder="Nhập mã xác nhận"]'), '-1')
        //B5
        .typeText(Selector('input[placeholder="Nhập mật khẩu mới"]'), 'Quyenanh20@4') // Nhập mật khẩu mới
        .typeText(Selector('input[placeholder="Xác nhận mật khẩu"]'), 'Quyenanh20@4') // Xác nhận mật khẩu mới
        //B6
        .click(Selector('button').withText('Đổi mật khẩu')) // Nhấn nút "Đổi mật khẩu"
        .expect(Selector('div').withText('Mã xác nhận không chính xác').exists).ok();
});


test('[ResetPassword-12] Kiểm tra tính năng gửi lại mã xác nhận', async t => {
    
    await t
        //B2
        .click(Selector('a').withText('Quên mật khẩu')) 
        //B3
        .typeText(Selector('input[placeholder="Nhập email của bạn"]'), '22521107@gm.uit.edu.vn') // Nhập email
        //B4
        .click(Selector('button').withText('Gửi mã xác nhận')) // Nhấn nút "Gửi mã xác nhận"
        .wait(3000)
        .expect(Selector('.ant-message').withText('Email xác nhận đã được gửi!').exists).ok('Thông báo gửi email thành công không xuất hiện'); // Kiểm tra thông báo thành công

    
    

    
    await t
        .click(Selector('button').withText('Gửi lại mã xác nhận')) // Nhấn nút "Đổi mật khẩu"
        .expect(Selector('.ant-message').withText("Đã gửi lại mã xác nhận!").exists).ok('Thông báo gửi email thành công không xuất hiện'); // Kiểm tra thông báo thành công
});