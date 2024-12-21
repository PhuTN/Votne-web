import { Selector } from 'testcafe';
import{admin} from '../utilities/createRole'
fixture('Test chức năng Admin xem danh sách khách hàng')


test('[ViewCustomerList-] Xem danh sách khách hàng ', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Tài khoản người dùng');
    await t
        .useRole(admin)
        //B1
        .navigateTo('http://localhost:3000/admin') 
        .click(menuItem)
        .expect(menuItem.hasClass('ant-menu-item-selected'))
        .ok('Mục Tài khoản người dùng không được chọn!');

        const categorySelect = Selector('[data-testid="category-select"]');
    const roleOption = Selector('[data-testid="category-option-role"]');
    const searchInput = Selector('[data-testid="search-input"]');
    const firstRowRole = Selector('tbody tr').nth(0).find('td').nth(1); // Cột Loại (Role)

    // Thao tác trên trang
    await t
        .click(categorySelect) // Mở dropdown
        .click(roleOption) // Chọn "Loại"
        .typeText(searchInput, 'Khách hàng') // Nhập "Khách hàng" vào ô tìm kiếm
        .pressKey('enter') // Xác nhận tìm kiếm
});