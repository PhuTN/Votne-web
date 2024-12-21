import { Selector } from 'testcafe';
import{admin} from '../utilities/createRole'



fixture('Test chức năng nhân viên bán hàng hoặc Admin hủy đơn hàng')

test('[CancelOrder-] Test hủy dơn hàng có id O55616', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Đơn hàng');
    await t
        .useRole(admin)
        //B1
        .navigateTo('http://localhost:3000/admin') 
        .click(menuItem)
        .click(Selector('[data-testid="O55616"]'))
        .click(Selector('[data-testid="daHuy"]'))

        .typeText(Selector('[data-testid="liDo"]'), 'Không liên lạc được với khách', { replace: true })
        .click(Selector('[data-testid="ok"]'))
    await t.expect(Selector('.ant-message').withText("Lý do hủy đã được cập nhật!").exists).ok()
   
        

    await t
    .click(Selector('[data-testid="luu"]'))

    await t.expect(Selector('.ant-message').withText('Lưu thành công!').exists).ok();

});