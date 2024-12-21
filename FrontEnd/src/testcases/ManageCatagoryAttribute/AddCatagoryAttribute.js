import { Selector } from 'testcafe';
import{warehouseStaff,admin} from '../utilities/createRole'
fixture('Test chức năng nhân viên kho hoặc admin thêm thuộc tính của loại sản phẩm')


test('[ManageCatagoryAttribute-] Tạo thuộc tính loại sản phẩm vợt thành công ', async t => {
  

    await t
        .useRole(warehouseStaff)
       
        .navigateTo('http://localhost:3000/admin') ;



    //B1 
    const categoryMenu = Selector('[data-testid="menu-products"]');  
    await t.click(categoryMenu);

    
    //B2
    const categoryItem = Selector('[data-testid="menu-votp"]'); 
    await t.click(categoryItem);
    
    await t

    //B3
    .click(Selector('button').withText('Thêm Thuộc tính'))

    
    
    //B4
    .typeText(Selector('[data-testid="attribute"]'), 'Thuộc tính hợp lệ')
    //B5
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))

    //B6
    .click(Selector('button').withText('Lưu'))
    .expect(Selector('.ant-message').withText("Lưu thành công.").exists).ok();
});



test('[ManageCatagoryAttribute-1] Tạo thuộc tính loại sản phẩm giày thành công ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    //B1  
    const categoryMenu = Selector('[data-testid="menu-products"]');  
    const addButton = Selector('[data-testid="add-user-button"]');
    await t.click(categoryMenu);

    
    const categoryItem = Selector('[data-testid="menu-giayp"]'); 
    await t.click(categoryItem);
    
    await t
    //B3
    .click(Selector('button').withText('Thêm Thuộc tính'))
    //B4
    .typeText(Selector('[data-testid="attribute"]'), 'Thuộc tính hợp lệ')

    
    //B5
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    //B6
    .click(Selector('button').withText('Lưu'))
    .expect(Selector('.ant-message').withText("Lưu thành công.").exists).ok();
});


test('[ManageCatagoryAttribute-2] Tên thuộc tính không được ít hơn 3 kí tự ', async t => {
  

    await t
        .useRole(warehouseStaff)
        
        .navigateTo('http://localhost:3000/admin') ;


        
    //B1  
    const categoryMenu = Selector('[data-testid="menu-products"]');  
    await t.click(categoryMenu);

    
    //B2
    const categoryItem = Selector('[data-testid="menu-votp"]'); 
    await t.click(categoryItem);
    
    await t
    //B3
    .click(Selector('button').withText('Thêm Thuộc tính'))
    //B4
    .typeText(Selector('[data-testid="attribute"]'), 'T')
    //B5
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .expect(Selector('div').withText("Tên thuộc tính phải có ít nhất 3 ký tự.").exists).ok();
});






test('[ManageCatagoryAttribute-3] Tên thuộc tính không được lớn hơn 50 kí tự ', async t => {
  

    await t
        .useRole(warehouseStaff)
        
        .navigateTo('http://localhost:3000/admin') ;


        
    //B1  
    const categoryMenu = Selector('[data-testid="menu-products"]');  
    await t.click(categoryMenu);

    
    //B2
    const categoryItem = Selector('[data-testid="menu-votp"]'); 
    await t.click(categoryItem);
    
    await t
    //B3
    .click(Selector('button').withText('Thêm Thuộc tính'))
    //B4
    .typeText(Selector('[data-testid="attribute"]'), 'Đây là một đoạn văn bản có đúng năm mươi mốt ký tự.')
    //B5
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .expect(Selector('div').withText("Tên thuộc tính không được vượt quá 50 ký tự.").exists).ok();
});

test('[ManageCatagoryAttribute-4] Tên thuộc tính không được trùng ', async t => {
  

    await t
        .useRole(warehouseStaff)
        
        .navigateTo('http://localhost:3000/admin') ;


        
    //B1  
    const categoryMenu = Selector('[data-testid="menu-products"]');  
    await t.click(categoryMenu);

    
    //B2
    const categoryItem = Selector('[data-testid="menu-votp"]'); 
    await t.click(categoryItem);
    
    await t
    //B3
    .click(Selector('button').withText('Thêm Thuộc tính'))
    //B4
    .typeText(Selector('[data-testid="attribute"]'), 'Size')
    //B5
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .expect(Selector('div').withText("Tên thuộc tính đã bị trùng.").exists).ok();
});


