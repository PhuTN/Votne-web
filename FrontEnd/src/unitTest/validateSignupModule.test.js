import { validateSignupModule } from '../modules/validateSignupModule';

// npx jest --testPathPattern=src/unitTest/validateSignupModule.test.js
describe("Hàm validateSignupModule", () => {
    it("UTCID01: Dữ liệu hợp lệ", () => {
        const result = validateSignupModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "Abcdef1!", "Abcdef1!");
        expect(result).toBe(true);
    });

    it("UTCID02: Thiếu họ tên", () => {
        const result = validateSignupModule("", "0367171742", "quyenanh234@gmail.com", "Abcdef1!", "Abcdef1!");
        expect(result).toBe(false);
    });

    it("UTCID03: Họ tên quá ngắn", () => {
        const result = validateSignupModule("a", "0367171742", "quyenanh234@gmail.com", "Abcdef1!", "Abcdef1!");
        expect(result).toBe(false);
    });

    it("UTCID04: Họ tên chứa ký tự không hợp lệ", () => {
        const result = validateSignupModule("Nguyễn Thế Võ 3 Anh", "0367171742", "quyenanh234@gmail.com", "Abcdef1!", "Abcdef1!");
        expect(result).toBe(false);
    });

    it("UTCID05: Thiếu số điện thoại", () => {
        const result = validateSignupModule("Nguyễn Thế Võ Quyền Anh", "", "quyenanh234@gmail.com", "Abcdef1!", "Abcdef1!");
        expect(result).toBe(false);
    });

    it("UTCID06: Số điện thoại không hợp lệ", () => {
        const result = validateSignupModule("Nguyễn Thế Võ Quyền Anh", "3676767676767", "quyenanh234@gmail.com", "Abcdef1!", "Abcdef1!");
        expect(result).toBe(false);
    });

    it("UTCID07: Thiếu email", () => {
        const result = validateSignupModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "", "Abcdef1!", "Abcdef1!");
        expect(result).toBe(false);
    });

    it("UTCID08: Email không hợp lệ", () => {
        const result = validateSignupModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail", "Abcdef1!", "Abcdef1!");
        expect(result).toBe(false);
    });

    it("UTCID09: Thiếu mật khẩu", () => {
        const result = validateSignupModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "", "Abcdef1!");
        expect(result).toBe(false);
    });

    it("UTCID10: Mật khẩu không hợp lệ", () => {
        const result = validateSignupModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "Abcdefsav", "Abcdef1!");
        expect(result).toBe(false);
    });

    it("UTCID11: Buộc phải nhập lại mật khẩu", () => {
        const result = validateSignupModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "Abcdefsav", "");
        expect(result).toBe(false);
    });


    it("UTCID12: Mật khẩu và xác nhận mật khẩu không khớp", () => {
        const result = validateSignupModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "Abcdefsav", "Abcdef1!");
        expect(result).toBe(false);
    });
});
