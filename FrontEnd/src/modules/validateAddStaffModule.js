export function validateAddStaffModule(fullName, phone, email,userType) {
    let isValid = true;

    // Kiểm tra họ tên
    const fullNamePattern = /^[A-Za-zàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựýỷỹỵđĐ ]+$/;
    if (!fullName) {
        console.log("Họ Tên bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (fullName.length < 2 || fullName.length >= 50) {
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

    
    if (!userType || (userType !== "Seller" && userType !== "WarehouseStaff"  && userType !== "Admin" )) {
        console.log("Loại tài khoản phải là admin, nhân viên bán hàng hoặc nhân viên khokho");
        isValid = false;
    }

    return isValid;
}


