import { Selector } from 'testcafe';
import{ customer2} from '../utilities/createRole'


fixture `Test khách hàng hủy đơn hàng`;





test('[CancelOrder-2] Hủy đơn hàng có id O63308 ', async t => {

    await t
        .useRole(customer2)
        //B1
        .navigateTo('http://localhost:3000/account') 
        .click(Selector('table').find('tr').withText('O63308'))
        .click(Selector('[data-testid="huy"]'))
        .typeText(Selector('[data-testid="liDo"]'), 'Hết tiền rồi', { replace: true })
        .click(Selector('[data-testid="ok"]'))
        .expect(Selector('.ant-message').withText("Hủy thành công!").exists).ok();
})

test('[CancelOrder-3] Hủy đơn hàng có id O59011 ', async t => {

    await t
        .useRole(customer2)
        //B1
        .navigateTo('http://localhost:3000/account') 
        .click(Selector('table').find('tr').withText('O59011'))
        .click(Selector('[data-testid="huy"]'))
        .typeText(Selector('[data-testid="liDo"]'), 'Hết tiền rồi', { replace: true })
        .click(Selector('[data-testid="ok"]'))
        .expect(Selector('.ant-message').withText("Hủy thành công!").exists).ok();
})