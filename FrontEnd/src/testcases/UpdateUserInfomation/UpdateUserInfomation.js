import { Selector } from 'testcafe';
import{ customer} from '../utilities/createRole'


fixture `Người dùng cập nhật thông tin cá nhân`;

const editButton = Selector('button').withText('SỬA THÔNG TIN CÁ NHÂN');



test('[UpdateUserInfomation-] Xác minh người dùng có cập nhật thông tin thành công với thông tin chính xác không ', async t => {

    await t
        .useRole(customer)
        //B1
        .navigateTo('http://localhost:3000/account') 

        //B2
        .click(editButton)
        await t
   
    
// Điền thông tin hợp lệ
await t
     //B3
    .typeText(Selector('input[placeholder="Họ tên"]'), 'Nguyen Van A', { replace: true })
    .typeText(Selector('input[placeholder="Số điện thoại"]'), '0123456789', { replace: true })
    .typeText(Selector('input[placeholder="Địa chỉ"]'), '123 Đường ABC, Quận X, TP.HCM', { replace: true })
    await t
    .click(Selector('.ant-select-selector')) // Chọn Select dựa trên aria-label
    .click(Selector('div.ant-select-item-option-content').withText('Nam')); // Chọn "Nam"

// Điền ngày sinh
await t
    .click(Selector('input[placeholder="Chọn ngày sinh"]')) // Mở DatePicker
    .typeText(Selector('input[placeholder="Chọn ngày sinh"]'), '2000-01-01',{ replace: true }) // Điền ngày sinh
    .pressKey('enter'); // Đóng DatePicker


    // Bấm nút cập nhật
   //B4
    await t
        .click(Selector('button').withText('CẬP NHẬT'))
        .expect(Selector('.ant-message-success').innerText).contains('Cập nhật thông tin thành công');
});


test('[UpdateUserInfomation-1] Xác minh rằng hệ thống chỉ chấp nhận tên chứa các ký tự chữ cái và không có chữ số', async t => {
    
    await t
        .useRole(customer)
        //B1
        .navigateTo('http://localhost:3000/account') 
        //B2
        .click(editButton)
        await t
    
// Điền thông tin hợp lệ
await t
    .typeText(Selector('input[placeholder="Họ tên"]'), 'John123', { replace: true })
    .typeText(Selector('input[placeholder="Số điện thoại"]'), '0123456789', { replace: true })
    .typeText(Selector('input[placeholder="Địa chỉ"]'), '123 Đường ABC, Quận X, TP.HCM', { replace: true })
    await t
    .click(Selector('.ant-select-selector')) // Chọn Select dựa trên aria-label
    .click(Selector('div.ant-select-item-option-content').withText('Nữ')); // Chọn "Nữ"

// Điền ngày sinh
await t
    .click(Selector('input[placeholder="Chọn ngày sinh"]')) // Mở DatePicker
    .typeText(Selector('input[placeholder="Chọn ngày sinh"]'), '2000-01-01',{ replace: true }) // Điền ngày sinh
    .pressKey('enter'); // Đóng DatePicker


    // Bấm nút cập nhật
   //B4
    await t
        .click(Selector('button').withText('CẬP NHẬT'))
        .expect(Selector('div').withText('Tên không được chứa chữ số.').exists).ok();
});



