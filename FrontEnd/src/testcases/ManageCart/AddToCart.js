import { jwtDecode } from 'jwt-decode';
import { Selector } from 'testcafe';
import{customer} from "../utilities/createRole"
// URL của trang đăng nhập



fixture('Khách hàng thêm sản phẩm vào giỏ hàng ')

// test('[ViewProduct-] Test chức năng thêm 3 sản phẩm Vợt cầu lông Victor TK-F Đen chính hãng vào giỏ hàng', async t => {
//     await t.useRole(customer)
//     .navigateTo('http://localhost:3000') ;
//     const categoryVot = Selector('[data-testid="Vợt Cầu Lông"]'); // Chọn menu "Sản phẩm" dựa trên testid
//     await t.click(categoryVot);
//     const productVot = Selector('[data-testid="Vợt cầu lông Victor TK-F Đen chính hãng"]'); // Chọn menu "Sản phẩm" dựa trên testid
//     await t.click(productVot);
//     await t.click(Selector('[data-testid="addBtn"]'))
//     await t.click(Selector('[data-testid="addBtn"]'))


//     await t.click(Selector('[data-testid="cartBtn"]'))
//     

// });




test('[ViewProduct-] Test chức năng thêm 2 sản phẩm Vợt cầu lông Victor TK-F Đen chính hãng vào giỏ hàng', async t => {
    await t.useRole(customer)
    .navigateTo('http://localhost:3000') ;
    const categoryVot = Selector('[data-testid="Balo Cầu Lông"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryVot);
    const productVot = Selector('[data-testid="Balo cầu lông VNB Bag2020"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(productVot);
    await t.click(Selector('[data-testid="addBtn"]'))
    await t.click(Selector('[data-testid="cartBtn"]'))

});


