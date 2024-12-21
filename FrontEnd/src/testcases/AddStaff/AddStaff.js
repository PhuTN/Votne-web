import { Selector } from 'testcafe';
import{admin} from '../utilities/createRole'
fixture('Test chức năng Admin thêm nhân viên vào hệ thống')


test('[AddStaff-] Tạo nhân viên bán hàng với thông tin chính xác ', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Tài khoản người dùng');
    await t
        .useRole(admin)
        .navigateTo('http://localhost:3000/admin') 
         //B1
        .click(menuItem)
        .expect(menuItem.hasClass('ant-menu-item-selected'))
        .ok('Mục Tài khoản người dùng không được chọn!');
       //B2
        const addStaffButton = Selector('button').withText('Thêm nhân viên');
    await t.click(addStaffButton);

    
    // Nhập thông tin nhân viên mới
    //B3
    const usernameInput = Selector('#username');
    const emailInput = Selector('#email');
    const phoneNumberInput = Selector('#phoneNumber');
    const roleSelect = Selector('#role'); // Chọn vai trò
    const roleOption = Selector('.ant-select-item-option').withText('Nhân viên bán hàng');
    
    const typeOption = Selector('[data-testid="type-user-button"]');
    await t
        .typeText(usernameInput, 'Nguyen Van')
        .typeText(emailInput, 'guyenvana@example.com')
        .typeText(phoneNumberInput, '0123456789')
         .click(typeOption)
         .click(roleOption)
         .wait(3000);


    // Gửi biểu mẫu
    
    //B4
    const addButton = Selector('[data-testid="add-user-button"]');
    
    // Click vào nút
    await t
        .click(addButton);

    // Kiểm tra thông báo thành công
    const successMessage = Selector('.ant-message').withText('Thêm nhân viên thành công!');
    await t.expect(successMessage.exists).ok('Không có thông báo thành công sau khi thêm nhân viên.');

    // Kiểm tra dữ liệu hiển thị trên bảng
    const userRow = Selector('tr').withText('Nguyen Van');
    await t.expect(userRow.exists).ok('Nhân viên mới không được hiển thị trong bảng.');
});



test('[AddStaff-1] Tạo nhân viên kho với thông tin chính xác ', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Tài khoản người dùng');
    await t
        .useRole(admin)
        
        .navigateTo('http://localhost:3000/admin') 
         //B1
        .click(menuItem)
        .expect(menuItem.hasClass('ant-menu-item-selected'))
        .ok('Mục Tài khoản người dùng không được chọn!');

       //B2
        const addStaffButton = Selector('button').withText('Thêm nhân viên');
    await t.click(addStaffButton);

    // Nhập thông tin nhân viên mới
    //B3
    const usernameInput = Selector('#username');
    const emailInput = Selector('#email');
    const phoneNumberInput = Selector('#phoneNumber');
    const roleSelect = Selector('#role'); // Chọn vai trò
    const roleOption = Selector('.ant-select-item-option').withText('Nhân viên kho');
    
    const typeOption = Selector('[data-testid="type-user-button"]');
    await t
        .typeText(usernameInput, 'Nguyen Van B')
        .typeText(emailInput, 'yenvana@example.com')
        .typeText(phoneNumberInput, '0123456789')
         .click(typeOption)
         .click(roleOption)
         .wait(3000);

    // Gửi biểu mẫu
    //B4
    const addButton = Selector('[data-testid="add-user-button"]');
    
    // Click vào nút
    await t
        .click(addButton);

    // Kiểm tra thông báo thành công
    const successMessage = Selector('.ant-message').withText('Thêm nhân viên thành công!');
    await t.expect(successMessage.exists).ok('Không có thông báo thành công sau khi thêm nhân viên.');

    // Kiểm tra dữ liệu hiển thị trên bảng
    const userRow = Selector('tr').withText('Nguyen Van B');
    await t.expect(userRow.exists).ok('Nhân viên mới không được hiển thị trong bảng.');
});


