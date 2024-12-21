import { Selector } from 'testcafe';
import{warehouseStaff,admin} from '../utilities/createRole'
fixture('Test chức năng nhân viên kho hoặc admin vô hiệu hóa sản phẩm')

test('[ManageProduct-3] Vô hiệu hóa một sản phẩm thành công', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products2"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp2"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);

    const product = Selector('[data-testid="kxzihpdqb"]'); // Chọn "Vợt" dựa trên testid
    await t.click(product)
    .click(Selector('[data-testid="select"]'))
    .click(Selector('[data-testid="unactivep"]'))
   
    
             const saveBtn = Selector('[data-testid="nutluu"]'); // Chọn "Vợt" dựa trên testid
        await t.click(saveBtn)
        .expect(Selector('.ant-message').withText("Lưu thành công!").exists).ok();
    
});
