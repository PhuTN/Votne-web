import { Selector } from 'testcafe';
import{admin} from '../utilities/createRole'
fixture('Test chức năng Admin thêm nhân viên vào hệ thống')


test('[AddStaff-] Tạo nhân viên bán hàng với thông tin chính xác ', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Tổng quan');
    await t
        .useRole(admin)
        //B1
        .navigateTo('http://localhost:3000/admin') 
        .click(menuItem)
        .expect(menuItem.hasClass('ant-menu-item-selected'))
        .ok('Mục Tổng quan khoản người dùng không được chọn!');

        
});