test('[AddStaff-2] Tạo admin với thông tin chính xác ', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Tài khoản người dùng');
    await t
        .useRole(admin)
        
        .navigateTo('http://localhost:3000/admin') 
         //B1
        .click(menuItem)
        .expect(menuItem.hasClass('ant-menu-item-selected'))
        .ok('Mục Tài khoản người dùng không được chọn!');

       //B2
        const addStaffButton = Selector('button').withText('Thêm nhân viên');
    await t.click(addStaffButton);

    // Nhập thông tin nhân viên mới
    //B3
    const usernameInput = Selector('#username');
    const emailInput = Selector('#email');
    const phoneNumberInput = Selector('#phoneNumber');
    const roleSelect = Selector('#role'); // Chọn vai trò
    const roleOption = Selector('.ant-select-item-option').withText('Quản trị viên');
    
    const typeOption = Selector('[data-testid="type-user-button"]');
    await t
        .typeText(usernameInput, 'Nguyen Van C')
        .typeText(emailInput, 'a@example.com')
        .typeText(phoneNumberInput, '0123456789')
         .click(typeOption)
         .click(roleOption)
         .wait(3000)

    // Gửi biểu mẫu
    //B4
    const addButton = Selector('[data-testid="add-user-button"]');
    
    // Click vào nút
    await t
        .click(addButton);

    // Kiểm tra thông báo thành công
    const successMessage = Selector('.ant-message').withText('Thêm nhân viên thành công!');
    await t.expect(successMessage.exists).ok('Không có thông báo thành công sau khi thêm nhân viên.');

    // Kiểm tra dữ liệu hiển thị trên bảng
    const userRow = Selector('tr').withText('Nguyen Van C');
    await t.expect(userRow.exists).ok('Nhân viên mới không được hiển thị trong bảng.');
});



test('[AddStaff-3] Xác minh rằng hệ thống không chấp nhận email đã được sử dụng', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Tài khoản người dùng');
    await t
        .useRole(admin)
        
        .navigateTo('http://localhost:3000/admin') 
         //B1
        .click(menuItem)
        .expect(menuItem.hasClass('ant-menu-item-selected'))
        .ok('Mục Tài khoản người dùng không được chọn!');

       //B2
        const addStaffButton = Selector('button').withText('Thêm nhân viên');
    await t.click(addStaffButton);

    // Nhập thông tin nhân viên mới
    //B3
    const usernameInput = Selector('#username');
    const emailInput = Selector('#email');
    const phoneNumberInput = Selector('#phoneNumber');
    const roleSelect = Selector('#role'); // Chọn vai trò
    const roleOption = Selector('.ant-select-item-option').withText('Nhân viên bán hàng');
    
    const typeOption = Selector('[data-testid="type-user-button"]');
    await t
        .typeText(usernameInput, 'Johny')
        .typeText(emailInput, 'nguyenvani@gmail.com')
        .typeText(phoneNumberInput, '0123456789')
         .click(typeOption)
         .click(roleOption)
         .wait(3000);

    // Gửi biểu mẫu
    //B4
    const addButton = Selector('[data-testid="add-user-button"]');
    
    // Click vào nút
    await t
        .click(addButton)
        .expect(Selector('div').withText('Email đã được tài khoản khác đăng ký').exists).ok();
    // Kiểm tra thông báo thành công
});

test('[AddStaff-4] Xác minh rằng hệ thống chỉ chấp nhận tên chứa các ký tự chữ cái và không có chữ số  ', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Tài khoản người dùng');
    await t
        .useRole(admin)
        
        .navigateTo('http://localhost:3000/admin') 
         //B1
        .click(menuItem)
        .expect(menuItem.hasClass('ant-menu-item-selected'))
        .ok('Mục Tài khoản người dùng không được chọn!');

       //B2
        const addStaffButton = Selector('button').withText('Thêm nhân viên');
    await t.click(addStaffButton);

    // Nhập thông tin nhân viên mới
    //B3
    const usernameInput = Selector('#username');
    const emailInput = Selector('#email');
    const phoneNumberInput = Selector('#phoneNumber');
    const roleSelect = Selector('#role'); // Chọn vai trò
    const roleOption = Selector('.ant-select-item-option').withText('Nhân viên bán hàng');
    
    const typeOption = Selector('[data-testid="type-user-button"]');
    await t
        .typeText(usernameInput, 'John123')
        .typeText(emailInput, 'nguyenvana@example.com')
        .typeText(phoneNumberInput, '0123456789')
         .click(typeOption)
         .click(roleOption)
         .wait(3000);

    // Gửi biểu mẫu
    //B4
    const addButton = Selector('[data-testid="add-user-button"]');
    
    // Click vào nút
    await t
        .click(addButton)
        .expect(Selector('div').withText('Tên không được chứa chữ số.').exists).ok();
    // Kiểm tra thông báo thành công
});