test('[UpdateUserInfomation-2] Xác minh rằng hệ thống chỉ chấp nhận tên chứa các ký tự chữ cái và không có ký tự đặc biệt', async t => {
    
    await t
        .useRole(customer)
        //B1
        .navigateTo('http://localhost:3000/account') 
        //B2
        .click(editButton)
        await t
    
// Điền thông tin hợp lệ
await t
    .typeText(Selector('input[placeholder="Họ tên"]'), 'John@Doe', { replace: true })
    .typeText(Selector('input[placeholder="Số điện thoại"]'), '0123456789', { replace: true })
    .typeText(Selector('input[placeholder="Địa chỉ"]'), '123 Đường ABC, Quận X, TP.HCM', { replace: true })
    await t
    .click(Selector('.ant-select-selector')) // Chọn Select dựa trên aria-label
    .click(Selector('div.ant-select-item-option-content').withText('Nam')); // Chọn "Nam"

// Điền ngày sinh
await t
    .click(Selector('input[placeholder="Chọn ngày sinh"]')) // Mở DatePicker
    .typeText(Selector('input[placeholder="Chọn ngày sinh"]'), '2000-01-01',{ replace: true }) // Điền ngày sinh
    .pressKey('enter'); // Đóng DatePicker


    // Bấm nút cập nhật
   //B4
    await t
        .click(Selector('button').withText('CẬP NHẬT'))
        .expect(Selector('div').withText('Tên không được chứa ký tự đặc biệt.').exists).ok();
});


test('[UpdateUserInfomation-3] Xác minh rằng hệ thống từ chối tên có độ dài dưới 2 ký tự', async t => {
    
    await t
        .useRole(customer)
        //B1
        .navigateTo('http://localhost:3000/account') 
        //B2
        .click(editButton)
        await t
    
// Điền thông tin hợp lệ
await t
    .typeText(Selector('input[placeholder="Họ tên"]'), 'r', { replace: true })
    .typeText(Selector('input[placeholder="Số điện thoại"]'), '0123456789', { replace: true })
    .typeText(Selector('input[placeholder="Địa chỉ"]'), '123 Đường ABC, Quận X, TP.HCM', { replace: true })
    await t
    .click(Selector('.ant-select-selector')) // Chọn Select dựa trên aria-label
    .click(Selector('div.ant-select-item-option-content').withText('Nam')); // Chọn "Nam"

// Điền ngày sinh
await t
    .click(Selector('input[placeholder="Chọn ngày sinh"]')) // Mở DatePicker
    .typeText(Selector('input[placeholder="Chọn ngày sinh"]'), '2000-01-01',{ replace: true }) // Điền ngày sinh
    .pressKey('enter'); // Đóng DatePicker


    // Bấm nút cập nhật
   //B4
    await t
        .click(Selector('button').withText('CẬP NHẬT'))
        .expect(Selector('div').withText('Tên phải có ít nhất 2 ký tự.').exists).ok();
});


test('[UpdateUserInfomation-4] Xác minh rằng hệ thống từ chối tên có độ dài vượt quá 50 ký tự', async t => {
    
    await t
        .useRole(customer)
        //B1
        .navigateTo('http://localhost:3000/account') 
        //B2
        .click(editButton)
        await t
    
// Điền thông tin hợp lệ
const longUserName = 'B'.repeat(51);  
await t
    .typeText(Selector('input[placeholder="Họ tên"]'), longUserName, { replace: true })
    .typeText(Selector('input[placeholder="Số điện thoại"]'), '0123456789', { replace: true })
    .typeText(Selector('input[placeholder="Địa chỉ"]'), '123 Đường ABC, Quận X, TP.HCM', { replace: true })
    await t
    .click(Selector('.ant-select-selector')) // Chọn Select dựa trên aria-label
    .click(Selector('div.ant-select-item-option-content').withText('Nam')); // Chọn "Nam"

// Điền ngày sinh
await t
    .click(Selector('input[placeholder="Chọn ngày sinh"]')) // Mở DatePicker
    .typeText(Selector('input[placeholder="Chọn ngày sinh"]'), '2000-01-01',{ replace: true }) // Điền ngày sinh
    .pressKey('enter'); // Đóng DatePicker


    // Bấm nút cập nhật
   //B4
    await t
        .click(Selector('button').withText('CẬP NHẬT'))
        .expect(Selector('div').withText('Tên không được vượt quá 50 ký tự.').exists).ok();
});

