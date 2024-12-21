export function validateOrder(fullName, phone, email, address, paymentMethod, number, description) {
    let isValid = true;

    // Kiểm tra họ tên
    const fullNamePattern = /^[A-Za-zàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựýỷỹỵđĐ ]+$/;
    if (!fullName) {
        console.log("Họ Tên bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (fullName.length < 2 || fullName.length > 50) {
        console.log("Họ Tên phải có độ dài từ 2 đến 50 ký tự");
        isValid = false;
    } else if (!fullNamePattern.test(fullName)) {
        console.log("Họ Tên chỉ chứa chữ cái và dấu cách");
        isValid = false;
    }

    // Kiểm tra số điện thoại
    const phonePattern = /^0\d{9}$/;
    if (!phone) {
        console.log("Số điện thoại bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (!phonePattern.test(phone)) {
        console.log("Số điện thoại phải có giá trị là chuỗi số bắt đầu bằng 0 và có 10 chữ số");
        isValid = false;
    }

    // Kiểm tra email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
        console.log("Email bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        console.log("Email không hợp lệ");
        isValid = false;
    }

    // Kiểm tra địa chỉ
    if (!address) {
        console.log("Địa chỉ bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (address.length < 10 || address.length > 500) {
        console.log("Địa chỉ phải có độ dài từ 10 đến 500 ký tự");
        isValid = false;
    }

    // Kiểm tra ngày sinh
   

    // Kiểm tra số nguyên dương
    if (!Number.isInteger(number) || number <= 0) {
        console.log("Số phải là số nguyên dương");
        isValid = false;
    }

    // Kiểm tra loại thanh toán
    const validPaymentMethods = ["Ship Cod", "Chuyển Khoản"];
    if (!validPaymentMethods.includes(paymentMethod)) {
        console.log("Loại thanh toán phải là 'Ship Cod' hoặc 'Chuyển Khoản'");
        isValid = false;
    }

    // Kiểm tra độ dài mô tả
    if (!description || description.length < 20 || description.length > 3000) {
        console.log("Mô tả phải có độ dài từ 20 đến 3000 ký tự");
        isValid = false;
    }

    return isValid;
}
