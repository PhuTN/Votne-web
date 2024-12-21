

// Kiểm tra nếu tên chứa ký tự đặc biệt


export function validateSignupModule(fullName, phone, email, password, confirmPassword) {
    let isValid = true;
    const specialChars = /[!@#$%^~&*(),.?":{}|<>/+=_\-\\|;'\[\]<>`]/;
    // Kiểm tra họ tên
    
    if (!fullName) {
        console.log("Họ Tên bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (fullName.length < 2 || fullName.length >= 50) {
        console.log("Họ Tên phải có độ dài từ 2 đến 50 ký tự");
        isValid = false;
    } else if (specialChars.test(fullName) || /\d/.test(fullName)) {
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

    // Kiểm tra mật khẩu
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,128}$/;
    if (!password) {
        console.log("Mật khẩu bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (!passwordPattern.test(password)) {
        console.log("Mật khẩu phải có ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 số và 1 ký tự đặc biệt");
        isValid = false;
    }

    // Kiểm tra nhập lại mật khẩu
    if (!confirmPassword) {
        console.log("Nhập lại mật khẩu bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (confirmPassword !== password) {
        console.log("Mật khẩu nhập lại không khớp");
        isValid = false;
    }

    return isValid;
}