test('[AddStaff-5] Xác minh rằng hệ thống chỉ chấp nhận tên chứa các ký tự chữ cái và không có ký tự đặc biệt', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Tài khoản người dùng');
    await t
        .useRole(admin)
        // B1: Điều hướng đến trang admin
        .navigateTo('http://localhost:3000/admin') 
         //B1
        .click(menuItem)
        .expect(menuItem.hasClass('ant-menu-item-selected'))
        .ok('Mục Tài khoản người dùng không được chọn!');

   //B2
        const addStaffButton = Selector('button').withText('Thêm nhân viên');
    await t.click(addStaffButton);

    // Nhập thông tin nhân viên mới
    //B3
    const usernameInput = Selector('#username');
    const emailInput = Selector('#email');
    const phoneNumberInput = Selector('#phoneNumber');
    const roleSelect = Selector('#role'); // Chọn vai trò
    const roleOption = Selector('.ant-select-item-option').withText('Nhân viên bán hàng');

    const typeOption = Selector('[data-testid="type-user-button"]');
    await t
        .typeText(usernameInput, 'John@Doe') // Tên chứa ký tự đặc biệt
        .typeText(emailInput, 'nguyenvana@example.com')
        .typeText(phoneNumberInput, '0123456789')
        .click(typeOption)
        .click(roleOption)
        .wait(3000);

    // Gửi biểu mẫu
    //B4
    const addButton = Selector('[data-testid="add-user-button"]');
    
    await t
        .click(addButton)
        .expect(Selector('div').withText('Tên không được chứa ký tự đặc biệt.').exists).ok();
    // Kiểm tra thông báo lỗi
});

test('[AddStaff-6] Xác minh rằng hệ thống từ chối tên có độ dài dưới 2 ký tự', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Tài khoản người dùng');
    await t
        .useRole(admin)
        // B1: Điều hướng đến trang admin
        .navigateTo('http://localhost:3000/admin') 
         //B1
        .click(menuItem)
        .expect(menuItem.hasClass('ant-menu-item-selected'))
        .ok('Mục Tài khoản người dùng không được chọn!');

   //B2
        const addStaffButton = Selector('button').withText('Thêm nhân viên');
    await t.click(addStaffButton);

    // Nhập thông tin nhân viên mới
    //B3
    const usernameInput = Selector('#username');
    const emailInput = Selector('#email');
    const phoneNumberInput = Selector('#phoneNumber');
    const roleSelect = Selector('#role'); // Chọn vai trò
    const roleOption = Selector('.ant-select-item-option').withText('Nhân viên bán hàng');

    const typeOption = Selector('[data-testid="type-user-button"]');
    await t
        .typeText(usernameInput, 'J') // Tên có độ dài dưới 2 ký tự
        .typeText(emailInput, 'nguyenvana@example.com')
        .typeText(phoneNumberInput, '0123456789')
        .click(typeOption)
        .click(roleOption)
        .wait(3000);

    // Gửi biểu mẫu
    //B4
    const addButton = Selector('[data-testid="add-user-button"]');
    
    await t
        .click(addButton)
        .expect(Selector('div').withText('Tên phải có ít nhất 2 ký tự.').exists).ok();
    // Kiểm tra thông báo lỗi
});

test('[AddStaff-7] Xác minh rằng hệ thống từ chối tên có độ dài vượt quá 50 ký tự', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Tài khoản người dùng');
    await t
        .useRole(admin)
        // B1: Điều hướng đến trang admin
        .navigateTo('http://localhost:3000/admin') 
         //B1
        .click(menuItem)
        .expect(menuItem.hasClass('ant-menu-item-selected'))
        .ok('Mục Tài khoản người dùng không được chọn!');

   //B2
        const addStaffButton = Selector('button').withText('Thêm nhân viên');
    await t.click(addStaffButton);

    // Nhập thông tin nhân viên mới
    //B3
    const usernameInput = Selector('#username');
    const emailInput = Selector('#email');
    const phoneNumberInput = Selector('#phoneNumber');
    const roleSelect = Selector('#role'); // Chọn vai trò
    const roleOption = Selector('.ant-select-item-option').withText('Nhân viên bán hàng');

    const typeOption = Selector('[data-testid="type-user-button"]');
    const longUserName = 'A'.repeat(51); // Tên có độ dài 51 ký tự
    await t
        .typeText(usernameInput, longUserName)
        .typeText(emailInput, 'nguyenvana@example.com')
        .typeText(phoneNumberInput, '0123456789')
        .click(typeOption)
        .click(roleOption)
        .wait(3000);

    // Gửi biểu mẫu
    //B4
    const addButton = Selector('[data-testid="add-user-button"]');
    
    await t
        .click(addButton)
        .expect(Selector('div').withText('Tên không được vượt quá 50 ký tự.').exists).ok();
    // Kiểm tra thông báo lỗi
});

