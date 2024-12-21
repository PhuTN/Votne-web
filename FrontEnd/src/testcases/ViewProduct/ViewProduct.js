import { jwtDecode } from 'jwt-decode';
import { Selector } from 'testcafe';

// URL của trang đăng nhập
const URL = 'http://localhost:3000'; // Thay bằng URL thực tế


fixture('Test chức năng xem sản phẩm ')
    .page(URL);
test('[ViewProduct-] Test chức năng xem sản phẩm Vợt cầu lông Victor TK-F Đen chính hãng', async t => {
    await t
    const categoryVot = Selector('[data-testid="Vợt Cầu Lông"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryVot);
    const productVot = Selector('[data-testid="Vợt cầu lông Victor TK-F Đen chính hãng"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(productVot);
});

test('[ViewProduct-1] Test chức năng xem sản phẩm Balo cầu lông VNB Bag2020', async t => {
    await t
    const categoryVot = Selector('[data-testid="Balo Cầu Lông"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryVot);
    const productVot = Selector('[data-testid="Balo cầu lông VNB Bag2020"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(productVot);
});