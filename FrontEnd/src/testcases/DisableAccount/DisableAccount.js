import { Selector } from 'testcafe';
import{admin} from '../utilities/createRole'
fixture('Test chức năng Admin chặn truy cập của tài khoản khách hàng hoặc ngưng tài khoản của nhân viên trong trường hợp nghỉ việc')

test('[DisableAccount-] Vô hiệu hóa tài khoản ', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Tài khoản người dùng');
    
    await t
        .useRole(admin)
        //B1
        .navigateTo('http://localhost:3000/admin') 
        .click(menuItem)
        .expect(menuItem.hasClass('ant-menu-item-selected'))
        .ok('Mục Tài khoản người dùng không được chọn!');




        const selectElement = Selector('[data-testid="67545b0757523981f583f45c"]');
const optionActive = Selector('[data-testid="option-active-Mức giá"]');
const optionInactive = Selector('[data-testid="unactive"]');


  
    
    await t
        .click(selectElement)
        .click(optionInactive)
        const successMessage = Selector('.ant-message').withText('Vô hiệu hóa tài khoản thành công');
    await t.expect(successMessage.exists).ok()
    .click(Selector('[data-testid="luu"]'))
    .expect(successMessage.exists).ok('Lưu thành công')

    
});