test('[AddStaff-8] Xác minh rằng hệ thống từ chối số điện thoại chứa ký tự không phải số', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Tài khoản người dùng');
    await t
        .useRole(admin)
        // B1: Điều hướng đến trang admin
        .navigateTo('http://localhost:3000/admin') 
         //B1
        .click(menuItem)
        .expect(menuItem.hasClass('ant-menu-item-selected'))
        .ok('Mục Tài khoản người dùng không được chọn!');

   //B2
        const addStaffButton = Selector('button').withText('Thêm nhân viên');
    await t.click(addStaffButton);

    // Nhập thông tin nhân viên mới
    //B3
    const usernameInput = Selector('#username');
    const emailInput = Selector('#email');
    const phoneNumberInput = Selector('#phoneNumber');
    const roleSelect = Selector('#role'); // Chọn vai trò
    const roleOption = Selector('.ant-select-item-option').withText('Nhân viên bán hàng');

    const typeOption = Selector('[data-testid="type-user-button"]');
    await t
        .typeText(usernameInput, 'John Doe')
        .typeText(emailInput, 'nguyenvana@example.com')
        .typeText(phoneNumberInput, '01234abcde') // Số điện thoại chứa ký tự không phải số
        .click(typeOption)
        .click(roleOption)
        .wait(3000);

    // Gửi biểu mẫu
    //B4
    const addButton = Selector('[data-testid="add-user-button"]');
    
    await t
        .click(addButton)
        .expect(Selector('div').withText('Số điện thoại chỉ được chứa chữ số.').exists).ok();
    // Kiểm tra thông báo lỗi
});

test('[AddStaff-9] Xác minh rằng hệ thống từ chối số điện thoại có ít hơn 10 ký tự', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Tài khoản người dùng');
    await t
        .useRole(admin)
        // B1: Điều hướng đến trang admin
        .navigateTo('http://localhost:3000/admin') 
         //B1
        .click(menuItem)
        .expect(menuItem.hasClass('ant-menu-item-selected'))
        .ok('Mục Tài khoản người dùng không được chọn!');

   //B2
        const addStaffButton = Selector('button').withText('Thêm nhân viên');
    await t.click(addStaffButton);

    // Nhập thông tin nhân viên mới
    //B3
    const usernameInput = Selector('#username');
    const emailInput = Selector('#email');
    const phoneNumberInput = Selector('#phoneNumber');
    const roleSelect = Selector('#role'); // Chọn vai trò
    const roleOption = Selector('.ant-select-item-option').withText('Nhân viên bán hàng');

    const typeOption = Selector('[data-testid="type-user-button"]');
    await t
        .typeText(usernameInput, 'John Doe')
        .typeText(emailInput, 'nguyenvana@example.com')
        .typeText(phoneNumberInput, '012345678') // Số điện thoại có ít hơn 10 ký tự
        .click(typeOption)
        .click(roleOption)
        .wait(3000);

    // Gửi biểu mẫu
    //B4
    const addButton = Selector('[data-testid="add-user-button"]');
    
    await t
        .click(addButton)
        .expect(Selector('div').withText('Số điện thoại phải có ít nhất 10 chữ số.').exists).ok();
    // Kiểm tra thông báo lỗi
});
test('[AddStaff-10] Xác minh rằng hệ thống từ chối số điện thoại có nhiều hơn 10 ký tự', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Tài khoản người dùng');
    await t
        .useRole(admin)
        // B1: Điều hướng đến trang admin
        .navigateTo('http://localhost:3000/admin') 
         //B1
        .click(menuItem)
        .expect(menuItem.hasClass('ant-menu-item-selected'))
        .ok('Mục Tài khoản người dùng không được chọn!');

   //B2
        const addStaffButton = Selector('button').withText('Thêm nhân viên');
    await t.click(addStaffButton);

    // Nhập thông tin nhân viên mới
    //B3
    const usernameInput = Selector('#username');
    const emailInput = Selector('#email');
    const phoneNumberInput = Selector('#phoneNumber');
    const roleSelect = Selector('#role'); // Chọn vai trò
    const roleOption = Selector('.ant-select-item-option').withText('Nhân viên bán hàng');

    const typeOption = Selector('[data-testid="type-user-button"]');
    await t
        .typeText(usernameInput, 'John Doe')
        .typeText(emailInput, 'nguyenvana@example.com')
        .typeText(phoneNumberInput, '01234567890') // Số điện thoại có nhiều hơn 10 ký tự
        .click(typeOption)
        .click(roleOption)
        .wait(3000);

    // Gửi biểu mẫu
    //B4
    const addButton = Selector('[data-testid="add-user-button"]');
    
    await t
        .click(addButton)
        .expect(Selector('div').withText('Số điện thoại không được vượt quá 10 chữ số.').exists).ok();
    // Kiểm tra thông báo lỗi
});



