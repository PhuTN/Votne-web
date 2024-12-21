export function validateUserInfoModule(fullName, phone, email,   address, dob, gender) {
    let isValid = true;
    const specialChars = /[!@#$%^~&*(),.?":{}|<>/+=_\-\\|;'\[\]<>`]/;
    // Kiểm tra họ tên
  
    if (!fullName) {
        console.log("Họ Tên bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (fullName.length < 2 || fullName.length > 50) {
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
   

    // Kiểm tra địa chỉ
    if (!address) {
        console.log("Địa chỉ bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (address.length < 10 || address.length > 500) {
        console.log("Địa chỉ phải có độ dài từ 10 đến 500 ký tự");
        isValid = false;
    }

    // Kiểm tra ngày sinh
    const currentDate = new Date();
    const userDob = new Date(dob);
    if (!dob) {
        console.log("Ngày sinh bắt buộc phải có dữ liệu");
        isValid = false;
    } else if (userDob >= currentDate) {
        console.log("Ngày sinh phải trước ngày hôm nay");
        isValid = false;
    }

    // Kiểm tra giới tính
    if (!gender || (gender !== "Male" && gender !== "Female")) {
        console.log("Giới tính phải là 'Male' hoặc 'Female'");
        isValid = false;
    }

    return isValid;
}