
import { Selector } from 'testcafe';
import{warehouseStaff} from '../utilities/createRole'
fixture('Test chức năng nhân viên kho hoặc admin chỉnh sửa thuộc tính của loại sản phẩm')





test('[ManageCatagoryAttribute-13] Tên thuộc tính không được ít hơn 3 kí tự  ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);
    
    const editButton = Selector('[data-testid="Thương hiệu"]');
await t.click(editButton);

    await t
    
        .typeText(Selector('[data-testid="attribute"]'), 'T', { replace: true })
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .expect(Selector('div').withText("Tên thuộc tính phải có ít nhất 3 ký tự.").exists).ok();
});


test('[ManageCatagoryAttribute-14] Tên thuộc tính không được lớn hơn 50 kí tự ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);
    
    const editButton = Selector('[data-testid="Thương hiệu"]');
await t.click(editButton);

    await t
    
       .typeText(Selector('[data-testid="attribute"]'), 'Đây là một đoạn văn bản có đúng năm mươi mốt ký tự.', { replace: true })
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .expect(Selector('div').withText("Tên thuộc tính không được vượt quá 50 ký tự.").exists).ok();
});


test('[ManageCatagoryAttribute-15] Tên thuộc tính không được trùng ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);
    
    const editButton = Selector('[data-testid="Thương hiệu"]');
await t.click(editButton);

    await t
    
    .typeText(Selector('[data-testid="attribute"]'), 'Size',{ replace: true })
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .expect(Selector('div').withText("Tên thuộc tính đã bị trùng.").exists).ok();
});


test('[ManageCatagoryAttribute-16] Thêm giá trị "Giá hợp lệ" cho thuộc tính "Mức giá" của loại sản phẩm vợt ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);
    
    const attributeRow = Selector('table').find('tr').withText('Mức giá');
    await t.click(attributeRow);

    await t
    .click(Selector('button').withText('Thêm Giá trị'))
    .typeText(Selector('[data-testid="attribute"]'), 'Giá hợp lệ')
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .click(Selector('button').withText('Lưu'))
    .expect(Selector('.ant-message').withText("Lưu thành công.").exists).ok();
    
});


test('[ManageCatagoryAttribute-17] Sửa giá trị "Giá hợp lệ" của thuộc tính "Mức giá" của loại sản phẩm vợt ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);
    
    const attributeRow = Selector('table').find('tr').withText('Mức giá');
    await t.click(attributeRow);

        const editButton = Selector('[data-testid="Giá hợp lệ"]');
await t.click(editButton);
await t

    .typeText(Selector('[data-testid="attribute"]'), 'Giá hợp', { replace: true })
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .click(Selector('button').withText('Lưu'))
    .expect(Selector('.ant-message').withText("Lưu thành công.").exists).ok();
    
});

test('[ManageCatagoryAttribute-18] Vô hiệu hóa giá trị "Giá hợp lệ" của thuộc tính "Mức giá" của loại sản phẩm vợt', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);
    
    const attributeRow = Selector('table').find('tr').withText('Mức giá');
    await t.click(attributeRow);

    const selectElement = Selector('[data-testid="select-Giá hợp lệ"]');
const optionActive = Selector('[data-testid="option-active-Giá hợp lệ"]');
const optionInactive = Selector('[data-testid="option-inactive-Giá hợp lệ"]');


  
    
    await t
        .click(selectElement)
        .click(optionInactive)
        .expect(Selector('.ant-message').withText("Vô hiệu hóa Giá hợp lệ!").exists).ok()
        .click(Selector('button').withText('Lưu'))
        .expect(Selector('.ant-message').withText("Lưu thành công.").exists).ok();
    
});


test('[ManageCatagoryAttribute-11] Sửa thuộc tính "Mức giá" loại sản phẩm vợt thành công ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);
    
    const editButton = Selector('[data-testid="Mức giá"]');
await t.click(editButton);

    await t
    
    .typeText(Selector('[data-testid="attribute"]'), 'Thuộc tính hợp lệ', { replace: true })
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .click(Selector('button').withText('Lưu'))
    .expect(Selector('.ant-message').withText("Lưu thành công.").exists).ok();


});


test('[ManageCatagoryAttribute-12] Sửa thuộc tính loại sản phẩm giày thành công ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-giayp"]'); 
    await t.click(categoryItem);
    
    const editButton = Selector('[data-testid="Mức giá"]');
await t.click(editButton);

    await t
    
    .typeText(Selector('[data-testid="attribute"]'), 'Thuộc tính hợp lệ', { replace: true })
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .click(Selector('button').withText('Lưu'))
    .expect(Selector('.ant-message').withText("Lưu thành công.").exists).ok();
});









