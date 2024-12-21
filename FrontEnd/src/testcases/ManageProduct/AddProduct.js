import { Selector } from 'testcafe';
import{warehouseStaff,admin} from '../utilities/createRole'
fixture('Test chức năng nhân viên kho hoặc admin thêm sản phẩm')


test('[ManageProduct-] Tạo sản phẩm vợt mới ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products2"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp2"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);


    const addBtn = Selector('[data-testid="thembtn"]'); // Chọn "Vợt" dựa trên testid
    await t.click(addBtn)
    .expect(Selector('.ant-message').withText("Tạo sản phẩm mới thành công").exists).ok();
    
    
});

test('[ManageProduct-1] Tạo sản phẩm áo cầu lông mới ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products2"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-aop2"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);


    const addBtn = Selector('[data-testid="thembtn"]'); // Chọn "Vợt" dựa trên testid
    await t.click(addBtn)
    .expect(Selector('.ant-message').withText("Tạo sản phẩm mới thành công").exists).ok();
    
    
});
