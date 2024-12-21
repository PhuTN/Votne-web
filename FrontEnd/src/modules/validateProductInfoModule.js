export function validateProductInfoModule(name, description, type, brand) {
    let isValid = true;
    const specialChars = /[!@#$%^~&*(),.?":{}|<>/+=_\-\\|;'\[\]<>`]/;
    // Kiểm tra tên sản phẩm
  
    if (!name) {
        console.log("Tên sản phẩm bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (name.length < 10 || name.length > 150) {
        console.log("Tên sản phẩm phải có độ dài từ 10 đến 150 ký tự");
        isValid = false;
    } else if (specialChars.test(name) || /\d/.test(name)) {
        console.log("Tên sản phẩm chỉ chứa chữ cái và dấu cách");
        isValid = false;
    }

    // Kiểm tra mô tả sản phẩm
    if (!description) {
        console.log("Mô tả sản phẩm bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (description.length < 20 || description.length > 3000) {
        console.log("Mô tả sản phẩm phải có độ dài từ 20 đến 3000 ký tự");
        isValid = false;
    }

    // Kiểm tra loại sản phẩm
    const validTypes = ["Vợt", "Giày", "Áo", "Quần", "Túi vợt", "Balo", "Phụ kiện"];
    if (!type) {
        console.log("Loại sản phẩm bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (!validTypes.includes(type)) {
        console.log(`Loại sản phẩm phải là một trong các giá trị: ${validTypes.join(", ")}`);
        isValid = false;
    }

    // Kiểm tra thương hiệu
    const brandPattern = /^[A-Za-zàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựýỷỹỵđĐ ]+$/;
    if (!brand) {
        console.log("Thương hiệu bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (brand.length < 10 || brand.length > 150) {
        console.log("Thương hiệu phải có độ dài từ 10 đến 150 ký tự");
        isValid = false;
    } else if (!brandPattern.test(brand)) {
        console.log("Thương hiệu chỉ chứa chữ cái và dấu cách");
        isValid = false;
    }

    return isValid;
}
