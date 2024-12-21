import { Selector } from 'testcafe';
import{ customer2} from '../utilities/createRole'


fixture `Test khách hàng xem chi tiết đơn hàng mình đã đặt`;

const editButton = Selector('button').withText('SỬA THÔNG TIN CÁ NHÂN');



test('[CustomerViewOrderDetail-] Xem chi tiết đơn hàng có id O63308', async t => {

    await t
        .useRole(customer2)
        //B1
        .navigateTo('http://localhost:3000/account') 
        .click(Selector('table').find('tr').withText('O63308'))
     
})

test('[CustomerViewOrderDetail-1] Xem chi tiết đơn hàng có id O59011 ', async t => {

    await t
        .useRole(customer2)
        //B1
        .navigateTo('http://localhost:3000/account') 
        .click(Selector('table').find('tr').withText('O59011'))
        
})