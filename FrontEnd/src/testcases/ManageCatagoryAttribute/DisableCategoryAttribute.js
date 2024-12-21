import { Selector } from 'testcafe';
import{warehouseStaff} from '../utilities/createRole'
fixture('Test chức năng nhân viên kho hoặc admin vô hiệu hóa thuộc tính của loại sản phẩm')


test('[ManageCatagoryAttribute-6] Vô hiệu hóa thuộc tính mức giá của loại sản phảm vợt thành công ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);
    
    const selectElement = Selector('[data-testid="select-Mức giá"]');
const optionActive = Selector('[data-testid="option-active-Mức giá"]');
const optionInactive = Selector('[data-testid="option-inactive-Mức giá"]');


  
    
    await t
        .click(selectElement)
        .click(optionInactive)
        .expect(Selector('.ant-message').withText("Vô hiệu hóa Mức giá!").exists).ok()
        .click(Selector('button').withText('Lưu'))
        .expect(Selector('.ant-message').withText("Lưu thành công.").exists).ok();
});



test('[ManageCatagoryAttribute-7] Đưa thuộc tính mức giá của loại sản phảm vợt hoạt động lại ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);
    
    const selectElement = Selector('[data-testid="select-Mức giá"]');
const optionActive = Selector('[data-testid="option-active-Mức giá"]');
const optionInactive = Selector('[data-testid="option-inactive-Mức giá"]');


  
    
    await t
        .click(selectElement)
        .click(optionActive)
        .expect(Selector('.ant-message').withText("Đưa Mức giá hoạt động!").exists).ok()
        .click(Selector('button').withText('Lưu'))
        .expect(Selector('.ant-message').withText("Lưu thành công.").exists).ok();
});


test('[ManageCatagoryAttribute-8] Vô hiệu hóa thuộc tính thương hiệu của loại sản phảm giày thành công ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-giayp"]');
    await t.click(categoryItem);
    
    const selectElement = Selector('[data-testid="select-Thương hiệu"]');
const optionActive = Selector('[data-testid="option-active-Thương hiệu"]');
const optionInactive = Selector('[data-testid="option-inactive-Thương hiệu"]');


  
    
    await t
        .click(selectElement)
        .click(optionInactive)
        .expect(Selector('.ant-message').withText("Vô hiệu hóa Thương hiệu!").exists).ok()
        .click(Selector('button').withText('Lưu'))
        .expect(Selector('.ant-message').withText("Lưu thành công.").exists).ok();
});


test('[ManageCatagoryAttribute-9] Đưa thuộc tính thương hiệu của loại sản phảm giày hoạt động lại ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-giayp"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);
    
    const selectElement = Selector('[data-testid="select-Thương hiệu"]');
const optionActive = Selector('[data-testid="option-active-Thương hiệu"]');
const optionInactive = Selector('[data-testid="option-inactive-Thương hiệu"]');


  
    
    await t
        .click(selectElement)
        .click(optionActive)
        .expect(Selector('.ant-message').withText("Đưa Thương hiệu hoạt động!").exists).ok()
        .click(Selector('button').withText('Lưu'))
        .expect(Selector('.ant-message').withText("Lưu thành công.").exists).ok();
});
