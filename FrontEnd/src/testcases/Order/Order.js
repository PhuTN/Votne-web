import { jwtDecode } from 'jwt-decode';
import { Selector } from 'testcafe';
import{customer2} from "../utilities/createRole"
// URL của trang đăng nhập



fixture('Test chức năng khách hàng đặt hàng')

test('[Order-] Test chức năng đặt hàng ship cod', async t => {
    await t.useRole(customer2)
    .navigateTo('http://localhost:3000')
    await t.wait(3000)
    await t.click(Selector('[data-testid="cartPageBtn"]'))
    await t.click(Selector('[data-testid="dathang"]'))
    await t.typeText(Selector('[data-testid="ghichu"]'), 'Giao nhanh lên nha bạn ơi', { replace: true })
    await t.click(Selector('[data-testid="shipcod"]'))
    .debug();
    await t.click(Selector('[data-testid="dat"]'))
    .expect(Selector('.ant-message').withText("Đặt hàng thành công!").exists).ok();
    

});

test('[Order-1] Test chức năng đặt hàng chuyển khoản', async t => {
    await t.useRole(customer2)
    .navigateTo('http://localhost:3000')
    await t.wait(3000)
    await t.click(Selector('[data-testid="cartPageBtn"]'))
    await t.click(Selector('[data-testid="dathang"]'))
    await t.typeText(Selector('[data-testid="ghichu"]'), 'Giao nhanh lên nha bạn ơi', { replace: true })
    await t.click(Selector('[data-testid="chuyenkhoan"]'))
    await t.click(Selector('[data-testid="dat"]'))
    .expect(Selector('.ant-message').withText("Đặt hàng thành công!").exists).ok();
    

});