test('[UpdateUserInfomation-5] Xác minh rằng hệ thống từ chối số điện thoại chứa ký tự không phải số', async t => {
    
    await t
        .useRole(customer)
        //B1
        .navigateTo('http://localhost:3000/account') 
        //B2
        .click(editButton)
        await t
    


await t
    .typeText(Selector('input[placeholder="Họ tên"]'), "Nguyen Van A", { replace: true })
    .typeText(Selector('input[placeholder="Số điện thoại"]'), '01234abcde', { replace: true })
    .typeText(Selector('input[placeholder="Địa chỉ"]'), '123 Đường ABC, Quận X, TP.HCM', { replace: true })
    await t
    .click(Selector('.ant-select-selector')) 
    .click(Selector('div.ant-select-item-option-content').withText('Nam')); 


await t
    .click(Selector('input[placeholder="Chọn ngày sinh"]')) // Mở DatePicker
    .typeText(Selector('input[placeholder="Chọn ngày sinh"]'), '2000-01-01',{ replace: true }) // Điền ngày sinh
    .pressKey('enter'); // Đóng DatePicker


    // Bấm nút cập nhật
   //B4
    await t
        .click(Selector('button').withText('CẬP NHẬT'))
        .expect(Selector('div').withText('Số điện thoại chỉ được chứa chữ số.').exists).ok();
});

test('[UpdateUserInfomation-6] Xác minh rằng hệ thống từ chối số điện thoại có ít hơn 10 ký tự', async t => {
    
    await t
        .useRole(customer)
        //B1
        .navigateTo('http://localhost:3000/account') 
        //B2
        .click(editButton)
        await t
    


await t
    .typeText(Selector('input[placeholder="Họ tên"]'), "Nguyen Van A", { replace: true })
    .typeText(Selector('input[placeholder="Số điện thoại"]'), '012345678', { replace: true })
    .typeText(Selector('input[placeholder="Địa chỉ"]'), '123 Đường ABC, Quận X, TP.HCM', { replace: true })
    await t
    .click(Selector('.ant-select-selector')) 
    .click(Selector('div.ant-select-item-option-content').withText('Nam')); 


await t
    .click(Selector('input[placeholder="Chọn ngày sinh"]')) // Mở DatePicker
    .typeText(Selector('input[placeholder="Chọn ngày sinh"]'), '2000-01-01',{ replace: true }) // Điền ngày sinh
    .pressKey('enter'); // Đóng DatePicker


    // Bấm nút cập nhật
   //B4
    await t
        .click(Selector('button').withText('CẬP NHẬT'))
        .expect(Selector('div').withText('Số điện thoại phải có ít nhất 10 chữ số.').exists).ok();
});

test('[UpdateUserInfomation-7] Xác minh rằng hệ thống từ chối số điện thoại có nhiều hơn 10 ký tự', async t => {
    
    await t
        .useRole(customer)
        //B1
        .navigateTo('http://localhost:3000/account') 
        //B2
        .click(editButton)
        await t
    


await t
    .typeText(Selector('input[placeholder="Họ tên"]'), "Nguyen Van A", { replace: true })
    .typeText(Selector('input[placeholder="Số điện thoại"]'), '01234567890', { replace: true })
    .typeText(Selector('input[placeholder="Địa chỉ"]'), '123 Đường ABC, Quận X, TP.HCM', { replace: true })
    await t
    .click(Selector('.ant-select-selector')) 
    .click(Selector('div.ant-select-item-option-content').withText('Nam')); 


await t
    .click(Selector('input[placeholder="Chọn ngày sinh"]')) // Mở DatePicker
    .typeText(Selector('input[placeholder="Chọn ngày sinh"]'), '2000-01-01',{ replace: true }) // Điền ngày sinh
    .pressKey('enter'); // Đóng DatePicker


    // Bấm nút cập nhật
   //B4
    await t
        .click(Selector('button').withText('CẬP NHẬT'))
        .expect(Selector('div').withText('Số điện thoại không được vượt quá 10 chữ số.').exists).ok();
});



