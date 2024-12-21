import { Selector } from 'testcafe';
import{admin} from '../utilities/createRole'
fixture('Test chức năng nhân viên bán hàng hoặc Admin xem chi tiết đơn hàng')


test('[ViewOrderDetail-] Xem chi tiết dơn hàng có id O55616', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Đơn hàng');
    await t
        .useRole(admin)
        //B1
        .navigateTo('http://localhost:3000/admin') 
        .click(menuItem)
        .click(Selector('[data-testid="xem O55616"]'))
        

});


test('[ViewOrderDetail-1] Xem chi tiết dơn hàng có id O59011', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Đơn hàng');
    await t
        .useRole(admin)
        //B1
        .navigateTo('http://localhost:3000/admin') 
        .click(menuItem)
        .click(Selector('[data-testid="xem O55616"]'))
        

});