test('[UpdateUserInfomation-8] Xác minh rằng hệ thống từ chối số địa chỉ ít hơn 10 ký tự', async t => {
    
    await t
        .useRole(customer)
        //B1
        .navigateTo('http://localhost:3000/account') 
        //B2
        .click(editButton)
        await t
    


await t
    .typeText(Selector('input[placeholder="Họ tên"]'), "Nguyen Van A", { replace: true })
    .typeText(Selector('input[placeholder="Số điện thoại"]'), '0123456789', { replace: true })
    .typeText(Selector('input[placeholder="Địa chỉ"]'), '123', { replace: true })
    await t
    .click(Selector('.ant-select-selector')) 
    .click(Selector('div.ant-select-item-option-content').withText('Nam')); 


await t
    .click(Selector('input[placeholder="Chọn ngày sinh"]')) // Mở DatePicker
    .typeText(Selector('input[placeholder="Chọn ngày sinh"]'), '2000-01-01',{ replace: true }) // Điền ngày sinh
    .pressKey('enter'); // Đóng DatePicker


    // Bấm nút cập nhật
   //B4
    await t
        .click(Selector('button').withText('CẬP NHẬT'))
        .expect(Selector('div').withText("Địa chỉ phải có ít nhất 10 ký tự.").exists).ok();
});

test('[UpdateUserInfomation-9] Xác minh rằng hệ thống từ chối số địa chỉ nhiều hơn 500 ký tự', async t => {
    
    await t
        .useRole(customer)
        //B1
        .navigateTo('http://localhost:3000/account') 
        //B2
        .click(editButton)
        await t
    

        const longAddress = 'B'.repeat(501); 
await t
    .typeText(Selector('input[placeholder="Họ tên"]'), "Nguyen Van A", { replace: true })
    .typeText(Selector('input[placeholder="Số điện thoại"]'), '0123456789', { replace: true })
    .typeText(Selector('input[placeholder="Địa chỉ"]'), longAddress, { replace: true })
    await t
    .click(Selector('.ant-select-selector')) 
    .click(Selector('div.ant-select-item-option-content').withText('Nam')); 


await t
    .click(Selector('input[placeholder="Chọn ngày sinh"]')) // Mở DatePicker
    .typeText(Selector('input[placeholder="Chọn ngày sinh"]'), '2000-01-01',{ replace: true }) // Điền ngày sinh
    .pressKey('enter'); // Đóng DatePicker


    // Bấm nút cập nhật
   //B4
    await t
        .click(Selector('button').withText('CẬP NHẬT'))
        .expect(Selector('div').withText("Địa chỉ không được vượt quá 500 ký tự.").exists).ok();
});



 



 test('[UpdateUserInfomation-10] Xác minh rằng hệ thống từ chối ngày sinh sau ngày hôm nay', async t => {
    
    await t
        .useRole(customer)
        //B1
        .navigateTo('http://localhost:3000/account') 
        //B2
        .click(editButton)
        await t
    

       
await t
    .typeText(Selector('input[placeholder="Họ tên"]'), "Nguyen Van A", { replace: true })
    .typeText(Selector('input[placeholder="Số điện thoại"]'), '0123456789', { replace: true })
    .typeText(Selector('input[placeholder="Địa chỉ"]'), "123 Đường ABC, Quận X, TP.HCM", { replace: true })
    await t
    .click(Selector('.ant-select-selector')) 
    .click(Selector('div.ant-select-item-option-content').withText('Nam')); 


await t
    .click(Selector('input[placeholder="Chọn ngày sinh"]')) // Mở DatePicker
    .typeText(Selector('input[placeholder="Chọn ngày sinh"]'), '2500-01-01',{ replace: true }) // Điền ngày sinh
    .pressKey('enter'); // Đóng DatePicker


    // Bấm nút cập nhật
   //B4
    await t
        .click(Selector('button').withText('CẬP NHẬT'))
        .expect(Selector('div').withText("Ngày sinh phải trước ngày hôm nay.").exists).ok();
});